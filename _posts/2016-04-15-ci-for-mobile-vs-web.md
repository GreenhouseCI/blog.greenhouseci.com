---
layout: post
title:  "Continuous integration for mobile vs. web applications"
date:   2016-04-14 06:00:00
categories: Greenhouse update
tags: [ci]
author: nik
share: true
published: true
comments: true
---

Hybrid frameworks such as Cordova and Ionic have firmly entrenched themselves as
compelling options for mobile application development. Leveraging their power,
sophisticated cross-platform mobile apps can now be written in HTML, CSS and
JavaScript. This has been most welcome news to web developers, whose toolchains
are typically built around these three core technologies. With the barrier to
entry thus practically eliminated, and with the seemingly unstoppable growth of
mobile, there is little excuse for a web developer not to add mobile app
building to his or her arsenal.

While the transition from web to mobile still takes some effort and requires learning
new techniques, many of the concepts and approaches carry over. Particularly,
developers who have relied on continuous integration in their web work will be
delighted to learn that CI is very much present on the mobile side.  However,
while the CI _concept_ remains the same, its _practicalities_ are somewhat
different. It's a good idea to become aware of these differences right from
the outset.

<!--more-->

## Laying the foundation

When developing mobile applications, you can - nay, should - check the code into
a version control system, make use of repository hosting such as GitHub or
Bitbucket, and write a variety of tests. These foundational building blocks of
continuous integration are well familiar to web developers with CI experience. The next step
is to choose a CI service and set it up so that each push to the remote repo
triggers an application build. At Greenhouse, this process is quick and
painless and requires the minimum of hands-on effort, as you can see from [our
docs](http://docs.greenhouseci.com/docs).

So far, the mobile CI workflow mirrors that of web development: you write some code,
commit, push, then watch the CI service fetch your repo, install dependencies,
build your app and test it. The next step for a web app would be to deploy the
application to a hosting service, making the new version of the web
application immediately available to the public. This is not how things work for
mobile.

## Distribution

The difference at the deployment stage comes down the distribution model. In
many ways, mobile apps take us back to the days of shipping shrink-wrapped CDs
for each new version of our software. A single copy of your web application used
to be the only thing needed to make it available to the entire world. By
contrast, hundreds, thousands and (hopefully) millions of copies of
your mobile app will need to be delivered to users' phones. And while you had
full control of the deployment pipeline for your web app, someone else is in
charge of the mobile distribution channels and you have to be ready to play by their rules.

To begin with, all mobile platforms have a set of guidelines to which all apps
must adhere to be accepted into the official stores. For example, you can take a
look at Google's [here](http://developer.android.com/distribute/essentials/quality/core.html).
Apple goes a step further and requires your app's code to be signed. For this
purpose, you will need to obtain a digital certificate and a provisioning
profile from Apple. Since Greenhouse won't be able to do much with your code
without these, we will request you to upload them if we detect that your project
targets the iOS platform.

Once your app meets all the necessary requirements of one or multiple mobile
platforms, the next step is to get it into Apple's and Google's walled gardens.
While using a CI service such as Greenhouse cannot shortcut this, it can make
things significantly less painful by automating the
key steps. Once a build completes successfully, Greenhouse can automatically
publish your build artefacts - i.e. distribution packages for Android and/or iOS - to
relevant channels. At the moment, we don't support direct publishing to Google
Play as asking you to share your API key would violate Google's terms of
service. Nevertheless, [our docs](http://docs.greenhouseci.com/docs/google-play)
suggest a couple of convenient work-arounds your can use. Things are even
simpler for iOS apps as Greenhouse can publish directly to iTunes Connect -
Apple's pipeline for submitting apps to the App Store.

## Beta testing

In addition to the release channels described above, you may wish to publish
your builds elsewhere. Most web developers are familiar with the concept of
environments - "dev" for development work, "staging" for testing by a small
group of users or a client, and "master" for wide distribution to the public.
Same concepts apply to mobile development, and it's only the "master" branch of
your project that you'll want to submit to Apple or Google. Before that, you'll
want to have the beta version of the app evaluated by your teammates or - if you
have them - dedicated beta-testers. There are several ways in which Greenhouse
can help you get the app on their phones. The simplest by far is to configure
our CI to send the app via email to the addresses you provide. While this is
very straight-forward, you can get _a lot more_ out of your beta testers if you
connect with them via a third party such as HockeyApp, Crashlytics or TestFairy.
These services will not only help you with distribution but can also monitor
crashes, provide detailed reports, and collect user feedback. Here, too,
Greenhouse has your back with automatic publishing to all three.

## Supporting legacy code

Once again, it feels like we're going back in time. "Fragmentation" was not a concept that
applied to web applications, but mobile brings it roaring back. Just because an
awesome new version of your app is available, there is no reason to expect your entire user
base to install it ASAP. Having to do upgrade testing and supporting multiple
versions of your software simultaneously are not happy tasks no matter how you
slice it. Luckily, a good mobile-oriented CI service (ahem, Greenhouse) can help
here by keeping a reliable version record of the binaries it builds.


Whether you are building hybrid or platform-specific apps, and whether you are a
seasoned web developer transitioning to mobile or someone who's coming into the
field from another direction, continuous integration tailored to mobile
development is a powerful tool. It can take care of mundane and error-prone
tasks and let you spend more time where you want to be - writing code. Just as
with any tool, proper understanding of what CI is capable of and how it is
intended to be used in a particular scenario is critical. Without a doubt,
though, taking the time to understand this is well worth it and will bring
immediate benefits.

-------------


The difference at the deployment stage comes down to the fact that as a
developer you have no direct access to the main distribution channels for your
app. To make your web application available to the world, all you needed to do was rent
some webserver space from the likes of Amazon or Digital Ocean. If you paid the
bills, you got the keys to your little piece of the internet and were free to
deploy at will. Not so with mobile. To get the latest version of your code onto
users' phones, you first need to get your app into the walled gardens of Apple,
Google and Microsoft.

