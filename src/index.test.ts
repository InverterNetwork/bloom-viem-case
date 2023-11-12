import { expect, describe, it } from "bun:test";
import BountyManagerWorkflow from "./index";
import { createPublicClient, createWalletClient, http } from "viem";
import { goerli } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

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
const walletClient = createWalletClient({
  account: privateKeyToAccount(ownerPrivateKey),
  chain: goerli,
  transport: http(),
});

const {
  contractAddresses,
  mintMockERC20,
  approveFundingManager,
  depositFundingManager,
  grantBountyManagerRole,
  addBounty,
  listBounties,
  addClaim,
} = await BountyManagerWorkflow({
  publicClient,
  walletClient,
  ERC20Address: ERC20MockAddress,
  orchestratorAddress,
});

describe("BloomClient", () => {
  describe("contractAddresses", () => {
    it("should return a list of contract addresses", () => {
      expect(contractAddresses).toBeTruthy();
      console.log(contractAddresses);
    });
  });

  describe("mintMockERC20", () => {
    it("should mint the specified amount of tokens to the first address in the wallet", async () => {
      const res = await mintMockERC20(10);
      expect(res).toBeTruthy();
      console.log("Mint Tx Hash: ", res);
    });
  });

  describe("approveFundingManager", () => {
    it("should approve the FundingManager contract to spend the specified amount of ERC20Mock tokens", async () => {
      const res = await approveFundingManager(10);
      expect(res).toBeTruthy();
    });
  });

  describe("depositFundingManager", () => {
    it("should deposit the specified amount of ERC20Mock tokens into the FundingManager contract", async () => {
      const res = await depositFundingManager(10);
      expect(res).toBeTruthy();
    });
  });

  describe("grantBountyManagerRole", () => {
    it("should grant the specified role to the specified address in the BountyManager contract", async () => {
      const res = await grantBountyManagerRole();
      expect(res).toBeTruthy();
    });
  });

  describe("addBounty", () => {
    it("should add a bounty to the BountyManager contract with the specified minimum and maximum payouts and details", async () => {
      const res = await addBounty(10);
      expect(res).toBeTruthy();
    });
  });

  describe("listBounties", () => {
    it("should return a list of bounty ids from the BountyManager contract", async () => {
      const bountyList = listBounties();
      expect(bountyList).toBeTruthy();
    });
  });

  describe("addClaim", () => {
    it("should add a claim to the specified bounty in the BountyManager contract with the specified amount and address", async () => {
      const res = await addClaim(0, 10);
      expect(res).toBeTruthy();
    });
  });
});
