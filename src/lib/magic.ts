import { Magic } from "magic-sdk";

// Initialize the Magic instance
const createMagic = () => {
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
      network: {
        rpcUrl: "https://rpc-mumbai.maticvigil.com/", // Polygon RPC URL
        chainId: 80001, // Polygon chain id
      },
    })
  );
};

export const magic = createMagic();
