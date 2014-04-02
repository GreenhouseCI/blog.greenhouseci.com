---
layout: post
title:  "Test Flight Integration for iOS"
date:   2014-01-27 12:18:52
categories: Greenhouse update
share: true
---
Greenhouse supports publishing your iOS builds to Testflight.

In the project view, there is a spanner icon
![Tesflight]({{ site.url }}/assets/spanner.png)
This leads to the project settings view.

In project settings you can see the TestFlight section.
By expanding it, you will presented with the following fields
![Tesflight]({{ site.url }}/assets/testflight.png)

To use Testflight, you must insert at least the <a href="https://testflightapp.com/account/#api">API token</a> and the <a href="https://testflightapp.com/dashboard/team/edit/">team token</a>.



All of the other fields are optional.
Here's a quick overview of their meaning:
<ul>
    <li><strong>distribution list</strong> is list of users who have access to the app</li>
    <li>checking <strong>notify team mates</strong> sends emails for every build to users who are permitted to use your app</li>
    <li><strong>replace binary option</strong> replaces the application binary that if there exists a binary on test flight with the same name and bundle version</li>
</ul>


Note that this feature is unavailable for your Android projects, as TestFlight is discontinuing their Android support.

Once you have configured Testflight for your project, the produced build artefacts are automatically uploaded to Testflight and Greenhouse for each build. 

![Tesflight]({{ site.url }}/assets/testflight_log_message.png)

