---
title: Bundle third party scripts
slug: /approaches/bundle-third-party-scripts
---

If you are using Webpack or another module bundler for Javascript, you should evaluate if any third-party scripts can be replaced by pulling in an NPM module or downloading the file into a vendors directory and serving the script as part of your bundle. This means there are no third party network requests, and whilst it could slightly decrease performance, you could use code splitting to mitigate that problem.

Bundling third party scripts is also useful if you want to change the URLs that a the script calls by default. Let's say you use a application monitoring service that sends analytics about your web page to its servers. To get it to pass traffic through your proxy to its servers, you need to alter the script to change the URL that it uses. You could achieve this by self-hosting the script and making a change to the code. Or indeed, you could future-proof this by using [patch-package](https://www.npmjs.com/package/patch-package) if you are using NPM modules.
