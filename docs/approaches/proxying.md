---
title: Proxying
slug: /approaches/proxying
---

If you have a third party script or service accessed via your site, then one approach you should look into is providing a proxy for that service via subdomain.

For instance, let's say you have an analytics service that is accessed via https://analytics.example/embed.js. Rather than using that directly in your front-end code, you could change this to https://analytics.mydomain.example/embed.js and then proxy all of the traffic to the original server.

There are many ways to build a proxy service. You'd need to pick something that would work for your needs and would be dependent on how you have set up your hosting and DNS.

For Oak National Academy, we use Cloudflare for our DNS and it comes with a feature called Workers. These are small Javascript-based code that run whenever an incoming request is received matching a routing rule.

To proxy this example above, you could use some code like this in a worker. This does not include CORS config, and is a simple example to illustate the concept:

```
/**
 * Proxies request to an example domain
**/

// Forward the entire event to Litix
async function handleRequest(request) {
  const url = new URL(request.url)
  url.hostname = "analytics.com"
  return await fetch(url.toString(), request)
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request))
})
```

To use this approach:

* Add a subdomain "analytics" with an AAAA record set to point to "100::" (which goes nowhere), and the global Cloudflare proxy enabled
* Create a new worker in Cloudflare
* Add this code, save it
* Make a route for `*analyics.mydomain.example/*` to route to your new worker

Make a request, say with Curl or Postman for "https://analyics.mydomain.example/embed.js". You should see a 200 response and the content from the original service.

You can expand on this by adding CORS headers or security headers to your worker, and an example of this is in the Github repository for this project.

We made repeated use of this pattern in zero-rating Oak National Academy. We ended up with around 150 subdomains as a result, one per service we were using, with a worker per subdomain. You may find you are able to combine requests into a single worker and a single subdomain. Also, make sure to look at Cloudflare's Wrangler utility to help with code management and deployment.