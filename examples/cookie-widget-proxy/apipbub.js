/**
 * Proxies Metomic apipub 
**/

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
}

function handleOptions(request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  let headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ){
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    let respHeaders = {
      ...corsHeaders,
    // Allow all future content Request headers to go back to browser
    // such as Authorization (Bearer) or X-Client-Name-Version
      "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers"),
    }

    return new Response(null, {
      headers: respHeaders,
    })
  }
  else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, OPTIONS",
      },
    })
  }
}

// Forward the entire event to Metomic
async function handleRequest(request) {
  const url = new URL(request.url)
  url.hostname = url.hostname.split(".")[0] + ".metomic.io"

  const { headers } = request
  const contentType = headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    const body =  await(request.json());
    const init = {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify(body)
    };
    
    console.log(body);

    const bearer = request.headers.get("Authorization")
    const origin = request.headers.get("Origin")

    // This is potentially statically cacheable
    if(body.query.includes("query getConfig")) {
      const toHash = `${origin} ${bearer} ${JSON.stringify(body)}`;
      console.log("toHash", toHash);
      const text = new TextEncoder(toHash).encode();
      const queryDigest = await crypto.subtle.digest(
      {
        name: "SHA-256",
      },
      text,
      )
      const key = Array.from(new Uint8Array(queryDigest)).reduce(function(memo, i) {     return memo + ("0"+i.toString(16)).slice(-2); }, '');
      console.log("Cacheable", key);
      const value = await CONFIRMIC.get(key)
      if(!value) {
        console.log("MISS", key)
        const result = await fetch(url.toString(), init);
        const headersArray = []
        for(let header of result.headers) {
          headersArray.push(header)
        }
        console.log("Headers", headersArray);
        const resultBody = await result.json();
        await CONFIRMIC.put(key, JSON.stringify({headers: headersArray, body: resultBody}), {expirationTtl: 60});
        return new Response(JSON.stringify(resultBody), {headers: headersArray}) ;
      } else {
        console.log("HIT", key, value)
        const valueJson = JSON.parse(value);
        const cachedResponse = new Response(JSON.stringify(valueJson.body));
        for(let header of valueJson.headers) {
          cachedResponse.headers.set(header[0], header[1]);
        }
        return cachedResponse;
      }
    }
    return await fetch(url.toString(), init)
  }
  return await fetch(url.toString(), request)
}

addEventListener("fetch", event => {
  if (event.request.method === "OPTIONS") {
    // Handle CORS preflight requests
    event.respondWith(handleOptions(event.request))
  } else {
    return event.respondWith(handleRequest(event.request))
  }
})