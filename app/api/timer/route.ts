import { ZORA_API_URL } from "@/blockscout/consts";
import { TransfersResposeBody } from "@/blockscout/tokens";
import { frame200Response } from "@/farcaster/response";
import { erc1155UriToImage } from "@/ipfs/ipfs";
import { IPFS_API } from "@/ipfs/ipfs-enums";
import { get1155Uri } from "@/viem/read";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

const title = "ipfs timer";
const frameVersion = "vNext";

// - Display a title Frame
// - Return 4 fc buttons for various IPFS endpoints
export async function GET() {
    const buttonNames = ["Cloudflare", "dweb.link", "ipfs.io", "Pinata"];
    const postUrl = process.env["HOST"] + `/api/timer`;
    const frameImageUrl =
        process.env["HOST"] + `/title.png`;
    return frame200Response(title, frameVersion, frameImageUrl, postUrl, buttonNames)
}

export async function POST(req: NextRequest, res: NextApiResponse) {
    const searchParams = req.nextUrl.searchParams
    if (searchParams.get("reset") == "true")
    {
        res.redirect(302, '/api/timer')
    }
    const body = await req.json();
    const buttonIndex = body.untrustedData.buttonIndex;
    const buttonIndexToIpfsApi: Record<number, IPFS_API> = {
        1: IPFS_API.CLOUDFLARE,
        2: IPFS_API.DWEB,
        3: IPFS_API.IPFS_IO,
        4: IPFS_API.PINATA,
    };
    const ipfsApi = buttonIndexToIpfsApi[buttonIndex];
    const buttonNames = ["Reset"];

    // Make Zora API call
    const ZAIBS_CA = "0x040cABdDC5C1Ed83B66e0126E74E7F97e6eC36BC"
    const zaibsTransfersReqUrl = ZORA_API_URL + "/tokens/" + ZAIBS_CA + "/transfers"
    const zoraApiResponse = await fetch(zaibsTransfersReqUrl);
    const resBody: TransfersResposeBody = await zoraApiResponse.json();
    const mints = resBody.items.filter(tx => tx.type == "token_minting");
    const latestMint = mints[0];
    const tokenId = latestMint.total.token_id;
    // const addy = latestMint.to.hash;
    // const ens = latestMint.to.ens_domain_name;

    // Viem contract read
    const tokenUri = await get1155Uri(ZAIBS_CA, BigInt(tokenId));

    // Make IPFS API call
    const timeoutMillis = 3000;
    try {
        // Timeout promise
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(
                    new Error(
                        `Timeout: Request took longer than ${timeoutMillis} milliseconds`
                    )
                );
            }, timeoutMillis);
        });

        const startTime = performance.now();    // START TIMER
        // Data promise
        const dataPromise = erc1155UriToImage(tokenUri, ipfsApi);

        // Wait for data or timeout
        const result = await Promise.race([dataPromise, timeoutPromise]);
        const endTime = performance.now();      // END TIMER
        const timeTaken = endTime - startTime;

        console.log(`Time taken to retrieve IPFS: ${timeTaken.toFixed(2)} ms`);
        console.log(`tokenImageUrl: ${result}`);

        // Create frame image
        const frameImageUrl =
            process.env["HOST"] +
            `/api/image/timer-result?timeTaken=${timeTaken.toFixed(2)}&tokenImgUrl=${result}&ipfsApi=${ipfsApi}&date=${Date.now()}}`
        const postUrl = process.env['HOST'] + '/api/timer?reset=true';
        return frame200Response(title, frameVersion, frameImageUrl, postUrl, buttonNames)
    } catch (error: any) {
        // Handle errors
        console.error(error.message);

        const postUrl = process.env['HOST'] + "/api/timer?reset=true";
        const frameImageUrl = error.message.includes("Timeout")
            ? process.env['HOST'] + `/api/image/stopwatch-error?timeout="${timeoutMillis}"&ipfsApi="${ipfsApi}"&date="${Date.now().toFixed(2)}"`
            : process.env['HOST'] + `/api/image/stopwatch-error`;

        return frame200Response(title, frameVersion, frameImageUrl, postUrl, buttonNames)
    }
}
