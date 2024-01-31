# ipfs timer

## Overview

A simple Farcaster Frame server, and a collection of routes, for timing various IPFS gateways. Built with _Next.js_ "appdir".

## Technologies

- _IPFS_: A protocol for creating content-addressed data
  - usage: Querying an IPFS gateway to measure its response time
  - > see `/ipfs/ipfs-enums.ts` for IPFS gateways used
- _viem_: A TypeScript abstraction for interacting with the Ethereum blockchain
  - usage: Reading `uri` of token contract
- _Blockscout_: Plug and play "blockchain explorer as a service"
  - usage: Calling the `/tokens/<contract_address>/transfers` endpoint to retrieve latest transfers of `<contract_address>`
- _Farcaster_: A sufficiently decentralized follow graph protocol
  - usage: Adhering to the specification of [_Farcaster Frames_](https://warpcast.notion.site/Farcaster-Frames-4bd47fe97dc74a42a48d3a234636d8c5) to return valid Farcaster Frames for an interactive mini-app experience of _ipfs timer_ on Warpcast

## Contributors

- 3070 (warpcast profile: https://warpcast.com/3070)
