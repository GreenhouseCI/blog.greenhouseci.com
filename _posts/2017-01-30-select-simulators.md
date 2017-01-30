---
layout: post
title:  "Test your builds on multiple devices using iOS Simulators"
date:   2017-01-30 00:00:00
categories: Greenhouse update
tags: [ios, testing]
author: waldemar
share: true
published: true
comments: true
---

If you’re developing for a certain iOS device or software version you might want to run your UI and unit tests on that particular device. Currently there are 16 different Apple iPhones in active use that run various OS versions. Certain combinations affect your tests in terms of performance and possible issues of your app on different devices. It is a good idea to keep the diversity in mind and test your app properly on multiple devices.

<!--more-->

Let’s take a look at iOS simulators and how they can benefit your development process when combining with continuous integration.

## iOS Simulators

Simulators are part of Xcode tools and allow you to test and debug your mobile application on a specific virtual device. For example on an iPhone 7 with iOS 10.0 version, an older iPhone 4 with iOS 7.1.2, or both. Testing different simulation environments (device model + software version) allows you to avoid any possible compatibility issues an end-user may have. While simulators can not replace testing on real devices, they certainly allow you to detect device-specific bugs and misbehaving early on in the development process. 

## Continuous Integration

Selecting iOS simulator manually each time your run a build is great to get started but certainly not sufficient in agile mobile application development, especially with complex projects and targeting multiple devices.
Taking advantage of continuous integration and different workflows, you can take the hassle out of this manual grunt work. In a nutshell, continuous integration & delivery allow you to build, test, and deploy your mobile apps for every commit, automating different tasks, such as automated tests on iOS simulators.

In Greenhouse CI you can select iOS simulators as part of workflows that can be set-up for different branches. In essence, workflows are wrappers around settings you want to define for each build of a project, such as custom scripts, notification, file signing, or test environments. A single project can have multiple workflows.

Navigate to your settings in Greenhouse CI and open the Test view of a specific branch you want to setup the workflow for. You can select one particular simulated device or target multiple specific iOS versions and/or devices from one simple dropdown menu (cf. image below). Note, that later on, you can set-up real device tests from the same view, for example with AWS Device Farm.

Choose the iOS Version, and the iOS device accordingly. If the user has not specified any, Greenhouse will automatically choose a simulator based on your selected Xcode version and project. Take a look at Apple’s Device Compatibility **[Reference](https://developer.apple.com/library/content/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/DeviceCompatibilityMatrix/DeviceCompatibilityMatrix.html "Reference")** to determine the required compatibility of each iOS device model.
Once you setup the workflow in the UI, you can start building your apps and test and debug it on the selected simulated devices for every commit.

&nbsp;
![iOS simulator selection](/assets/ios_simulator_selection_screenshot.jpg "iOS simulator selection")
&nbsp;

## By using iOS simulator during development process you can:

* Build and test iOS apps on multiple devices containing different OS versions
* Find major issue during early UI and unit testing
* Access developer tools only available for Simulator (part of Xcode)
* Build, and test on iOS simulators for every commit.
* Setup different workflows with different iOS simulators
* Deploy apps to QA testers for according real device test
* Save time on testing with real devices by eliminating device specific bugs earlier in the proces

## TL;DR

* Test on devices you are developing for
* Run UI and unit tests on iOS Simulators to find issues early on
* Target multiple iOS device model and version
* Simulators can not replace real device testing
* Automate the process with continuous integration using workflows

## Further Information

For more information how to get started visit Apple’s [guide](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/iOS_Simulator_Guide/GettingStartedwithiOSSimulator/GettingStartedwithiOSSimulator.html#//apple_ref/doc/uid/TP40012848-CH5-SW1 "guide") on iOS Simulators.

For device compatibility take a look into Apple’s [documentation](https://developer.apple.com/library/content/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/DeviceCompatibilityMatrix/DeviceCompatibilityMatrix.html "documentation").
