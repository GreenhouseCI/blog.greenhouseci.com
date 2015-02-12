---
layout: post
title:  "E-mail and iOS OTA distribution"
date:   2015-01-21 16:00:00
categories: Greenhouse update
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



![Email publish add recipients]({{ site.url }}/assets/email-publish-add.png)

Once a successful build is published, all recipients will receive an e-mail with links to build artefacts.
The e-mail will contain a link to a zip file containing all the artefacts and your application binaries separately.
Furthermore, it is possible to have a list of committed changes between the current and previous build.
Here is a preview of the e-mail:



![Email publish example email]({{ site.url }}/assets/email-publish-example-email.png)


iOS OTA distribution
--------------------

In addition to e-mail publishing, iOS applications can now be installed by clicking on the install button in the email.
We are using iOS OTA distribution functionality to make this feature possible. This makes it even easier to be up to date
on the state of your apps. Just click on the install button, accept the install and enjoy the new features.



![iOS OTA dialog]({{ site.url }}/assets/ios-ota-dialog.png)


Coming up
---------

In the coming weeks, Greenhouse will be adding **support for Appium**. Stay tuned for updates!
