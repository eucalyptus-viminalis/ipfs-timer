import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = "edge"

export function GET(req: NextRequest) {
    const {searchParams} = req.nextUrl
    const timeout = searchParams.get('timeout')
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
        <h3>Timedout</h3>
        <p tw='border-2 border-black p-2 mx-4'>request took longer than: {timeout} ms</p>
        <p tw='p-2 mx-4'>ipfs endpoint used: {ipfsApi}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
