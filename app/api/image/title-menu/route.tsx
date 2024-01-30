// import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og"

export const config = {
  runtime: 'edge',
}

export function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    fontSize: 40,
                    color: "black",
                    background: "white",
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h1>ipfs timer</h1>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
