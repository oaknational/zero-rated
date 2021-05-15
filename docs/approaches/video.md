---
title: Video
slug: /approaches/video
---

One of the most challenging aspects of our zero-rating efforts with Oak National Academy was making it so that visitors to the website could watch videos served via our own domain.

Most websites that serve video tend to use a third-party video provider. For instance, you might have Youtube or Vimeo videos embedded on your site.

To support zero-rating, for every single one of these videos you will need to:

* Get hold of the original video asset or download it using a download service.
* Re-encode the video and upload it to a video provider that supports serving video via your own subdomain.
* Potentially then pay for all bandwidth in the transfer of data from your new service to your end users.

In many cases the costs here may be prohibitive. Youtube, for instance, provides videos for free but intersperses the playback with advertising. In this new setup you would not be able to (or at least it would be challenging to) serve third party ads. So essentially you would end up covering bandwidth costs yourself. We cannot advise on that, so the following is just a record of what we did on Oak National Academy, and you should seek a full costing before doing similar.

For Oak National Academy we evaluated various providers and picked [Mux.com](https://mux.com) as our video provider. We then worked with them to be able to serve video content on video.thenational.academy. This is significantly more challenging than it sounds, because Mux uses many CDNs and has dynamic systems where DNS settings could change without warning. Mobile Network Operators were eventually happy with the setup that we reached, but it took several months.

The end result for Oak was that all of our video assets are held in Mux and delivered via our own subdomains (Mux also provide an analytics service which we used on another subdomain).