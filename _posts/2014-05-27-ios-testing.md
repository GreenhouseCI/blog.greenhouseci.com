---
layout: post
title:  "iOS testing is live"
date:   2014-05-28 12:19:45
categories: Greenhouse update
share: true
comments: true
---

During our latest development phase, we have implemented iOS unit testing with XCTests.
We have tried to keep the whole process as simple as possible. This means that all you need to do is to add your project, we scan it for tests and run the tests on each build if they are available. 

Note that if you have any existing projects, you might have to rescan the project in the project settings view in order for the tests to be detected.

We have kept the testing user interface the same as for Android.

![iOS build view]({{ site.url }}/assets/ios_test_view.png)

The test view gives an detailed overview of the tests, so you can quickly review your current build status. 

It provides specific information about where the error occurred, including the stacktrace, so you can zoom in fast on the underlying problem in your code.

![iOS build log]({{ site.url }}/assets/ios_build_log.png)


Coming up
=========
We are moving as fast as possible to get out of our beta phase. Here's a quick rundown of the features that we are planning to deliver in the upcoming releases.

Team support
------------
Most of Greenhouse users are not one man armies, but part of a professioanl team developing mobile applications. Continuous integration is not only useful for developers, but testers and designers as well. The next major feature will be adding support to grant access in Greenhouse to other people that your work with.

More test frameworks
--------------------
Some of our users have let us know that they would like to see support for additional test frameworks in additon to XCTests. 
We are currently looking into providing support for Cucumber and Frank.

UI tests
--------
Unit tests cannot, unfortunately, catch all of the bugs. This holds especially true for mobile devices for which user interface design is of the utmost importance. The design of the user interface can make or break your app!

This was a brief overview of what's been cooking at the GreenhouseCI headquarters. If you would like see favorite framework be supported by Greenhouse or have us provide integration with that awesome third-party service that you love, please let us know. We'll see what we can do. 

**Stay tuned!**
