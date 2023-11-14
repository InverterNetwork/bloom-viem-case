import type {
  PublicClient,
  WalletClient,
  Transport,
  Chain,
  Account,
} from "viem";

export enum BountyManagerRoles {
  BOUNTY_ADMIN_ROLE = "0x424f554e54595f41444d494e0000000000000000000000000000000000000000",
  CLAIM_ADMIN_ROLE = "0x434c41494d5f41444d494e000000000000000000000000000000000000000000",
  VERIFY_ADMIN_ROLE = "0x5645524946595f41444d494e0000000000000000000000000000000000000000",
}

export type InitWorkflowProps = {
  publicClient: PublicClient;
  walletClient: WalletClient<Transport, Chain, Account>;
  orchestratorAddress: `0x${string}`;
};
