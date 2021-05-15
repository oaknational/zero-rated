---
title: Google docs
slug: /approaches/google-docs
---

It may be that your site makes use of embedded content from Google docs - slides, documents, or spreadsheets. All of these services make calls to Google and for Oak National Academy we concluded it was essentially impossible for us to be zero-rated with any Google embeds available on our service. 

The only solutions we found to overcoming this problem were to either remove the content, reproduce it and self-host the content or write our own "viewers".

We opted for the latter because we had several thousand documents to consider.

## Making a custom viewer for Google Docs and Slides

Please be aware that doing similar to what we have done for Oak National Academy around providing our own "viewer" for Google docs is not trivial, and it means that you have to either reimplement functionality or not provide it at all. It is also potentially expensive and brittle.

We opted to use the Google API to export PDF versions of all of the Slides that we wanted to embed on our site. We wrote a custom script that looped over each Slides document in our database and then stored a PDF in a Google Cloud storage bucket. 

We made that bucket available publicly via a Cloudflare Worker.

Then, we added URLs for these PDFs into our database so that in our application front end we could reference them.

At this point you could stop and embed the PDF on the page if you do not care too much about user experience. For Oak, we wanted to provide a user interface for students so that they could play the slides, and also to provide a (relatively more) accessible HTML version of these slides.

To achieve this you could use [PDFKit](https://pdfkit.org/) or one of the other libraries that sit on top of it. We chose one that adapts PDFKit for use in React. 

The end result is an attractive embed of the Google Slides document on the screen, rendered using a Canvas (this is not ideal because you lose image alt tags) but the HTML content of the PDF is converted into invisible text.

You can see an example by looking at [a worksheet in one of our lessons](https://classroom.thenational.academy/lessons/its-only-logical-6xgpac?step=3&activity=worksheet).