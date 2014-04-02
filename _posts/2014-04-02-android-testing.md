---
layout: post
title:  "We have added Android Unit Test Support!"
date:   2014-01-27 12:18:52
categories: Greenhouse update
share: true
---

Good news, everyone!
We have just added support for Android unit testing using Gradle.

There have been quite a few changes, so let's walk through the one at a time.

The first big change is that we have revamped the build view.
We now have a build overview and detailed test results in addition to the build log.
![Our new improved build view]({{ site.url }}/assets/new_build_view.png)


In the test view, each test can be further expanded to see which class and  method was run, along with the test status.
In case of test failures, the stacktrace is also included, so you easily pinpoint where the test error occurred.


![Our new improved build view]({{ site.url }}/assets/expanded_test_view.png)


You first add your project which includes some unit tests.

*Build overview*
If the project you're building has tests, Greenhouse will automatically this. We automatically detect the SDK target version for the build
and run the tests on the corresponding emulator.

![Failed tests are shown with an orange warning indicator]({{ site.url }}/assets/failed_tests_cropped.png)

We realise that there might be cases where unit tests might fail, but you may still want to get the build artefacts. 
For this reason, we always upload the build artefacts, despite the test results.

Currently, we only support the Gradle default test target. But we are going roll out support for user-specified test targets real soon.

Stay tuned!
