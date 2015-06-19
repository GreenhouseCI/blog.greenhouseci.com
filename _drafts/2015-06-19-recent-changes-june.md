---
layout: post
title:  "What's new in Greenhouse"
date:   2015-06-19 12:33:12
categories: Greenhouse update
tags: []
author: tauno
share: true
comments: true
---

It has been quite some time since we last wrote about what's going on in Greenhouse but that doesn't mean that we have been idling around. We've been busy at work and have launched a couple of new interesting integrations which will make your CI setups even more.. hassle-free.
<!--more-->

Slack
=====
<img src="/assets/logo-slack.png" alt="Slack logo" style="display:block; margin:auto; height: 125px;" />  
[Slack](https://slack.com/) is used by more and more development teams for their daily communication. One cool feature of Slack is the ability to integrate different 3rd party services into their workflow. We're happy to say that Greenhouse is one of them. You can now get a direct link to the newest build directly in your slack chat so that everybody in your team has instant access to the latest binary. We also show the changes since the last build so that it's easy to understand what's new in the latest version.
![Greenhouse notification in Slack](/assets/integration-slack.png)
Enabling Slack integration in Greenhouse is straightforward: go to the Publishing section in the settings of your project, connect with Slack and add your channel ID. That's it! Next time a build completes you'll get a notification in the specified chat.


Beta by Crashlytics
===================
<img src="/assets/logo-beta.png" alt="Beta logo" style="display:block; margin:auto; height: 125px;" />  
There are couple of excellent beta distribution options out there with [Beta](http://try.crashlytics.com/beta/ "Beta by Crashlytics") being one of them. Created by the fine folks at [Crashlytics](https://try.crashlytics.com/) Beta aims to be the most seamless beta distribution experience for both iOS and Android.

It's super easy to enable Beta support in Greenhouse. Head over to the publishing section of your settings page of your app and add your Beta by Crashlytics API key, build secret and tester emails (or group aliases) and you're ready to go. Every time a new build is made in Greenhouse, it'll be automatically published to your testers.


Robolectric
===========
<img src="/assets/logo-robolectric.png" alt="Robolectric logo" style="display:block; margin:auto; height: 125px;" />  
This one is for the Android folks. If you're tired of waiting for your test-runs to complete on the emulator (or real devices) then you've probably heard of [Robolectric](http://robolectric.org/ "Robolectric"). Robolectric allows you to run your unit-tests inside the JVM and provides SDK, resources, & native method emulation. We will automatically detect if you have Robolectric tests in your Android project and we'll run them just like all your other tests. There's nothing for you to configure and this will work out of the box.


Appium & Python
===============
<img src="/assets/logo-appium.png" alt="Appium logo" style="display:block; margin:auto; height: 125px;" />  
[Appium](http://appium.io/) support was added to Greenhouse already back in February and at that point we supported tests written in PHP and Java. Due to popular demand, we now also support tests written in Python! Look [here](greenhouse/update/appium-support/) for the original Appium announcement.

**Appium** tests written in **Python** are detected by looking for a [nose](http://nose.readthedocs.org/en/latest/index.html) configuration file named `greenhouse-nosesetup.cfg`. You can leave the file empty, but as Greenhouse executes your tests using the `nose` framework, you can set the configuration up according to the official [documentation](http://nose.readthedocs.org/en/latest/usage.html#configuration).

In your tests, you must specify the location of the app: the `*.app` directory for iOS or `*.apk` for Android.

For **Android**, this should be the relative path from the test file to the `apk` as in the following example:

    from appium import webdriver

    class AndroidTests(unittest.TestCase):
        def setUp(self):
            desired_caps = {}
            ...
            desired_caps['app'] = os.path.join(
                os.path.dirname(__file__),
                '../../build/outputs/apk/App-greenhouseandroid-debug.apk')
            self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

For **iOS**, we export an environment variable `GREENHOUSE_SYMROOT`. This will hold the path of the current build's SYMROOT. Your tests should use this variable as in the following example:

    from appium import webdriver

    class AndroidTests(unittest.TestCase):
        def setUp(self):
            desired_caps = {}
            ...
            desired_caps['app'] = os.path.join(
                os.environ.get("GREENHOUSE_SYMROOT"),
                "Debug-iphonesimulator/greenhouse-ios.app")
            self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

Example code is available for both [Android](https://github.com/GreenhouseCI/greenhouse-android/tree/appium/greenhouse-test/appium/python) and [iOS](https://github.com/GreenhouseCI/greenhouse-ios/tree/appium/greenhouse-ios/appium/python)

We're working on many more third party integrations. We'll keep you posted!
