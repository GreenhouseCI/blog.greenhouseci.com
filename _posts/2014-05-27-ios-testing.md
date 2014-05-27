---
layout: post
title:  "iOS testing is live"
date:   2014-04-03 12:18:52
categories: Greenhouse update
share: true
comments: true
---

During our latest development phase, we have implemented iOS testing with XCTests.
We have tried to keep the whole process as simple as possible. This means that all you need to do is to add your project, we scan it for tests and run the tests on each build if they are available.
Note, that if you have any existing projects, you have to might have to rescan the project in the project settings view in order for the tests to be detected.

In addition, we have redesigned the settings view.

Coming up
=========
We are moving as fast as possible to get out of our beta phase. Here's a quick run down of the features that we are planning to deliver in the upcoming releases.

Team support
------------
Most of Greenhouse users are part of a team developing mobile applications. Team management is essential for keeping track of the progress on your projects. Continuous integration is not only useful developers, but testers and designers as well. The next major feature will be adding support for teams of developers.

More test frameworks
--------------------
Some of our users have let us know that they would like to see support for additional test frameworks in additon to XCTests. 
We are currently looking into providing support for Cucumber and Frank.

UI tests
--------
Unit tests cannot, unfortunately, catch all of the bugs. This hold especially true for mobile devices.

This was a brief overview of what's been cooking at the GreenhouseCI headquarters. If you would like your favorite framework be supported or have us provide integration with that awesome third-party
service, please let us know. We'll see what we can do. 
**Stay tuned!**
