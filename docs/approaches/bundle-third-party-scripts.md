---
title: Bundle third party scripts
slug: /approaches/bundle-third-party-scripts
---

If you are using Webpack or another module bundler for Javascript, you should evaluate if any third-party scripts can be replaced by pulling in an NPM module or downloading the file into a vendors directory and serving the script as part of your bundle. This means there are no third party network requests, and whilst it could slightly decrease performance, you could use code splitting to mitigate that problem.