---
layout: post
title:  "From greenhouse to farm"
date:   2016-06-30 00:00:00
categories: Greenhouse update
tags: [testing, device farm]
author: nik
share: true
published: true
comments: true
---

<img src="/assets/aws-device-farm-logo.png" alt="AWS Device Farm" class="logo" />
<b>This is a big one and we think you're going to like it!</b>

Starting today, Greenhouse can send your builds to be tested on physical devices
in AWS Device Farm. If you've ever had to deal with code that works in
simulators but fails in real life, or needed to figure out why your app works
for 99% of your users but constantly crashes on device X, this should sound like
awesome news. Which it is. Read on!

<!--more-->

[AWS Device Farm](https://aws.amazon.com/device-farm/) is a member of the Amazon
Web Services family whose job is to let you test your mobile
application on physical devices. Its constantly growing
[device list](https://aws.amazon.com/device-farm/device-list/) includes many iOS
and Android smartphones and tablets, all of which are ready and waiting to put
your app through the wringer. Even if you haven't written any tests for your app
- [why?!!](http://blog.greenhouseci.com/tag/testing/) - you can still take
advantage of Device Farm and let it run its
[built-in fuzz tests](http://docs.aws.amazon.com/devicefarm/latest/developerguide/test-types-built-in-fuzz.html)
that will exercise your app with random UI events and report the results.
Imagine a two-year-old playing with your app and you'll understand why they also
refer to this as "monkey testing".

Even more great news is that at the time of this writing, AWS is offering the
first 250 minutes of Device Farm use for free. This should give you plenty of
time to get things up and running and to see just how much value real device
testing can bring.

## Supported project types
For now, Greenhouse provides integrated Device Farm testing for native Android and
iOS projects. We are hard at work to add support for
multi-platform hybrid apps as well. If this is something that interests you, you
can [poke us to move faster](https://greenhouseci.com/contact-us.html). You can also
create a request for hybrid app in [our forum](http://docs.greenhouseci.com/discuss)
where other Greenhouse users will be able to upvote your post, thereby
multiplying the poking effect.

## Setting up the Greenhouse - Device Farm connection

### AWS
To enable Greenhouse to send your builds to Device Farm, you first need to
configure a few things on the AWS side. Follow the instructions in
[our docs](http://docs.greenhouseci.com/v1.0/docs/aws-device-farm) to generate
credentials and to create a Device Farm project and a device pool. Please
follow good security practices and create a dedicated Greenhouse/Device Farm IAM
user. **Don't give us your root account AWS access!** Or to anyone else, for
that matter.

### Greenhouse
Once you have the necessary info from AWS, head over to your Greenhouse project
settings and look in the **Test** section. Enable Device Farm testing with the
checkbox, then fill in the form below. If your project has tests that are
supported by Device Farm, Greenhouse will present these as an option.
Alternatively, you will always have the choice of Device Farm's fuzz tests. Only
one test type can be run at a time.

![Greenhouse testing configuration screen](/assets/aws-device-farm-settings-in-greenhouse.png)

With everything in place, all that remains is to start a build - whether
manually or via a push hook. As soon as your build succeeds, Greenhouse will
package up your binary and send it to Device Farm. We will wait for all results to
come back before setting the final status for the build, but in the meantime
will keep updating the test run's progress in the Greenhouse dashboard.

As soon as we receive AWS internal reference to your test run, we will create a
link to the run in the AWS Device Farm web console and place it in the **Tests**
section of the build info screen. You can follow it at any time to see the test
run's progress in AWS, or to terminate it before it finishes. Greenhouse will
also list all devices your tests ran on so that you can click on each to see its
detailed results in the AWS Console.

![Device Farm test results in
Greenhouse](/assets/aws-device-farm-test-results-in-greenhouse.png)
