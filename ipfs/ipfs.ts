import { IPFS_API } from "./ipfs-enums";

type erc1155UriContent = {
    name: string,
    description: string,
    image: string,
    content?: {
        mime?: string,
        uri?: string
    }
}

export function ipfsSrcToUrl(ipfsSrc: string, ipfsApi: IPFS_API) {
    // DEBUG
    // console.log(ipfsSrc)

    if (ipfsSrc.includes("ipfs://")) {
        return ipfsApi + ipfsSrc.split("//")[1];
    } else return ipfsSrc;
}

export async function erc1155UriToImage(
    uri: string,
    ipfsApi: IPFS_API = IPFS_API.PINATA
)
{
    const res = await fetch(ipfsSrcToUrl(uri, ipfsApi))
    const content: erc1155UriContent = await res.json()
    console.log(`content.image: ${content.image}`)
    return ipfsSrcToUrl(content.image, ipfsApi)

}