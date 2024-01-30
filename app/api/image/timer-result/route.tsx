import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = "edge"

export function GET(req: NextRequest) {
    const {searchParams} = req.nextUrl
    const timeTaken = searchParams.get('timeTaken')
    const tokenImgUrl = searchParams.get('tokenImgUrl')
    const ipfsApi = searchParams.get('ipfsApi')

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          alt="avatar"
          width="256"
          src={`${tokenImgUrl}`}
          style={{
            borderRadius: 128,
          }}
        />
        <p tw='border-2 border-black p-2 mx-4'>time taken: {timeTaken} ms</p>
        <p tw='p-2 mx-4'>ipfs endpoint used: {ipfsApi}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
