---
layout: post
title:  "Team support up and running"
date:   2014-07-21 12:00:00
categories: Greenhouse update
share: true
comments: true
---

Beta nevermore!
--------------

It has certainly been a busy summer trying to keep up with WWDC, hacking on Swing and watching the World Cup.
Nevertheless, we have persevered and worked hard on bringing Greenhouse out of beta. 

As the latest addition to Greenhouse, we have added team support which allows you to grant access to builds, artefacts and build logs to your teammates and customers.
This way there's no more needless account sharing with third parties - users should only be able to see the projects relevant for them, no more, no less. Good for both security and general housekeeping.
So, without further ado, let's check it out!

Team support
------------


![Teams overview]({{ site.url }}/assets/team-support-teams-overview.png)

Firstly, just to point out, we have redesigned the user settings page for managing teams. 
What once was just a boring old gravatar with your name on it has now been transformed into team selection menu. It indicates which team context you are currently working in.

![Team selection]({{ site.url }}/assets/team-support-team-selection.png)

Projects added within a team context are only visible to the members of that team.

![Team context]({{ site.url }}/assets/team-support-context-example.png)

Note that there's no limit on the number of teams you can create, only on the team members. 

In the manage teams page, you can invite existing Greenhouse users to your team.

![Invite team members]({{ site.url }}/assets/team-support-invite.png)


An e-mail confirmation will be sent to the invited user which must be accepted before a user is added to the team.

You can also remove people from teams, so you won't be forever stuck with employee &#35;2 receiving your e-mails and being able to manage your teams. 


But wait, there's more!
-----------------------
We have added support for Git hooks for Stash and Github. If your project is hosted on Github or you are using Stash, you can now create webhooks which trigger Greenhouse builds on every commit.


Coming up
=========
With team support development out of the way, we can now really focus on the other cool features that you have been all waiting for.

More test frameworks
--------------------
Some of our users have let us know that they would like to see support for additional test frameworks in additon to XCTests. 
We are currently looking into providing support for Cucumber and Frank.

UI tests
--------
Unit tests cannot, unfortunately, catch all of the bugs. This holds especially true for mobile devices for which user interface design is of the utmost importance. The design of the user interface can make or break your app!

This was a brief overview of what's been cooking at the GreenhouseCI headquarters. If you would like to see your favorite framework supported by Greenhouse or have us provide integration with that awesome third-party service that you love, please let us know. We'll see what we can do. 

**Stay tuned!**
