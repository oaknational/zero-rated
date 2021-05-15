---
title: Use an image-resizing service
slug: /approaches/use-an-image-resizing-service
---

If you have many images referenced on your website but hosted elsewhere, say in an AWS S3 Bucket and are unable to change that URL without breaking it. An alternative to using a Cloudflare Workers proxy would be to use an image resizing service, such as [Imgix](https://imgix.com) or [Cloudinary](https://cloudinary.com), both of which proxy a folder of assets and provide a mechanism to resize them.

A side-effect of using one of these serices is that you can add a subdomain to the service, which effectively acts as a proxy and can give you benefits around image resizing as well as helping with zero-rating.