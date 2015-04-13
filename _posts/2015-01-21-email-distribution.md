---
layout: post
title:  "E-mail and iOS OTA distribution"
date:   2015-01-21 16:00:00
author: lauris
categories: Greenhouse update
tags: [publishing, ios]
share: true
comments: true
---

We have made it even easier for you to share your apps with coworkers and testers.
Just add their e-mails and they will be notified when new binaries are available.

<!--more-->


E-mail distribution
-------------------

In addition to TestFlight and HockeyApp, we've added publishing to e-mails as well. This means that for every successful build,
your testers and coworkers get an e-mail with links for installing the new and improved version of your application.

You can add e-mail recipients in the Publishing section of your build settings page:



<a data-lightbox="email-distribution" href="{{ site_url }}/assets/email-publish-add.png">
    <img class="post-img" src="{{ site.url }}/assets/email-publish-add.png" title="Email publish add recipients"/>
</a>

Once a successful build is published, all recipients will receive an e-mail with links to build artefacts.
The e-mail will contain a link to a zip file containing all the artefacts and your application binaries separately.
Furthermore, it is possible to have a list of committed changes between the current and previous build.
Here is a preview of the e-mail:

<a data-lightbox="email-distribution" href="{{ site_url }}/assets/email-publish-example-email.png">
    <img class="post-img" src="{{ site.url }}/assets/email-publish-example-email.png" title="Email publish example email"/>
</a>

iOS OTA distribution
--------------------

In addition to e-mail publishing, iOS applications can now be installed by clicking on the install button in the email.
We are using iOS OTA distribution functionality to make this feature possible. This makes it even easier to be up to date
on the state of your apps. Just click on the install button, accept the install and enjoy the new features.

<a data-lightbox="email-distribution" href="{{ site_url }}/assets/ios-ota-dialog.png">
    <img class="post-img" src="{{ site.url }}/assets/ios-ota-dialog.png" title="iOS OTA dialog"/>
</a>

Coming up
---------

In the coming weeks, Greenhouse will be adding **support for Appium**. Stay tuned for updates!
