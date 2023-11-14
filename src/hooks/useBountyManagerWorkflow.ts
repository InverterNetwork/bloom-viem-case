import { getContract, parseUnits } from "viem";
import {
  Orchestrator_ABI,
  RebasingFundingManager_ABI,
  ERC20Mock_ABI,
  BountyManager_ABI,
  TokenGatedRoleAuthorizer_ABI,
} from "@/lib";
import { InitWorkflowProps, BountyManagerRoles } from "@/lib/types/workflow";

const initBountyManagerWorkflow = async ({
  publicClient,
  walletClient,
  orchestratorAddress,
}: InitWorkflowProps) => {
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

  const tokenAddress =
    await moduleContracts.fundingManagerContract.read.token();

  // Create ERC20Mock contract / this is a mock contract for testing purposes
  const ERC20MockContract = getContract({
    address: tokenAddress,
    abi: ERC20Mock_ABI,
    publicClient,
    walletClient,
  });

  return {
    ...moduleAddresses,
    ...moduleContracts,
    ERC20MockContract,
    orchestratorContract,
  };
};

const useBountyManagerWorkflow = async (props: InitWorkflowProps) => {
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

  // Read the ERC20Mock decimals
  const ERC20MockDecimals = await ERC20MockContract.read.decimals();

  return {
    contractAddresses: {
      authorizerAddress,
      paymentProcessorAddress,
      bountyManagerAddress,
      fundingManagerAddress,
    },

    /**
     * Mint x amount of tokens to the walletAddress
     */
    mintMockERC20: (walletAddress: `0x${string}`, amount: number) =>
      ERC20MockContract.write.mint([
        walletAddress,
        parseUnits(String(amount), ERC20MockDecimals),
      ]),

    /**
     * Approve the FundingManager contract to spend the ERC20Mock tokens
     */
    approveFundingManager: (
      fundingManagerAddress: `0x${string}`,
      amount: number
    ) =>
      ERC20MockContract.write.approve([
        fundingManagerAddress,
        parseUnits(String(amount), ERC20MockDecimals),
      ]),

    /**
     * Deposit ERC20Mock tokens into the FundingManager contract
     */
    depositFundingManager: (amount: number) =>
      fundingManagerContract.write.deposit([
        parseUnits(String(amount), ERC20MockDecimals),
      ]),

    /**
     * Grant the BountyManager contract a role
     */
    grantBountyManagerRole: (
      role: BountyManagerRoles,
      walletAddress: `0x${string}`
    ) => bountyManagerContract.write.grantModuleRole([role, walletAddress]),

    /**
     * Add Bounty to the BountyManager contract
     */
    addBounty: (amount: number) =>
      bountyManagerContract.write.addBounty([
        // Minimum Payout
        parseUnits(String(amount), ERC20MockDecimals),
        // Maximum Payout
        parseUnits(String(amount * 2.5), ERC20MockDecimals),
        // Details
        "0x0",
      ]),

    /**
     * List Bounty ids
     */
    listBounties: () => bountyManagerContract.read.listBountyIds(),

    /**
     * Claim a bounty
     */
    addClaim: (
      walletAddress: `0x${string}`,
      bountyId: bigint,
      amount: number
    ) =>
      bountyManagerContract.write.addClaim([
        bountyId,
        // This is an array of tuples, each tuple is a claim address and amount
        // used for shared bounty claims
        [
          {
            addr: walletAddress,
            claimAmount: parseUnits(String(amount), ERC20MockDecimals),
          },
        ],
        // Details
        "0x0",
      ]),

    /**
     * List Claim ids
     */
    listClaims: () => bountyManagerContract.read.listClaimIds(),

    /**
     * Verify a claim
     */
    verifyClaim: (claimId: bigint, bountyId: bigint) =>
      bountyManagerContract.write.verifyClaim([claimId, bountyId]),
  };
};

export default useBountyManagerWorkflow;
