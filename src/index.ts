import { getContract, parseUnits } from "viem";
import {
  Orchestrator_ABI,
  RebasingFundingManager_ABI,
  ERC20Mock_ABI,
  BountyManager_ABI,
  TokenGatedRoleAuthorizer_ABI,
} from "./lib";
import { InitWorkflowProps, BountyManagerRoles } from "./lib/types/workflow";

const initBountyManagerWorkflow = async ({
  publicClient,
  walletClient,
  ERC20Address,
  orchestratorAddress,
}: InitWorkflowProps) => {
  // Create initial contract instances
  const ERC20MockContract = getContract({
    address: ERC20Address,
    abi: ERC20Mock_ABI,
    publicClient,
    walletClient,
  });

  const orchestratorContract = getContract({
    address: orchestratorAddress,
    abi: Orchestrator_ABI,
    publicClient,
    walletClient,
  });

  // Goreli TestNet contracts deployed by the Inverter team, on behalf of the Bloom team.
  // These will be Queried from the Orchestrator contract.
  // Query is optional although this would make the code more dynamic going forward
  const moduleAddresses = {
    authorizerAddress: await orchestratorContract.read.authorizer(),
    fundingManagerAddress: await orchestratorContract.read.fundingManager(),
    paymentProcessorAddress: await orchestratorContract.read.paymentProcessor(),
    bountyManagerAddress:
      await orchestratorContract.read.findModuleAddressInOrchestrator([
        "BountyManager",
      ]),
  };

  // Create module contract instances
  const moduleContracts = {
    authorizerContract: getContract({
      address: moduleAddresses.authorizerAddress,
      abi: TokenGatedRoleAuthorizer_ABI,
      publicClient,
      walletClient,
    }),
    fundingManagerContract: getContract({
      address: moduleAddresses.fundingManagerAddress,
      abi: RebasingFundingManager_ABI,
      publicClient,
      walletClient,
    }),
    paymentProcessorContract: getContract({
      address: moduleAddresses.paymentProcessorAddress,
      abi: RebasingFundingManager_ABI,
      publicClient,
      walletClient,
    }),
    bountyManagerContract: getContract({
      address: moduleAddresses.bountyManagerAddress,
      abi: BountyManager_ABI,
      publicClient,
      walletClient,
    }),
  };

  return {
    ...moduleAddresses,
    ...moduleContracts,
    ERC20MockContract,
    orchestratorContract,
  };
};

const BountyManagerWorkflow = async (props: InitWorkflowProps) => {
  const {
    authorizerAddress,
    paymentProcessorAddress,
    bountyManagerAddress,
    fundingManagerAddress,
    orchestratorContract,
    ERC20MockContract,
    authorizerContract,
    fundingManagerContract,
    paymentProcessorContract,
    bountyManagerContract,
  } = await initBountyManagerWorkflow(props);

  // Addresses of the wallet client
  const walletClientAddresses = await props.walletClient.getAddresses();
  // Read the ERC20Mock decimals
  const ERC20MockDecimals = <number>await ERC20MockContract.read.decimals();

  return {
    contractAddresses: {
      authorizerAddress,
      paymentProcessorAddress,
      bountyManagerAddress,
      fundingManagerAddress,
    },
    // Mint default ( 10 ) tokens to the first address in the wallet
    mintMockERC20: (amount: number) =>
      ERC20MockContract.write.mint([
        walletClientAddresses[0],
        parseUnits(String(amount), ERC20MockDecimals),
      ]),

    // Approve the FundingManager contract to spend the ERC20Mock tokens default ( 10 )
    approveFundingManager: (amount: number) =>
      ERC20MockContract.write.approve([
        fundingManagerAddress,
        parseUnits(String(amount), ERC20MockDecimals),
      ]),

    // Deposit ERC20Mock tokens into the FundingManager contract default ( 10 )
    depositFundingManager: (amount: number) =>
      fundingManagerContract.write.deposit([
        parseUnits(String(amount), ERC20MockDecimals),
      ]),

    // Grant the BountyManager contract a role
    grantBountyManagerRole: (
      role = BountyManagerRoles.BOUNTY_ADMIN_ROLE,
      address = walletClientAddresses[0]
    ) => bountyManagerContract.write.grantModuleRole([role, address]),

    // Add Bounty to the BountyManager contract
    addBounty: (amount: number) =>
      bountyManagerContract.write.addBounty([
        // Minimum Payout
        parseUnits(String(amount), ERC20MockDecimals),
        // Maximum Payout
        parseUnits(String(amount * 2.5), ERC20MockDecimals),
        // Details
        "0x0",
      ]),

    // List Bounty ids
    listBounties: () => bountyManagerContract.read.listBountyIds(),

    // Claim a bounty
    addClaim: (bountyId: number, amount: number) =>
      bountyManagerContract.write.addClaim([
        BigInt(bountyId),
        // This is an array of tuples, each tuple is a claim address and amount
        // used for shared bounty claims
        [
          {
            addr: walletClientAddresses[0],
            claimAmount: parseUnits(String(amount), ERC20MockDecimals),
          },
        ],
        "0x0",
      ]),
  };
};

export default BountyManagerWorkflow;
