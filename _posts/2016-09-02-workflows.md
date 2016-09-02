---
layout: post
title:  "Go with the (work)flow"
date:   2016-09-02 00:00:00
categories: Greenhouse update
tags: [ci]
author: nik
share: true
published: true
comments: true
---

Today, we are happy to belatedly announce another major Greenhouse feature -
workflows. It's been quietly available for some time, and user reviews have been
overwhelmingly positive. Check this out:

> Hey guys, really loving the new workflows! This is such an amazing feature!

> You did great work with the new Workflows feature. Thanks for adding this one

Let's see what the excitement is all about.

<!--more-->

In a nutshell, workflows are wrappers around all the settings you may wish to
define for a project's build in Greenhouse. What custom scripts should run
during the build, what signing files should be used,  how the build should be
tested, who should be notified at the end, and how the resulting binaries should
be distributed - all these settings are now attached to workflows, and a single
project can have multiple of these.

This will sound like very welcome news to anyone with a project that must be
handled differently e.g. for debug vs. release builds. Rather than duplicating a
project in Greenhouse in order to change its configuration, everything can now be
handled from within a single project via workflows.

To give some idea of what this looks like, here's an example of workflows in
action:

![Greenhouse workflows](/assets/dev_staging_master_workflows.png "Greenhouse
workflows")

As you can see, all settings pertaining to the build environment, build
configuration, tests, notifications and publishing are scoped to workflows. Each
workflow starts out as a copy of an existing one, but thereafter exists as a
wholly separate entity. This means that any workflow can be changed in
isolation, without affecting any of its siblings.

There is a hard limit of 655,360 workflows per project because, let's face it,
640K ought to be enough for anybody. Wait, why does that sound familiar?..

Anyway, head over to [our documentation](http://docs.greenhouseci.com/docs/workflows)
to learn more about setting up and using workflows for your Greenhouse projects.

Stay green!
