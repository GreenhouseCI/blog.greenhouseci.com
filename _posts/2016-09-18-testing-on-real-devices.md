---
layout: post
title:  "Testing your app on real devices"
date:   2016-09-18 00:00:00
categories: Testing
tags: [testing, device_farm, general]
author: tauno
share: true
published: true
comments: true
---

Do you know how many models of iOS devices are currently in active use? I can count 16. Can you guess the number of different Android devices? According to (already outdated) data from [OpenSignal](http://opensignal.com/reports/2015/08/android-fragmentation/), there were around 24,000 different models in circulation in 2015. Let that sink in for a moment, then read on…

<!--more-->

Now that you’re back, let’s see how you can make sure that your app works perfectly on most of these devices.

Is that even possible? Sure it is, but testing and debugging on just different iOS Simulators and Android Emulators is nearly never enough when you want to ship a high quality app to your end users. You might not need to test on physical devices during active development, but doing that before releases is critical. You could certainly just push the app out to users and see if they report any problems via negative reviews and 1-star ratings but do you really want to leave that kind of a negative impression? Most users won’t give you a second chance and will just move on to your competitors - it’s much better for your brand if you are known to release apps that are thoroughly tested and proven to work on the most popular phones and tablets.

Picking the devices to test on
==============================
For iOS, you could theoretically just go ahead and buy all the 16 actively used devices. However, that would still leave you having to figure out how to test different iOS versions on them. Admittedly, that’s a much smaller worry than it is for Android apps but it can’t be totally ignored either. For Android, the variation in different OS versions, form factors, manufacturers, screen resolutions/densities, CPUs, memory limitations and operator customizations is staggering. Buying all of these devices isn’t an option. However, there are ways of narrowing down the list of different devices you need to test on while still leaving you confident that your app will run practically anywhere.

1. Select devices for the OS versions that you want to test on. Luckily, Google helps us out here and provides a [Dashboard](https://developer.android.com/about/dashboards/index.html) that shows the current market share of different OS versions. For iOS, you’d generally choose the latest two OS versions.
2. Test on the most popular devices for your specific app, region and target market. If you have already launched your app and have some users, Google will provide some insights into the most popular devices for you in the Google Play Developer console. If you don't yet have such analytics, do as much research as you can to understand your target users' device preferences.
3. Make sure to test on devices from all the major device manufacturers. Some of them are known for their _quirks_ in device design and/or OS customizations. (I’m looking at you, Samsung!)
4. Don’t forget about different form factors and screen sizes.
Selecting the top devices for each of these major categories should narrow your list down to somewhere between ten to a couple of hundred. Pare it down further if needed based on your budget and goals. That’s many orders of magnitude smaller than the amount of all possible devices!

With the list of devices in hand you essentially have two options. Either you go out and buy all of these devices and set up your own device lab, or you let somebody else solve that problem for you. I strongly suggest the second approach. There are many cloud services that enable you to run your tests on real devices remotely without having to worry about buying or maintaining said devices. Let’s take a quick look at a couple of these.

Testdroid
=========
<img class="center-image" src="/assets/logo-testdroid.png">
**[http://testdroid.com](http://testdroid.com)**  
**Available devices:** 411  
**Price starting from:** $99/month/10h + $0.17/min  
**Supported frameworks:** Appium, Calabash, UI Automation, Jasmine,  Espresso, Robotium, uiautomator  
**Manual testing support:** yes  
**Extras:** Testdroid App Crawler, CPU & Memory Profiles

By far the biggest player in town judging by the number of features and available devices. They offer a public cloud service as well as private dedicated devices, and can also handle on-site setups if you really need to have the devices physically close to you.

You’ll get some value out of Testdroid even if you haven’t written any automated tests yet (which you should have! :) ) - enter the Testdroid App Crawler. Here’s how they describe it themselves: _“Testdroid App Crawler is an intelligent, embedded mechanism to instantly check application’s device compatibility. App Crawler analyzes the application, clicks through the application’s view hierarchy, records the performance data as the crawler progresses through each view, and takes screenshots along the way.”_

AWS Device Farm
===============
<img class="center-image" src="/assets/logo-aws.png">
**[https://aws.amazon.com/device-farm/](https://aws.amazon.com/device-farm/)**  
**Available devices:** 317  
**Price starting from:** $0.17/min or $250/month for unlimited use of a single device  
**Supported frameworks:** Appium, Calabash, instrumentation, uiautomator, UI Automation, XCTest, XCTest UI  
**Manual testing support:** yes  
**Extras:** Explorer tests, Fuzz tests  

This is the service formerly known as AppThwack. When Amazon bought AppThwack, they got rid of their nice and easy to use UI and replaced it with.. Well, AWS. However the service itself is solid and backed by one of the best and biggest players in the world. Luckily, Greenhouse has a [pretty neat integration](http://blog.greenhouseci.com/greenhouse/update/aws-device-farm/) with them so you won’t really have to use their UI once you’ve set up your project.

Another neat aspect are the two automatic testing modes that AWS provides:

* Explorer tests - AWS crawls your app by analyzing each screen and interacting with it as if it were an end user. It takes screenshots as it explores as well. This is very similar to Testdroid’s App Crawler mentioned above.
* Fuzz tests (aka Monkey tests) - Device Farm sends random events to your app to see if and how it works.

When you sign up for AWS Device Farm, you’ll receive 250 free device minutes so that you can test out the service properly before making any commitments.

TestObject
==========
<img class="center-image" src="/assets/logo-testobject.png">
**[https://testobject.com/](https://testobject.com/)**  
**Available devices:** 226  
**Price starting from:** $179/month (20h)  
**Supported frameworks:** Robotium, Espresso and Appium  
**Manual testing support:** yes  

TestObject has been running this service for 4 years and has improved it substantially during this time. Just like Testdroid, TestObject also provides a private cloud and an on-premise solution in addition to their cloud offering. The price per minute is a bit lower than the competition’s but you’ll still get a solid service with lots of devices to test on.


Firebase Test Lab
=================
<img class="center-image" src="/assets/logo-firebase.png">
**[https://firebase.google.com/](https://firebase.google.com/)**  
**Available devices:** 18* (18 physical devices but each of them has a variation of supported OS versions)  
**Price starting from:** $5/h  
**Supported frameworks:** Espresso, Robotium, UI Automator 2.0  
**Manual testing support:** no  
**Extras:** Robo Test, virtual devices  

Firebase is a set of services and tools for app developers that also includes a service called Test Lab that lets you run automated tests on real devices. The biggest caveat is that for now, it’s Android only which means that you have to find yet another service to test your iOS app.

Firebase is also on par with other services in terms of providing their own automated testing solution. They call it Robo Test and it works basically like Testdroid’s App Crawler and AWS Device Farm’s Explorer tests.

What distinguishes Firebase from other services is their recent addition of virtual devices. For $1/h you can also run your tests on a (small) range of Android emulators.

Oh, and firebase is a service from Google, which should give it lots of credibility.

Xamarin Test Cloud
==================
<img class="center-image" src="/assets/logo-xamarin.png">
**[https://www.xamarin.com/test-cloud](https://www.xamarin.com/test-cloud)**  
**Available devices:** 2000* (That seems to be the *total* number of devices they have, not unique device/OS combos. For example they have 75 iPad Air 2’s)  
**Price starting from:** $99/1h/day  
**Supported frameworks:** Xamarin.UITest, Calabash  
**Manual testing support:** no  
**Extras:** Test Recorder  

Xamarin is a bit of an outlier here. It’s mainly meant for, well, Xamarin developers and is integrated well into the Xamarin dev ecosystem. That said, you can actually test any app on it. Their device selection is quite large (despite their rather strange way of counting available devices compared to other services) and includes lots of older devices. You might find this useful if you happen to need to support older OS versions.

A pretty neat feature of Xamarin Test Cloud is their test recorder that they call.. [“Test Recorder”](https://www.xamarin.com/test-cloud/recorder). It basically allows you to record your own manual actions, creates test cases from them and can then replay these on real devices. Handy if you don’t have proper automated tests written yet and want to get quickly up to speed.


Keynote Mobile Testing
======================
<img class="center-image" src="/assets/logo-keynote.png">
**[http://www.keynote.com/solutions/testing/mobile-testing](http://www.keynote.com/solutions/testing/mobile-testing)**  
**Available devices:** ?  
**Price starting from:** $180/10h  
**Supported frameworks:** Appium, Selenium, custom test scripts  
**Manual testing support:** yes  

This is the oldest and by far the most enterprise-focused service (clients include Oracle, SAP etc). Keynote offers public cloud, private cloud and on-premise solutions. One of their special features is that users have access not only to different devices but to different operator networks as well.

In addition to supporting some standard testing frameworks, they also have their own test scripts, with tooling that allows you to record, edit and run scripts straight from Keynote’s test editor.

### Epilogue ###

There are also many other smaller services that try to cover specific niches and there’s no shortage of options. So go ahead, find the service most suitable for your use-case and start testing your apps on real devices!

If you think we should include more testing services in our comparison or do more in-depth reviews, let us know in the comments.

We’re working on integrating more of these on-device testing services into our service. In the meantime, [AWS Device Farm](http://blog.greenhouseci.com/greenhouse/update/aws-device-farm/) is ready to take your Greenhouse build for a spin and show you how your app will perform in the real world.
