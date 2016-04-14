---
layout: post
title:  "GitHub users, don't be green with envy any longer - PR support is here"
date:   2016-03-24 12:00:00
categories: Greenhouse update
tags: [github, pull_request]
author: nik
share: true
comments: true
---

As promised, today we are happy to introduce pull request support for GitHub
repositories!

<!--more-->

For an introduction to the pull request workflow and its implementation on
Greenhouse, please take a look at our [Bitbucket PR post]({% post_url
2016-03-07-bitbucket-pull-request-support %}). Our new GitHub PR support works
exactly the same way:

- navigate to your team's Integrations section and click Octocat's 'Connect'
  button

![GitHub integration](/assets/github_pr-integrations_screen.png
"GitHub Integration")

- on the GitHub's OAuth authorization page, click the green 'Authorize
  application' button to give Greenhouse necessary permissions to access your
  repositories and add webhooks

![GitHub authorization](/assets/github_pr-github_authorization.png
"GitHub Authorization")

From this point on, whenever you create a new pull request or push a commit to
an existing PR, Greenhouse will receive a notification, fetch your latest code,
and then build and test the merge commit between the source and destination
branches of your pull request.

(Please note that at this point, Greenhouse can only monitor pull requests created
_after_ you've enabled the GitHub integration. We plan to roll out the
functionality to support existing PRs soon.)

With that done, create a pull request and watch as Greenhouse launches a
build and sets the PR's status on GitHub - once this

![GitHub in progress](/assets/github_pr-github_in_progress.png
"GitHub in progress")

becomes this

![GitHub success](/assets/github_pr-github_success.png
"GitHub success")

you've got green light to merge.
