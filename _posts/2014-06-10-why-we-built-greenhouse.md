---
layout: post
title:  "Why we built Greenhouse"
date:   2014-06-10 15:57:12
categories: 
share: true
comments: true
---


We often get the question of why we started with Greenhouse when there are other options available for mobile developers. We found out that we spent almost $6000 per year for the free tool that we used.

To be honest we used Hudson/Jenkins for many years as our Android, iOS and Windows Phone continuous integration server of choice at [Mobi Lab][mobi.lab]. Let me be clear - Jenkins, in general, is awesome! It's extremely configurable and extendable and with some help you can make it do stuff like check out code from a CMVC repo in response to a local filesystem event, build a .NET project, run your tests on hundreds of Jenkins slaves or publish your artefacts to a good old FTP server. However all of this freedom comes with a price.
<!--more-->

Running our own Jenkins instance seemed like a cost-effective choice at first but in reality somebody has to take care of a lot of housekeeping:

* Hardware for the Jenkins instance + build nodes (OS X, Linux and a Windows box in our case)
* Keeping the OS up to date on all 3 machines
* Keeping Jenkins up to date + reconfiguring if needed
* Keeping Jenkins plugins up to date + reconfiguring if needed
* Updating Android SDK's, build tools, Gradle etc
* Updating Xcode, xctool, CocoaPods etc

Not to mention that a combination of different plugins/tools are occasionally breaking your existing setup and you'll spend half a day figuring out which plugins are incompatible and causing your new mysterious build failures.

So it turns out that configuring and maintaining a Jenkins setup that can build all the popular mobile platforms is actually quite a lot of work. We ran the numbers and found out that we've spent around 8 hours per month on administering projects, updating Android build tools and SDKs, Xcode, Jenkins and its various plugins etc. It doesn't sound much at first but if you calculate how much that costs in direct salary + context switching then it can easily add up to $500+ per month. If you include the cost of context switching and the fact that you could have really used these 8 hours in polishing your apps then the actual cost increases even more.

We figured that we can do better. Adding CI to your development process shouldn't take more than a couple of minutes and developers shouldn't have to worry about the implementation details of the building, testing and publishing phases of your continuous integration setup. So we set out to build something that's easy to use, requires no configuration or setup and has all the features that mobile developers need. [Check out what we're doing][greenhouse] and leave us your comments & feedback so we can make Greenhouse even better!

[mobi.lab]: http://lab.mobi
[greenhouse]: http://greenhouseci.com
