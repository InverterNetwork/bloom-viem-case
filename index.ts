import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  parseUnits,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { goerli } from "viem/chains";
import {
  Orchestrator,
  RebasingFundingManager,
  ERC20Mock,
  BountyManager,
  TokenGatedRoleAuthorizer,
} from "./lib";

enum BountyManagerRoles {
  BOUNTY_ADMIN_ROLE = "0x424f554e54595f41444d494e0000000000000000000000000000000000000000",
  CLAIM_ADMIN_ROLE = "0x434c41494d5f41444d494e000000000000000000000000000000000000000000",
  VERIFY_ADMIN_ROLE = "0x5645524946595f41444d494e0000000000000000000000000000000000000000",
}

// Top Level Contract Addresses
const ERC20MockAddress = "0x61a4abc15311ee7f2fe02b5f5b2e8b15c1e907be";
const orchestratorAddress = <`0x${string}`>process.env.ORCHESTRATOR_ADDRESS;
if (!orchestratorAddress) throw new Error("ORCHESTRATOR_ADDRESS is required");

// Public Client: This is used to read from the blockchain.
const publicClient = createPublicClient({
  chain: goerli,
  transport: http(),
});

// Private Key for high level operations
// ( ex// Bloom Multisig, in this exemple this is a single private key )
const ownerPrivateKey = <`0x${string}`>process.env.OWNER_PRIVATE_KEY;
if (!ownerPrivateKey) throw new Error("PRIVATE_KEY is required");

// Owner Wallet Client: This is only for demonstration purposes.
// You should pass a window.ethereum instance in production or development enviroments.
// Using JSON-RPC Accounts // https://viem.sh/docs/clients/wallet.html#json-rpc-accounts
// This is used to write to the blockchain.

// NOTE, this is named the owner client because it has access to all modules ex// assign Role, cancel, ext
// If need not be for it, non-owner can be used for deposits.
const ownerClient = createWalletClient({
  account: privateKeyToAccount(ownerPrivateKey),
  chain: goerli,
  transport: http(),
});

const ownerClientFirstAddress = <`0x${string}`>(
  (await ownerClient.getAddresses())[0]
);

// Create initial contract instances
const [ERC20MockContract, orchestratorContract] = [
  getContract({
    address: ERC20MockAddress,
    abi: ERC20Mock.abi,
    publicClient,
    walletClient: ownerClient,
  }),
  getContract({
    address: orchestratorAddress,
    abi: Orchestrator.abi,
    publicClient,
    walletClient: ownerClient,
  }),
];

// Read the ERC20Mock decimals
const ERC20MockDecimals = <number>await ERC20MockContract.read.decimals();

// Goreli TestNet contracts deployed by the Inverter team, on behalf of the Bloom team.
// These will be Queried from the Orchestrator contract.
// Query is optional although this would make the code more dynamic going forward
const [
  authorizerAddress,
  fundingManagerAddress,
  paymentProcessorAddress,
  bountyManagerAddress,
] = <`0x${string}`[]>[
  await orchestratorContract.read.authorizer(),
  await orchestratorContract.read.fundingManager(),
  await orchestratorContract.read.paymentProcessor(),
  await orchestratorContract.read.findModuleAddressInOrchestrator([
    "BountyManager",
  ]),
];

// Create module contract instances
const [
  authorizerContract,
  fundingManagerContract,
  paymentProcessorContract,
  bountyManagerContract,
] = [
  getContract({
    address: authorizerAddress,
    abi: TokenGatedRoleAuthorizer.abi,
    publicClient,
    walletClient: ownerClient,
  }),
  getContract({
    address: fundingManagerAddress,
    abi: RebasingFundingManager.abi,
    publicClient,
    walletClient: ownerClient,
  }),
  getContract({
    address: paymentProcessorAddress,
    abi: RebasingFundingManager.abi,
    publicClient,
    walletClient: ownerClient,
  }),
  getContract({
    address: bountyManagerAddress,
    abi: BountyManager.abi,
    publicClient,
    walletClient: ownerClient,
  }),
];

const BloomClient = {
  // Mint default ( 10 ) tokens to the first address in the wallet
  mintMockERC20: (amount = 10) =>
    ERC20MockContract.write.mint([
      ownerClientFirstAddress,
      parseUnits(String(amount), ERC20MockDecimals),
    ]),

  // Approve the FundingManager contract to spend the ERC20Mock tokens default ( 10 )
  approveFundingManager: (amount = 10) =>
    ERC20MockContract.write.approve([
      fundingManagerAddress,
      parseUnits(String(amount), ERC20MockDecimals),
    ]),

  // Deposit ERC20Mock tokens into the FundingManager contract default ( 10 )
  depositFundingManager: (amount = 10) =>
    fundingManagerContract.write.deposit([
      parseUnits(String(amount), ERC20MockDecimals),
    ]),

  // Grant the BountyManager contract a role
  grantBountyManagerRole: (
    role = BountyManagerRoles.BOUNTY_ADMIN_ROLE,
    address = ownerClientFirstAddress
  ) => bountyManagerContract.write.grantModuleRole([role, address]),

  // Add Bounty to the BountyManager contract
  addBounty: (amount = 10) =>
    bountyManagerContract.write.addBounty([
      // Minimum Payout
      parseUnits(String(amount), ERC20MockDecimals),
      // Maximum Payout
      parseUnits(String(amount * 2.5), ERC20MockDecimals),
      // Details
      "0x0",
    ]),

  // List Bounty ids
  listBounties: () =>
    <Promise<number[]>>bountyManagerContract.read.listBounties(),

  // Claim a bounty
  addClaim: (bountyId: number, amount = 10) =>
    bountyManagerContract.write.addClaim([
      bountyId,
      // This is an array of tuples, each tuple is a claim address and amount
      // used for shared bounty claims
      [
        [
          ownerClientFirstAddress,
          parseUnits(String(amount), ERC20MockDecimals),
        ],
      ],
    ]),
};

export default BloomClient;
