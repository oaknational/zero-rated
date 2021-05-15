/**
 * Proxies Confirmic config subdomain
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
  url.hostname = url.hostname.split(".")[0] + ".confirmic.com"

  const { headers } = request

  const key = url.pathname;

  // This is potentially statically cacheable
  if(url.pathname.includes(".js")) {
    const value = await CONFIRMIC.get(key);
    if(!value) {
      console.log("MISS", key)
      const result = await fetch(url.toString(), request);
      const headersArray = []
      for(let header of result.headers) {        
        if(header[0] === "cache-control") {
          header[1] = "public, max-age=2592000, stale-while-revalidate"
        }
        headersArray.push(header);
      }
      
      console.log("Headers", headersArray);
      let resultBody = await result.text()
      console.log("result body before replace", resultBody);
      resultBody = resultBody.replace(new RegExp("confirmic.com", "g"), "thenational.academy");
      console.log("result body", resultBody);
      if(resultBody && resultBody.length > 0) {
        await CONFIRMIC.put(key, JSON.stringify({headers: headersArray, body: resultBody}), {expirationTtl: 60});
      }
      return new Response(resultBody, {headers: headersArray}) ;
    } else {
      console.log("HIT", key, value);
      const valueJson = JSON.parse(value);
      const cachedResponse = new Response(valueJson.body);
      for(let header of valueJson.headers) {
        if(header[0] === "cache-control") {
          header[1] = "public, max-age=2592000, stale-while-revalidate"
        }
        cachedResponse.headers.set(header[0], header[1]);
      }
      return cachedResponse;
    }
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