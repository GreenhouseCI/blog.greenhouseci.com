---
layout: post
title:  "CCMenu Support"
date:   2014-05-05 18:26:00
categories: Greenhouse update
share: true
comments: true
---

We're proud to announce a new update to Greenhouse - support for [CCMenu][ccmenu].

[CCMenu][ccmenu] is a tool for OS X that displays the status of your projects right in your Mac's menu bar. It also sends notifications when a build status changes, provides direct access to the relevant project pages and has some other neat features. 

Of course our support is not limited to just CCMenu. All apps that use the same data format as CCMenu are supported like [BuildNotify][BuildNotify] for Linux and [CCTray][CCTray] for windows. 

![CCMenu screenshot	]({{ site.url }}/assets/ccmenu_tray_screenshot.png)

Set up CCMenu
-------------
1. Find the CC feed URL from your Greenhouse [profile page](https://app.greenhouseci.com/#/user) under the Build notificatons section:
![CCMenu screenshot	]({{ site.url }}/assets/cc_feed_url.png)

2. Enter the feed URL into CCMenu from `Preferences... -> [+]`
![CCMenu screenshot	]({{ site.url }}/assets/ccmenu_add_feed.png)

3. Select the projects that you want to monitor:
![CCMenu screenshot	]({{ site.url }}/assets/ccmenu_select_projects.png)


**That's it, you're done!**

What's next?
------------
We're still working hard on adding testing support for iOS projects so keep an eye on our blog for updates.

Do you use a 3rd party service that we don't support yet? If so then please [let us know](mailto:team@greenhouseci.com) and we'll do our best to make the integration as streamlined as possible!



[ccmenu]: http://ccmenu.org/ "CCMenu homepage"
[BuildNotify]: https://bitbucket.org/Anay/buildnotify/wiki/Home "BuildNotify homepage"
[CCTray]: http://sourceforge.net/projects/ccnet/files/CruiseControl.NET%20Releases/CruiseControl.NET%201.8.4/ "Download CCTray"
