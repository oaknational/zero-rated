---
title: Rebuild third party tools
slug: /approaches/rebuild-third-party-tools
---

This page assumes you have exhausted other options:

* You cannot remove a service because you are reliant on it
* Proxying the service is too complex because the network requests are far too numerous and interrelated to rewite dynamically in a reliable way, or it's against the EULA to do so
* There are no self-hosted alternatives, or it is prohibitively expensive to move

If this is the case for the service you're trying to zero-rate, then you may have to consider reimplementing the functionality of the component or service you are using. This in itself could prove prohibitively expensive and you may conclude it is therefore impossible to zero-rate your website.

For instance, on Oak National Academy we were making use of Google Forms to run quizzes for all of the students using the service.

We could not move to another form provider easily, without breaking our production process and rebuilding all of our forms on another platform.

We opted to rebuild the functionality ourselves in React, but keep the underlying data held in Google Forms. We found a library which enabled us to "scrape" the content from Google, converted that to a JSON document and then implemented our own user experience in React.

The end results was a fully custom quiz experience but built on top of the existing Google Forms. We could then potentially move to another quiz platform in future as long as we could represent the quiz data in the same JSON structure.

You could take a similar approach, but be aware this is is quite expensive in terms of developer time, and is potentially brittle. If the provider changes anything about their web page (if you are scraping) or API you would have to update your code too.

[See an example](https://classroom.thenational.academy/lessons/computational-thinking-6xgkcc?step=3&activity=exit_quiz) of one of these quizzes.