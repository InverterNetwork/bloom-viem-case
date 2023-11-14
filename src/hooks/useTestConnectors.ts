import {
  Account,
  Chain,
  PublicClient,
  Transport,
  WalletClient,
  createPublicClient,
  createWalletClient,
  http,
} from "viem";
import { goerli } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

export default function useTestConnectors(): {
  publicClient: PublicClient<Transport, Chain>;
  walletClient: WalletClient<Transport, Chain, Account>;
} {
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

  return {
    publicClient,
    walletClient,
  };
}
