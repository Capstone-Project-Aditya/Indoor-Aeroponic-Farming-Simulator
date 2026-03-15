// Vercel serverless function to proxy /~oauth/initiate requests to Lovable Auth

export default async function handler(req, res) {
  // Forward the request to Lovable Auth's endpoint
  const targetUrl = "https://cloud-auth.lovable.dev/~oauth/initiate";

  // Forward method, headers, and body
  const response = await fetch(targetUrl, {
    method: req.method,
    headers: {
      ...req.headers,
      host: undefined, // Remove host header for proxy
    },
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
  });

  // Copy status and headers
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  // Pipe the response body
  const data = await response.arrayBuffer();
  res.send(Buffer.from(data));
}
