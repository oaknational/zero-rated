---
title: Cookies
slug: /cookies
---

To be zero-rated, your service must not drop third party cookies, even to store the approval of the end user. Often, cookie widgets pop up, ask the visitor for consent to set cookies, and then set a cookie to store the user's preferences.

You should check your website in incognito mode to see if it does this.

If so, you should move to a cookie consent widget that is self-hosted, that uses another method or allows you to store that approval, or sets a cookie that is tied to your own domain.

On Oak National Academy we use Confirmic, which is a service maintained by one of the team, Stef Lewandowski. There are other competitors you could look at.

To enable Confirmic to be zero-rated we added two Cloudflare workers to proxy the traffic to and from Confirmic's servers. These workers also did a rewrite on the traffic to replace "confirmic.com" wherever it appeared in Javascript with our subdomain. This meant that the initial page load would insert the Confirmic javascript, and subsequent requests would then go to our proxied version of the service's GraphQL endpoint. 

You can see an example Cloudflare worker in our the examples folder in our github repository for this project. For your existing cookie consent service, you could take a similar approach.

In future, this will be unnecessary because Confirmic will offer support for a custom domain. 