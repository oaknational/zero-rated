/**
 * Proxies Metomic consent manager 
**/

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
}

let sanitiseHeaders = {
	//"Server" : "My New Server Header!!!",
}

let securityHeaders = {
	"Content-Security-Policy" : "upgrade-insecure-requests",
	"Strict-Transport-Security" : "max-age=1000",
	"X-Xss-Protection" : "1; mode=block",
	"X-Frame-Options" : "DENY",
	"X-Content-Type-Options" : "nosniff",
	"Referrer-Policy" : "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(self \"https://jobs.thenational.academy\"), geolocation=(), microphone=()",
	"X-env" : "nx9msx2mxohte4mc"
}

let removeHeaders = [
	"Public-Key-Pins",
	"X-Powered-By",
	"X-AspNet-Version",
]

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

  const key = url.pathname;

  // This is potentially statically cacheable
  if(url.pathname.includes(".js") && request.method === "GET") {
    const value = await CONFIRMIC.get(key);
    if(!value) {
      console.log("MISS", key)
      const result = await fetch(url.toString());
      const headersArray = []
      for(let header of result.headers) {
        if(header[0] === "cache-control") {
          header[1] = "public, max-age=2592000, stale-while-revalidate"
        }
        headersArray.push(header);
      }
      console.log("Headers", headersArray);
      let resultBody = await result.text()
      resultBody = resultBody.replace(new RegExp("metomic.io", "g"), "thenational.academy");
      const missedResponse = new Response(resultBody, {headers: headersArray}) ;
      missedResponse.headers.set("access-control-allow-methods", "GET, HEAD");
      missedResponse.headers.set("Access-Control-Allow-Origin","*");
      Object.keys(securityHeaders).forEach(name => {
		    missedResponse.headers.set(name, securityHeaders[name]);
	    })
      return missedResponse;
    } else {
      console.log("HIT", key, value);
      const valueJson = JSON.parse(value);
      const cachedResponse = new Response(valueJson.body);
      for(let header of valueJson.headers) {
        console.log("Set header", header[0], header[1]);
        if(header[0] === "cache-control") {
          header[1] = "public, max-age=2592000, stale-while-revalidate"
        }
        cachedResponse.headers.set(header[0], header[1]);
      }
      cachedResponse.headers.set("access-control-allow-methods", "GET, HEAD");
      cachedResponse.headers.set("Access-Control-Allow-Origin","*");
      Object.keys(securityHeaders).forEach(name => {
		    cachedResponse.headers.set(name, securityHeaders[name]);
	    })
      return cachedResponse;
    }
  }
  let response = await fetch(url.toString(), request)
	let newHdrs = new Headers(response.headers)

	if (newHdrs.has("Content-Type") && !newHdrs.get("Content-Type").includes("text/html")) {
		return new Response(response.body , {
			status: response.status,
			statusText: response.statusText,
			headers: newHdrs
		})
	}

	let setHeaders = Object.assign({}, securityHeaders, sanitiseHeaders)

	Object.keys(setHeaders).forEach(name => {
		newHdrs.set(name, setHeaders[name]);
	})

	removeHeaders.forEach(name => {
		newHdrs.delete(name)
	})

	return new Response(response.body , {
		status: response.status,
		statusText: response.statusText,
		headers: newHdrs
	})
}

addEventListener("fetch", event => {
  if (event.request.method === "OPTIONS") {
    // Handle CORS preflight requests
    event.respondWith(handleOptions(event.request))
  } else {
    return event.respondWith(handleRequest(event.request))
  }
})