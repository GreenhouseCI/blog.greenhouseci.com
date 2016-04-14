---
layout: post
title:  "Green light for PR builds"
date:   2016-03-07 12:00:00
categories: Greenhouse update
tags: [bitbucket, pull_request]
author: nik
share: true
comments: true
---

Good news, everybody!

It's been one of the most requested features from our users, and it's finally
here: Greenhouse will now build and test your pull requests.

<!--more-->

## Pull requests
We're big fans of the pull request workflow at Greenhouse and use it daily to
build new features for our platform. Naturally, we wanted to enable our users to
take advantage of this as well, and after no small amount of work we are proud
and happy to roll out the feature today.

If you'd like to learn about pull requests or simply need a refresher, our
friends at Atlassian have a great
[introductory tutorial](https://www.atlassian.com/git/tutorials/making-a-pull-request/).
Many developers, ourselves included, believe that pull requests are the only way
to effectively build a project as a team. In short, if you haven't yet, we
strongly encourage you to try this work process.

## Enabling pull request builds for your Greenhouse project
Pull request builds are an advanced feature of Greenhouse available immediately
to our users at the Startup tier and higher. However, to showcase this shiny new
functionality to as many developers as possible, we will soon enable our
Freelance tier users to start a 14-day trial of our higher-end plans. Keep an
eye out for an upcoming announcement!

Pull requests are currently supported for Bitbucket only, with GitHub
support coming shortly. Your first step, then, is to set up an integration
between Greenhouse and Bitbucket. To do so, navigate to your settings,
create a team if you don't belong to one already, and then go to the team's
"Integrations" section.

![Bitbucket integration](/assets/bitbucket_pr-integrations_screen.png
"Bitbucket Integration")

Once there, click on Bitbucket's "Connect" button. You will be taken to
Bitbucket, prompted to log in if you aren't already, and then presented with a
screen asking you to grant Greenhouse permission to access your repository and
create webhooks.

![Bitbucket authorization](/assets/bitbucket_pr-bitbucket_authorization.png
"Bitbucket Authorization")

Once you do so, you'll come back to Greenhouse, where the
button will have changed from "Connect" to "Disconnect". Behind the scenes,
we will scan you Bitbucket repositories, match them to your Greenhouse
projects, and create webhooks that will notify us whenever you create or update
a pull request on Bitbucket.

When you create a pull request or push a commit to an existing PR, Greenhouse
will fetch your latest changes, merge them into the target branch, and then
build and test the project.

And with that, you're all set.

## Monitoring PR builds
Along with pull request support, we've updated the Greenhouse UI to better
present build data. On your project pages, builds are now grouped based on
whether they belong to the project's main branch or to an open pull request. The
main branch build list is expanded by default - you can click on the branch name
to collapse it, and on any PR name to expand its build list. The status of the
main branch or of a pull request reflects the status of its last build.

![New builds lists](/assets/bitbucket_pr-builds_lists.png "New builds list
UI")

Our new integration also allows us to set build statuses on Bitbucket. Once the
integration is set up, you will see "in progress", "success" and "failure" icons
appear next to your commits as well as on any open pull requests. A green
"success" badge next to your PR means that you can merge with confidence!
