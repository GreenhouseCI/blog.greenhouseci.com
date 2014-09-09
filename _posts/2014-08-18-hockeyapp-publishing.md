---
layout: post
title:  "Publish all your apps to HockeyApp"
date:   2014-08-18 12:00:00
categories: Greenhouse update
share: true
comments: true
---
With *<a href="http://hockeyapp.net">HockeyApp</a>* you can distribute your iOS and Android apps, get feedback about your progress and collect crash reports of your apps.

We are happy to announce that Greenhouse latest update introduces HockeyApp integration so that you could conveniently distribute your artefacts to testers and clients.

Greenhouse already supported *<a href="https://www.testflightapp.com">TestFlight</a>* publishing but as it happens, one cannot publish Android applications to TestFlight. With HockeyApp integration we hope to fill that gap.

Quick setup
=========
The setup is simple, and for those of you who have used TestFlight integration before, it should be really familiar. Here's the guide:

In the project view, click on the spanner icon,

<img class="post-img" src="{{ site.url }}/assets/project-spanner.png" />

this leads you to the project settings view.

In project settings you can see the Publishing section on the sidebar. 
By clicking it, the fields for configuring HockeyApp are displayed.

<img class="post-img" src="{{ site.url }}/assets/hockeyapp.png" />

To use HockeyApp:
<ul>
    <li>obtain your API token from <a href="https://rink.hockeyapp.net/manage/auth_tokens">here</a>;</li>
    <li>copy-paste the token to Greenhouse and hit save;</li>
    <li>and that's it!</li>
</ul>


Other fields are optional, but might come in handy if you'd like to configure a bit more.
Here's a quick overview of their meaning:
<ul>
    <li>checking <strong>notify teammates</strong> sends emails for every build to users who are permitted to use your app;</li>
    <li><strong>private</strong> option enables the private download page for artefact.</li>
</ul>


Try it out
=========
Once you have configured HockeyApp for your project, the produced build artefacts are automatically uploaded to HockeyApp and Greenhouse for each build.

<img class="post-img" src="{{ site.url }}/assets/hockeyapp_log_message_cropped.png"/>

In the screenshot, build log reports that it published the build artefacts to both Greenhouse and HockeyApp.

*Note that for iOS projects you can configure publishing to both HockeyApp and TestFlight. In that case Greenhouse will publish the artefacts to each configured service.*
