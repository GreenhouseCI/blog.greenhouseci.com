---
layout: post
title:  "Now featuring..."
date:   2016-04-18 12:00:00
categories: Greenhouse update
tags: [bitbucket, feature_branch]
author: nik
share: true
published: true
comments: true
---

Git branches are great - cheap to create, they are an excellent way to
encapsulate feature development or set up a sandbox for a quick exploratory
spike. And starting today, Greenhouse will build them right alongside your
project's main branch.

_As with [pull requests]({% post_url 2016-03-07-bitbucket-pull-request-support %}),
we are starting with repositories hosted on Bitbucket. GitHub users, don't worry
- you are next! Feature branch builds are available to our users at the Startup tier and higher.
As with all premium Greenhouse features, though, anyone on a trial can take
branch builds out for a spin as well._

<!--more-->

If your team is already [connected to Bitbucket](http://docs.greenhouseci.com/v1.0/docs/bitbucket),
you need to do exactly nothing to get Greenhouse to start building your project's feature
branches. By default, all branches of your repo will be monitored for push events.
Branch builds will be shown in separate lists on project pages, just like
pull request builds. When you close a feature branch in your remote repository,
it will also be removed from Greenhouse.

If you wish to limit which branches get built, navigate to the "Build"
section of your project settings. In the bottom half of the screen, you'll see a
list of all remote branches Greenhouse has detected, as well as an input field
for the watched branch pattern for your project.

![Bitbucket feature branch configuration](/assets/bitbucket_feature-branches.png "Bitbucket
feature branch configuration")

The pattern uses Unix-shell-type wildcards to match branch names - if you've
ever searched for a file from the CLI, you already know how this works. As you
replace the asterisk with a pattern of your choice, branches matching it will be
highlighted in green for instant feedback. Leave the pattern blank if you do not
wish to build any branches other than your project's main branch.

As always, take a look at [our docs](http://docs.greenhouseci.com/v1.0/docs/bitbucket-feature-branches)
for any additional info.

Stay green!
