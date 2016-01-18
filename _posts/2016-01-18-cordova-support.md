---
layout: post
title:  "Greenhouse now supports Cordova projects"
date:   2016-01-18 12:00:00
categories: Greenhouse update
tags: [ios, android, cordova]
author: nik
share: true
comments: true
---

Great news for developers working on cross-platform mobile applications using
Cordova: you can now build your projects with Greenhouse!

<!--more-->

## The Cordova framework

[Apache Cordova](https://cordova.apache.org/) is a framework for developing
mobile applications with HTML, CSS and JavaScript, rather than using
platform-specific APIs. The upshot of using Cordova is that a single code base can
target multiple mobile platforms such as Android, iOS and Windows Phone.

## Cordova at Greenhouse

At the moment, Greenhouse supports builds for Android and iOS platforms within
Cordova projects. We determine what builds to run based on the information
found in your project's `/platforms/platforms.json` file. As some developers
may choose not to include the `/platforms` folder in version control, Greenhouse
will build your project for both Android and iOS if `platforms.json` cannot
be found. This means that it will expect you to upload an iOS provisioning
profile and developer certificate unless your `platforms.json` explicitly specifies the
Android platform only.
