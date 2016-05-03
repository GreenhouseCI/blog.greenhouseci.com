---
layout: post
title:  "Ionic devs, charge up at GreenhouseCI"
date:   2016-02-18 12:00:00
categories: Greenhouse update
tags: [ios, android, ionic]
author: nik
share: true
comments: true
---

Hot on the heels of our support for the Cordova platform, we are
excited to announce that GreenhouseCI can now build **Ionic projects**!

## The Ionic framework
Built on the base of [Apache Cordova](https://cordova.apache.org/), the [Ionic
Framework](http://ionicframework.com/) extends this solid foundation by
leveraging the power of [AngularJS](http://angularjs.org/). This allows Ionic to
boast a significant performance boost and offer a formidable SDK that enables
developers to build robust hybrid mobile apps with great depth of user
experience.

<!--more-->

## How to grow your Ionic project at GreenhouseCI

### Mobile platforms
As with Cordova, we currently support Ionic builds for Android and iOS.
GreenhouseCI will default to building your project for both, unless your
repository includes the `platforms/platforms.json` file, which will be parsed to
extract the platform(s) you've added.

Note that Ionic adds the `platforms` folder to `.gitignore` upon new project
setup. If you'd like to include `platforms.json` in version control, make the
following changes to your `.gitignore`:

{% highlight java %}
- platforms/
+ platforms/*
+ !platforms/platforms.json
{% endhighlight %}

Be sure to add the asterisk to the existing `platforms/` line!

### Before you start
There is a great deal of structural similarity between Cordova and Ionic
projects. In order to tell the two apart, GreenhouseCI relies on the
`ionic.project` file in the root folder of your project. This file is not
created immediately after a new Ionic project is started from the CLI. Sure, you
_could_ add it manually, but even though it's tiny and simple, why not let Ionic
do it for you: just run `ionic serve` from your project's folder.
This will open a browser window in which you can see your shiny new app, but
more importantly it will create the `ionic.project` file. Add it to source
control, and your app is ready for GreenhouseCI.

### Setting up your project
- from your dashboard, click on the 'add a new app' card and fill in the
  requisite inputs with your repo's URL and, if necessary, authentication
  credentials
- select a git branch, and GreenhouseCI will scan it for projects to build
- once the scan is complete, select one of the discovered projects and pick a
  build configuration
- if building for iOS, add your provisioning profile and developer
  certificate
- click 'save' to kick off the first build of your Ionic project and sit back
  with a smile - yes, it's that easy

Stay green!
