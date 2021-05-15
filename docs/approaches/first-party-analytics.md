---
title: First-party analytics
slug: /approaches/first-party-analytics
---

Most websites include some kind of analytics service so that it is possible to measure how users are navigating it.

In order to be zero-rated, you must either move to a first-party analytics service or find a way to adjust the way that you are tracking analytics so that all requests to the tracking service are proxied via a service on a subdomain.

For Oak, we decided we did not really need all of the features of Google Analytics and decided to implement our own very simple, privacy-aware analytics service.

This took the form of a Cloudflare Worker that we deployed on a subdomain. We implemented a tracker using the open source NPM module "analytics" and recorded page-views by sending a POST to our Cloudflare Worker. That then pushed to a Google Cloud Platform Pub/Sub endpoint. We could then pipe those Pub/Sub events into BigQuery for analysis.

This is mostly likely too complex for the average website owner. So an alternative to building you own analytics would be to pick a service that allows you to self-host an analytics server.

Some good examples are:

* [Simple Analytics](https://simpleanalytics.com/)
* [Matomo](https://matomo.org/)
* [Fathom](https://usefathom.com/)

Each of these services somewhat replaces the feature-set of Google Analytics, but all requests are sent via your own subdomain at, say stats dot yourdomain.

Once you have replaced your analytics provider, run a check to make sure that all analytics events are not going via a third party domain.