---
layout: post
title:  "Google Play support"
date:   2016-07-28 00:00:00
categories: Greenhouse update
tags: [publishing, google_play]
author: uku
share: true
published: true
comments: true
---

<img class="center-image" src="/assets/google_play_logo.png">


As of today, Android is no longer a second-class citizen in terms of build distribution in Greenhouse.
We have supported publishing via iTunes Connect Beta distribution since its inception back when TestFlight was acquired by Apple in February 2014 (wow, has it really been so long?).

It would only seem fair that our Android users could also enjoy the same benefits of beta distribution of their apps just shy of uploading them directly to the app market place.
That is why we have added support for <strong>Google Play</strong> publishing!



## Distribution tracks

Let's first introduce some Google's jargon for those of us who are not yet familiar with it.
Google Play's build distribution is pretty flexible: it allows you to publish your builds to different groups of people depending on the type of the build. A publishing **track** designates which group of testers will receive the build and indicates the level of *release-readiness* of the build as well. 

There are three tracks in total:

* alpha 
* beta
* production

For **alpha** and **beta** tracks, the APKs are sent to testers who are designated to receive respectively either **alpha** or **beta** builds.

The remaining testers who are not designated neither as **alpha** nor **beta** testers will receive the **production** track builds.

## Setting up publishing

![Google Play Publishing](/assets/google_play_screenshot.png "For setting up Google Play publishing you need to provide your service account credentials and select the desired distribution track")

How does it work? It is really straight-forward, it involves two steps:

1. providing Greenhouse with your <a href="http://docs.greenhouseci.com/docs/google-play">Service Account credentials</a> JSON file
2. selecting the track for which you wish to publish

That's it! But before you go ahead and kick off your first build, please be sure skim through the caveats below to ensure the best experience.


## Caveats

1. You need to have manually uploaded at least one APK in the Google Play Developer Console before you can successfully publish APKs from Greenhouse.
2. Your build must produce at least one *release* APK, the Google Play Developer API rejects APKs which are debuggable.
3. You must increment the build version of your application on each build, otherwise publishing will fail complaining about a duplicate APK version. You can find an example Gradle script for this <a href="http://docs.greenhouseci.com/docs/incrementing-android-app-version">here</a>.


   <ul style="width:10%; float:left;">
      <li>1</li>
      <li>2</li>
   </ul>

   <ul style="width:10%; float:left;">
      <li>3</li>
      <li>4</li>
   </ul>
