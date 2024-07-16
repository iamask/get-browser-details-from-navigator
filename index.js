/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx)  {
    const { method } = request;
    let requestBody = null;

    var rtt = request.cf.clientTcpRtt;
  
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      // Read the request body as JSON
      try {
        requestBody = await request.json();
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }
  
    // Create the response with the request body as JSON
    const response = new Response(JSON.stringify(requestBody), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return response;
  }
};


