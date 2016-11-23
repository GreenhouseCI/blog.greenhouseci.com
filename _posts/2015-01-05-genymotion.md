---
layout: post
title:  "Why we started using Genymotion emulators for continuous integration"
date:   2015-01-05 16:00:00
author: uku
categories: Greenhouse update
tags: [android, testing]
share: true
comments: true
---

## Update
_This article is outdated. The current Greenhouse builders are OSX VMs and as
such lack hardware support for OpenGL, which is required by Genymotion. We are,
however, exploring the possibility of integrating with Genymotion's cloud
offerings. Watch this space for possible announcements and sound off in the
comments or in our [forum](http://docs.greenhouseci.com/discuss) if Genymotion
is of interest to you._

----------------------

When we started out developing support for Android, especially support for Android testing, things did not go as smoothly as expected. 

<!--more-->

Android emulators are unreliable
--------------------------------

First of all, starting the emulator and getting it to the point where you can install the application and run the tests takes several minutes, even with using snapshots. This process would also fail for some reason,  from time to time. The emulator would report that the boot animation had completed, but the the test command would still fail. There is a long-standing bug in *adb* not reporting the correct exit status code. This is also the reason why the Android Gradle plugin *thinks* that the test succceeded even if no tests were actually run. 

In addition to this, due to the way Greenhouse is built (security considerations), we could not use stock Android emulators for UI tests, as the emulator application UI tests require a UI session to be present. So, we had to look into other options.

Genymotion is fast
------------------

Genymotion emulators are blazing fast. When we were using stock Android emulators, it was not uncommon to wait 5 minutes for an emulator to start. However, Genymotion boots as fast as a light-weight Linux distribution. We did not go into the trouble of reproducing all of the statistics ourselves, plenty of people have done a good job of this already. For us, the most important characteristic was boot time. Genymotion was able to get the boot time down to *20 seconds*, with the ability to restore from VirtualBox snapshots, it turns into just a few seconds.


Genymotion is not perfect
-------------------------

Using Genymotion for CI is not all rainbows, butterflies and puppies though. Officially, Genymotion does not support continuous integration, but they are planning to add it for paying customers and their program is currently in closed beta. So, we had to take matters into our own hands and implement the needed functionality for Greenhouse via their Android images and VirtualBox ourselves.

In addition, the Genymotion emulators do not come packaged with Google Play Services anymore because of the licensing restrictions imposed by Google. These have to be installed manually, and finding the latest versions, making sure they are up to date, and getting it all working properly can be quite the hassle.
