---
title: Self-host fonts and scripts
slug: /approaches/self-host-fonts-and-scripts
---

A common practice is to use externally-hosted fonts and Javascript. This often has some benefits in that if a visitor has been to another website that also uses those same fonts or scripts then they are served from the browser cache, and it makes their visit feel faster.

However, if you use any externally hosted assets then you will need to either move these to your own hosting, or proxy them.

If you are using Google Fonts you could:

* If you use Webpack, use the open source Fontsource project and bundle these assets. Beware though, Fontsource does not include support for older browsers, so this was not appropriate for Oak
* Get the Google Fonts assets, make a /fonts folder in your public directory and change your CSS so that it references them. This is the approach that we took for Oak so that we supported older browsers.
* [Proxy](/docs/approaches/proxying) Google Fonts with a Cloudflare Worker. We decided it was better to self-host.

If you are using hosted Javascript, by, for instance Google's [Hosted Libraries](https://developers.google.com/speed/libraries) service:

* Download the assets and save them to your public folder, and then change where these scripts are referenced in your code
* If you use Webpack, include these scripts directly via NPM.

For other services, such as Adobe Fonts, you may find that licencing makes it impossible to self-host these fonts. In which case you would have to:

* Find a way to proxy these fonts whilst remaining compliant with the EULA
* Download the font files and serve them from your public directory. Again, make sure this is compliant with the EULA.
* Change the fonts you use
* Declare it is impossible to zero-rate your site