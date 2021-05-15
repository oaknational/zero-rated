---
title: Cookies
slug: /approaches/cookies
---

To be zero-rated, your service must not drop third party cookies, even to store the approval of the end user. Often, cookie widgets pop up, ask the visitor for consent to set cookies, and then set a cookie to store the user's preferences.

You should check your website in incognito mode to see if it does this.

If so, you should move to a cookie consent widget that is self-hosted, that uses another method or allows you to store that approval, or sets a cookie that is tied to your own domain.

On Oak National Academy we use Confirmic, which is a service maintained by one of the team, Stef Lewandowski. There are other competitors you could look at.

To enable Confirmic to be zero-rated we added two Cloudflare workers to proxy the traffic to and from Confirmic's servers. These workers also did a rewrite on the traffic to replace "confirmic.com" wherever it appeared in Javascript with our subdomain. This meant that the initial page load would insert the Confirmic javascript, and subsequent requests would then go to our proxied version of the service's GraphQL endpoint. 

You can see an example Cloudflare worker in our the examples folder in our github repository for this project. For your existing cookie consent service, you could take a similar approach.

In future, this will be unnecessary because Confirmic will offer support for a custom domain. 

# Proxy the Confirmic cookie consent widget for zero-rating

In order to use the [Confirmic](https://confirmic.com) cookie consent widget with a zero-rated setup, we needed to proxy assets and rewrite API responses to use our subdomain. 

This should help you if you need to do something similar, and is made up of two Cloudflare workers.

You will need to create three workers on subdomains. Sign in to Cloudflare and add:

```
config AAAA 100::
apipub AAAA 100::
consent-manager AAAA 100::
```

Then create three workers - called "consent-manager", "config" and "apipub" and route them like this in the Cloudflare control panel:

```
config.yourdomain.example/* => config
apipub.yourdomain.example/* => config
consent-manager.yourdomain.example/* => config
```

(Replacing yourdomain.example with your own top level domain).

Then, create a Cloudflare KV namespace, and on each worker make sure you attach it and give it the name CONFIRMIC.

Then, copy the code from the worker files in the example folder in this repository into their respective workers, and save them.

You should now be able to embed the Confirmic widget on your website by replacing "confirmic.com" with your own domain.

```

<script src="https://config.yourdomain.example/config.js?id=prj:change-this-to-your-project-id" crossorigin charset="utf-8"></script>
<script src="https://consent-manager.yourdomain.example/embed.js" crossorigin charset="utf-8"></script>
```

Then, visiting your website, you should see that the consent manager widget appears, but all requests are now proxied through your domain!