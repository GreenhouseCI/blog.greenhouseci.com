---
layout: post
title:  "TestFlight Integration for iOS"
date:   2014-04-02 12:18:52
categories: Greenhouse update
share: true
comments: true
---
Greenhouse supports publishing your iOS builds to TestFlight.
This means that you can easily push your build artefacts to your testers to get instant feedback.

*Note: TestFlight integration is no longer available for your Android projects, as TestFlight is discontinuing their Android support.*

Setting it up
=========
The setup is simple. Here's a quick guide:

In the project view, click the spanner icon,

<img class="post-img" src="{{ site.url }}/assets/spanner.png" />

this leads you to the project settings view.

In project settings you can see the Publishing section on the sidebar.
By clicking on it, you will be presented with the following fields:

<img class="post-img" src="{{ site.url }}/assets/testflight.png" />


To use TestFlight, insert the your <a href="https://testflightapp.com/account/#api">API token</a> and the <a href="https://testflightapp.com/dashboard/team/edit/">team token</a>.
Just copy-paste these, hit save, and you are good to go!


All of the other fields are optional, but might be useful if you need some extra configuration.
Here's a quick overview of their meaning:
<ul>
    <li><strong>distribution list</strong> is list of users who have access to the app</li>
    <li>checking <strong>notify team mates</strong> sends emails for every build to users who are permitted to use your app</li>
    <li><strong>replace binary option</strong> replaces the application binary that if there exists a binary on TestFlight with the same name and bundle version</li>
</ul>


Give it a spin
=========
Once you have configured Testflight for your project, the produced build artefacts are automatically uploaded to TestFlight and Greenhouse for each build. 

<img class="post-img" src="{{ site.url }}/assets/testflight_log_message_cropped.png"/>

In the screenshot, build log reports that it published the build artefacts to both Greenhouse and TestFlight.

Coming up
=========

Hockeyapp distribution
----------------------

Since TestFlight is dropping support for Android, we're looking into other build distribution platforms.
We'll be adding *<a href="http://hockeyapp.net/">HockeyApp</a>* support really soon. 
If you have any other potential candidates for build distribution that we should integrate with, please let us know.

Open beta
---------
Up to now, we have accpeted people into our private beta via invites. The private beta testing phase is coming to an end, and we will be opening our doors for everyone very soon.
