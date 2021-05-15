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