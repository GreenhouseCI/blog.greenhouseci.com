---
layout: post
title:  "Now more better!"
date:   2016-04-28 12:00:00
categories: Greenhouse update
tags: [github, feature_branch, pull_request]
author: nik
share: true
published: true
comments: true
---

Just a quick note to announce two new additions to Greenhouse's feature set.

First, we will now build feature branches for repositories hosted on GitHub,
just as we already do for Bitbucket repos.
Please note that to take advantage of this, you'll need to set up an
[integration with GitHub](http://docs.greenhouseci.com/v1.0/docs/github).
By default, Greenhouse will monitor and build all of your repo's branches.
(You may have noticed this already after receiving unexpected build
notifications this morning.) If you'd like to exclude some of your feature
branches, head to the "Build" section of your project settings and tweak the
pattern Greenhouse uses for matching branch names. For more info, please consult
[our docs](http://docs.greenhouseci.com/docs/github-feature-branches).

Also today, we are enabling support for pull requests that are already open at
the time you integrate Greenhouse with [GitHub](http://docs.greenhouseci.com/docs/bitbucket)
or [Bitbucket](http://docs.greenhouseci.com/docs/bitbucket). This is something
that will benefit our new users the most - as soon as you set up your Greenhouse
account and enable the integrations, pushes to branches with open PRs targeting your
project's main branch will be automatically detected. Greenhouse will grab your
latest code, build and test the PR's merge commit, and update the pull request's
build status in the remote repository. Once again, take a look at
[the docs](http://docs.greenhouseci.com/docs/pull-requests) for a more thorough
description of our pull request support.

Stay green!
