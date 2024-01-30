import { erc1155abi } from "./abi";
import { publicClient } from "./client";

export async function get1155Uri(
    contractAddress: `0x${string}`,
    tokenId: bigint
) {
    const tokenUri = await publicClient.readContract({
        abi: erc1155abi,
        address: contractAddress as `0x${string}`,
        functionName: "uri",
        args: [BigInt(tokenId)]
    })
    return tokenUri as string
}