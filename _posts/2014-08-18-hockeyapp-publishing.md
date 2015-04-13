---
layout: post
title:  "Publish all your apps to HockeyApp"
date:   2014-08-18 12:00:00
author: priit
categories: Greenhouse update
tags: [publishing, ios, android]
share: true
comments: true
---

With *<a href="http://hockeyapp.net">HockeyApp</a>* you can distribute your iOS and Android apps, get feedback about your progress and collect crash reports of your apps.

We are happy to announce that Greenhouse latest update introduces HockeyApp integration so that you could conveniently distribute your artefacts to testers and clients.

Greenhouse already supported *<a href="https://www.testflightapp.com">TestFlight</a>* publishing but as it happens, one cannot publish Android applications to TestFlight. With HockeyApp integration we hope to fill that gap.

<!--more-->

Quick setup
=========
The setup is simple, and for those of you who have used TestFlight integration before, it should be really familiar. Here's the guide:

In the project view, click on the spanner icon,

<a data-lightbox="hockeyapp-publishing" href="{{ site_url }}/assets/project-spanner.png">
    <img class="post-img" src="{{ site.url }}/assets/project-spanner.png" />
</a>

this leads you to the project settings view.

In project settings you can see the Publishing section on the sidebar. 
By clicking it, the fields for configuring HockeyApp are displayed.

<a data-lightbox="hockeyapp-publishing" href="{{ site_url }}/assets/hockeyapp.png">
    <img class="post-img" src="{{ site.url }}/assets/hockeyapp.png" />
</a>

To use HockeyApp:
 * obtain your API token from <a href="https://rink.hockeyapp.net/manage/auth_tokens">here</a>;
 * copy-paste the token to Greenhouse and hit save;
 * and that's it!

Other fields are optional, but might come in handy if you'd like to configure a bit more.
Here's a quick overview of their meaning:
 * checking **notify teammates** sends emails for every build to users who are permitted to use your app;
 * **private** option enables the private download page for artefact.


Try it out
=========
Once you have configured HockeyApp for your project, the produced build artefacts are automatically uploaded to HockeyApp and Greenhouse for each build.

<a data-lightbox="hockeyapp-publishing" href="{{ site_url }}/assets/hockeyapp_log_message_cropped.png">
    <img class="post-img" src="{{ site.url }}/assets/hockeyapp_log_message_cropped.png"/>
</a>

In the screenshot, build log reports that it published the build artefacts to both Greenhouse and HockeyApp.

*Note that for iOS projects you can configure publishing to both HockeyApp and TestFlight. In that case Greenhouse will publish the artefacts to each configured service.*
