---
title: Self-host images
slug: /approaches/self-host-images
---

Often, if your site has a Content Management System (CMS), users of the CMS will have embedded images that are held elsewhere on the web.

If this is the case, you have a few options:

* Use wget2 or similar to fetch all of the assets, place them in your public directory and then replace the links in your CMS database with links to a self-hosted version
* Delete the references to these external images
* Proxy these images in your front end or server-rendered code by checking if they are external, then making a request to a Cloudflare Worker or similar. Eg. change https://example.com/myimage.jpg to https://yourexamplewebsite.com/image-proxy?url=https%3A%2F%2Fexample.com%2Fmyimage.jpg

Please read the [Proxying](/docs/approaches/proxying) page to understand how you might achieve this.