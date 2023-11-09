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

// Private Key for high level operations
// ( ex// Bloom Multisig, in this exemple this is a single private key )
const rootPrivateKey = process.env.ROOT_PRIVATE_KEY as
  | `0x${string}`
  | undefined;

// Top Level Contract Addresses
const ERC20MockAddress = "0x61a4abc15311ee7f2fe02b5f5b2e8b15c1e907be";
const orchestratorAddress = "0x0A7c8C0EB1afAb6CBaD4bb2d4c738acFF047814A";

// Public Client: This is used to read from the blockchain.
const publicClient = createPublicClient({
  chain: goerli,
  transport: http(),
});

// Root Wallet Client: This is only for demonstration purposes.
// You should pass a window.ethereum instance in production or development enviroments.
// Using JSON-RPC Accounts // https://viem.sh/docs/clients/wallet.html#json-rpc-accounts
// This is used to write to the blockchain.
const getRootClient = () => {
  if (!rootPrivateKey) throw new Error("PRIVATE_KEY is required");

  const account = privateKeyToAccount(rootPrivateKey);
  const newClient = createWalletClient({
    account,
    chain: goerli,
    transport: http(),
  });

  return newClient;
};

// Create initial contract instances
const [ERC20MockContract, orchestratorContract] = [
  getContract({
    address: ERC20MockAddress,
    abi: ERC20Mock.abi,
    publicClient,
  }),
  getContract({
    address: orchestratorAddress,
    abi: Orchestrator.abi,
    publicClient,
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

// Mint default ( 10 ) tokens to the first address in the wallet
const mintMockERC20 = async (amount = 10) =>
  await getRootClient().writeContract({
    address: ERC20MockAddress,
    abi: ERC20Mock.abi,
    functionName: "mint",
    args: [
      getRootClient().getAddresses()[0],
      parseUnits(String(amount), ERC20MockDecimals),
    ],
  });

// Approve the FundingManager contract to spend the ERC20Mock tokens default ( 10 )
const approveFundingManager = async (amount = 10) =>
  await getRootClient().writeContract({
    address: ERC20MockAddress,
    abi: ERC20Mock.abi,
    functionName: "approve",
    args: [
      fundingManagerAddress,
      parseUnits(String(amount), ERC20MockDecimals),
    ],
  });

// Deposit ERC20Mock tokens into the FundingManager contract default ( 10 )
const depositFundingManager = async (amount = 10) =>
  await getRootClient().writeContract({
    address: fundingManagerAddress,
    abi: RebasingFundingManager.abi,
    functionName: "deposit",
    args: [parseUnits(String(amount), ERC20MockDecimals)],
  });

// Add Bounty to the BountyManager contract
const addBounty = async (amount = 10) =>
  await getRootClient().writeContract({
    address: bountyManagerAddress,
    abi: BountyManager.abi,
    functionName: "addBounty",
    args: [
      // Minimum Payout
      parseUnits(String(amount), ERC20MockDecimals),
      // Maximum Payout
      parseUnits(String(amount * 2.5), ERC20MockDecimals),
      // Details
      "0x0",
    ],
  });
