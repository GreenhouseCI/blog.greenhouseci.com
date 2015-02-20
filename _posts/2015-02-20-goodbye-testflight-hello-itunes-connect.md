---
layout: post
title:  "Goodbye TestFlight, Hello iTunes Connect!"
date:   2015-02-20 16:00:00
categories: Greenhouse update
share: true
comments: true
---

We have some bad news and some good news. Let's start with the bad news. As you may or may not know already, <a href="http://help.testflightapp.com/customer/portal/articles/1768754">Apple has decided to discontinue TestFlight</a>. 
<!--more-->

However, as an alternative, Apple has suggested people use iTunes Connect for build distribution.
There are some obvious downsides to this. 

Firstly, publishing to iTunes Connect requires that the application is signed with App Store distribution certificate. 

Secondly, the application must be "App Store ready" for build distribution, meaning that it must have all the correct icons and icon sizes, otherwise iTunes Connect will tag the binary as 'invalid' and you will not be able to distribute it at all. 

Finally, it requires that each uploaded binary has a different version, otherwise, it will be once again refused by iTunes Connect.

Now that we have all of the bad stuff out of the way, here's the good news. Regardless of these shortcomings, we have implemented publishing directly to iTunes Connect. 


How to setup publishing
-----------------------

Unfortunately, Apple does not provide an API for iTunes Connect as TestFlight did. Greenhouse enables publishing to TestFlight via the Application Loader application. This means that we need your Apple ID and password do perform the publishing on your behalf.

First, log in to <a href="https://itunesconnect.apple.com/WebObjects/iTunesConnect.woa">iTunes Connect</a>

<a data-lightbox="itunes" href="{{ site_url }}/assets/itunes-dashboard.png">
    <img class="post-img" src="{{ site_url }}/assets/itunes-dashboard.png"/>
</a>

Navigate to 'My Apps'. Select your application. Click 'More', and select 'About this App'.
A dialog should pop up that displays your app's identifier. This is confusingly named 'Apple ID'.

<a data-lightbox="itunes" href="{{ site_url }}/assets/itunes-appid.png">
    <img class="post-img" src="{{ site_url }}/assets/itunes-appid.png"/>
</a>

Now that you have the apps's ID, you can add this information to your project in Greenhouse.

<a data-lightbox="itunes" href="{{ site_url }}/assets/itunes-connect-gh.png">
    <img class="post-img" src="{{ site_url }}/assets/itunes-connect-gh.png"/>
</a>

Now, every time you build your app, we will distribute it to iTunes Connect as well. If there are any problems with the build, iTunes Connect will let you know by sending you an e-mail.
