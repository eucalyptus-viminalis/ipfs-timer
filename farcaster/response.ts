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
        <body><p>yo</p></body>
      </html>
    `;
  
    return new Response(html, {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    });
  }
  