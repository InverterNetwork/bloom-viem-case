import { expect, describe, it } from "bun:test";
import { useTestConnectors, useBountyManagerWorkflow } from "@/hooks";

// Top Level Contract Address ORCHESTRATOR_ADDRESS
const orchestratorAddress = <`0x${string}`>process.env.ORCHESTRATOR_ADDRESS;
if (!orchestratorAddress) throw new Error("ORCHESTRATOR_ADDRESS is required");

const { walletClient, publicClient } = useTestConnectors();

// Addresses of the wallet client
const walletClientAddresses = await walletClient.getAddresses();

const {
  contractAddresses,
  mintMockERC20,
  approveFundingManager,
  depositFundingManager,
  grantBountyManagerRole,
  addBounty,
  listBounties,
  addClaim,
  verifyClaim,
} = await useBountyManagerWorkflow({
  publicClient,
  walletClient,
  orchestratorAddress,
});

describe("BountyManagerWorkflow", () => {
  describe("mintMockERC20", () => {
    it("should mint the specified amount of tokens to the first address in the wallet", async () => {
      const res = await mintMockERC20(walletClientAddresses[0], 10);
      expect(res).toBeTruthy();
      console.log("Mint ERC20 Tx Hash: ", res);
    });
  });

  describe("approveFundingManager", () => {
    it("should approve the FundingManager contract to spend the specified amount of ERC20Mock tokens", async () => {
      const res = await approveFundingManager(
        contractAddresses.fundingManagerAddress,
        10
      );
      expect(res).toBeTruthy();
      console.log("Approve Funding Manager Tx Hash: ", res);
    });
  });

  describe("depositFundingManager", () => {
    it("should deposit the specified amount of ERC20Mock tokens into the FundingManager contract", async () => {
      const res = await depositFundingManager(10);
      expect(res).toBeTruthy();
      console.log("Deposit Funding Manager Tx Hash: ", res);
    });
  });

  describe("addBounty", () => {
    it("should add a bounty to the BountyManager contract", async () => {
      const res = await addBounty(10);
      expect(res).toBeTruthy();
      console.log("Add Bounty Tx Hash: ", res);
    });
  });

  let bountyList: readonly bigint[] = [];
  describe("listBounties", () => {
    it("should return a list of bounty ids from the BountyManager contract", async () => {
      bountyList = await listBounties();
      expect(bountyList).toBeTruthy();
      console.log("List Bounties Res: ", bountyList);
    });
  });

  describe("addClaim", () => {
    it("should add a claim to the specified bounty in the BountyManager", async () => {
      const res = await addClaim(
        walletClientAddresses[0],
        bountyList[bountyList.length - 1],
        10
      );
      expect(res).toBeTruthy();
      console.log("Add Claim Tx Hash: ", res);
    });
  });

  let claimList: readonly bigint[] = [];
  describe("listClaims", () => {
    it("should return a list of claim ids from the BountyManager contract", async () => {
      claimList = await listBounties();
      expect(claimList).toBeTruthy();
      console.log("List Claim Res: ", claimList);
    });
  });

  describe("verifyClaim", () => {
    it("should verify a claim to the specified claim and bounty in the BountyManager", async () => {
      const res = await verifyClaim(
        claimList[claimList.length - 1],
        bountyList[bountyList.length - 1]
      );
      expect(res).toBeTruthy();
      console.log("Verify Claim Tx Hash: ", res);
    });
  });
});
