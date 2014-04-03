---
layout: post
title:  "We Have Added Android Unit Test Support!"
date:   2014-04-03 12:18:52
categories: Greenhouse update
share: true
---

Good news, everyone!  

We have just added support for Android unit testing using Gradle.  
There have been quite a few changes, so let's walk through them one at a time.

Build overview
==============
The first big change is that we have revamped the build view.
We now have a build overview and detailed test results in addition to the build log.

If the project you're building has tests, Greenhouse will automatically detect them. 
So, every time you build your project we run the corresponding unit tests. We extract the SDK target version for the build
and run the tests on the appropriate emulator.

![Our new improved build view]({{ site.url }}/assets/new_build_view.png)



Tests overview 
==============
In the test view, each test can be further expanded to see which class and  method was run, along with the test status.  

In case of test failures, the stacktrace is also included, so you can easily pinpoint where the test occurred.


![Our new improved build view]({{ site.url }}/assets/expanded_test_view.png)




Warning status
================
Builds with failing tests are marked with an orange exclamation mark, so you can tell which builds are really failing, and
are failing due to broken tests.


![Failed tests are shown with an orange warning indicator]({{ site.url }}/assets/failed_tests_cropped.png)

We realise that there might be cases where unit tests might fail, but you may still want to get the build artefacts. 
For this reason, we always upload the build artefacts, regardless of the test results.

Coming up
=========

User specified targets
----------------------
Currently, we only support the Gradle default test target, meaning that you can't select a custom test target. Not to worry, we are going roll out support for user-specified test targets real soon!

Ant support
-----------
Since switching to new build system (Gradle) from an existing working system can be a lot of work, we will be adding Ant support for those of you who have not 
been converted to Gradle yet.

**Stay tuned!**
