---
layout: post
title:  "iOS Testing is Live"
date:   2014-05-28 12:19:45
categories: Greenhouse update
share: true
comments: true
---

More great news!

In the latest Greenhouse update, we have implemented iOS unit testing with [XCTests][xctests].

We have tried to keep the whole process as simple as possible. This means that all you need to do is to add your project, we scan it for tests and run the tests on each build automatically if they are available. For those of you who have tried the [Android testing][android-testing], the process is exactly the same.

<!--more-->

If you have any existing projects, you might have to rescan the project in the project settings view in order for the tests to be detected. For that you have to navigate to project settings page by clicking the wrench icon on your project builds view.

<a data-lightbox="ios-testing" href="{{ site_url }}/assets/builds.png">
    <img class="post-img" src="{{ site.url }}/assets/builds.png" title="Project builds"/>
</a>

Now the project settings page will be shown in the top. Navigate to the build section and hit the rescan button next to branch selection.

<a data-lightbox="ios-testing" href="{{ site_url }}/assets/rescan.png">
    <img class="post-img" src="{{ site.url }}/assets/rescan.png" title="Project builds"/>
</a>

The rescan button triggers our builder to update the configurations and test targets from the selected branch.
This button comes in handy also in situations where you have created a new build configuration.

And that's it, no more configuration magic to get it running!

The test report screen shows you a simple overview of all passed and failed tests including the failure reason so you can quickly identify what's broken.

<a data-lightbox="ios-testing" href="{{ site_url }}/assets/ios_test_view.png">
    <img class="post-img" src="{{ site.url }}/assets/ios_test_view.png" title="iOS build view"/>
</a>


It provides specific information about where the error occurred, including the stacktrace, so you can zoom in fast on the underlying problem in your code.

<a data-lightbox="ios-testing" href="{{ site_url }}/assets/ios_build_log.png">
    <img class="post-img" src="{{ site.url }}/assets/ios_build_log.png" title="iOS build log"/>
</a>


Coming up
=========
We are moving as fast as possible to get out of our beta phase. Here's a quick rundown of the features that we are planning to deliver in the upcoming releases.

Team support
------------
Most of Greenhouse users are not one man armies, but part of a professional team developing mobile applications. Continuous integration is not only useful for developers, but testers and designers as well. The next major feature will be adding support to grant access in Greenhouse to other people that your work with.

More test frameworks
--------------------
Some of our users have let us know that they would like to see support for additional test frameworks in additon to XCTests. 
We are currently looking into providing support for Cucumber and Frank.

UI tests
--------
Unit tests cannot, unfortunately, catch all of the bugs. This holds especially true for mobile devices for which user interface design is of the utmost importance. The design of the user interface can make or break your app!

This was a brief overview of what's been cooking at the GreenhouseCI headquarters. If you would like to see your favorite framework supported by Greenhouse or have us provide integration with that awesome third-party service that you love, please let us know. We'll see what we can do. 

**Stay tuned!**


[xctests]: https://developer.apple.com/library/ios/documentation/ToolsLanguages/Conceptual/Xcode_Overview/UnitTestYourApp/UnitTestYourApp.html "XCTest framework"
[android-testing]: http://blog.greenhouseci.com/greenhouse/update/android-testing/ "Android testing"
