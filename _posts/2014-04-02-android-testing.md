---
layout: post
title:  "We have added Android Unit Test Support!"
date:   2014-01-27 12:18:52
categories: Greenhouse update
share: true
---

We have just began to support Android testing for Gradle.

There have been quite a few changes, so let's walk through the process.

The first big change is that we have revamped the build view.

You first add your project which includes some unit tests.

If the project you're building has tests, Greenhouse will automatically this. We automatically detect the SDK target version for the build
and run the tests on the corresponding emulator.



![Failed tests are shown with an orange warning indicator]({{ site.url }}/assets/failed_tests.png)
