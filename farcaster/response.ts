export function frame200Response(title: string, frameVersion: string, frameImageUrl: string, postUrl: string, buttonNames: string[]): Response {
    const html = `
      <!DOCTYPE html> 
      <html>
        <head>
          <title>${title}</title>
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${title}" />
          <meta property="og:image" content="${frameImageUrl}" />
          <meta name="fc:frame" content="${frameVersion}" />
          <meta name="fc:frame:image" content="${frameImageUrl}" />
          <meta name="fc:frame:post_url" content="${postUrl}" />
          ${buttonNames.map(
            (bn, i) => `<meta name="fc:frame:button:${i+1}" content="${bn}" />`
          )}
        </head>
        <body>
          <h1>ipfs timer</h1>
          <p>Farcaster Frame for measuring IPFS gateway latency</p>
          <dl>
            <dt>In action</dt>
            <dd><a href="https://warpcast.com/3070/0x07bf940d">https://warpcast.com/3070/0x07bf940d</a></dd>
            <dt>Code</dt>
            <dd><a href="https://github.com/eucalyptus-viminalis/ipfs-timer">GitHub</a></dd>
          </dl>
          <p>Built by 3070 (<a href="https://warpcast.com/3070">Warpcast Profile</a>)
        </body>
      </html>
    `;
  
    return new Response(html, {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    });
  }
  