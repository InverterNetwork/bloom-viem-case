import { expect, describe, it } from "bun:test";
import BloomClient from "./index";

describe("BloomClient", () => {
  describe("mintMockERC20", () => {
    it("should mint the specified amount of tokens to the first address in the wallet", async () => {
      const amount = 10;
      const res = await BloomClient.mintMockERC20(amount);
      expect(res).toBeTruthy();
      console.log("Mint Tx Hash: ", res);
    });
  });

  describe("approveFundingManager", () => {
    it("should approve the FundingManager contract to spend the specified amount of ERC20Mock tokens", async () => {
      const res = await BloomClient.approveFundingManager();
      expect(res).toBeTruthy();
    });
  });

  describe("depositFundingManager", () => {
    it("should deposit the specified amount of ERC20Mock tokens into the FundingManager contract", async () => {
      const res = await BloomClient.depositFundingManager();
      expect(res).toBeTruthy();
    });
  });

  describe("grantBountyManagerRole", () => {
    it("should grant the specified role to the specified address in the BountyManager contract", async () => {
      const res = await BloomClient.grantBountyManagerRole();
      expect(res).toBeTruthy();
    });
  });

  describe("addBounty", () => {
    it("should add a bounty to the BountyManager contract with the specified minimum and maximum payouts and details", async () => {
      const res = await BloomClient.addBounty();
      expect(res).toBeTruthy();
    });
  });

  describe("listBounties", () => {
    it("should return a list of bounty ids from the BountyManager contract", async () => {
      const bountyList = await BloomClient.listBounties();
      expect(bountyList).toBeTruthy();
    });
  });

  describe("addClaim", () => {
    it("should add a claim to the specified bounty in the BountyManager contract with the specified amount and address", async () => {
      const res = await BloomClient.addClaim(0);
      expect(res).toBeTruthy();
    });
  });
});
