---
layout: post
title:  "Changing permissions for Bitbucket OAuth"
date:   2017-01-12 00:00:00
categories: Greenhouse update
tags: [bitbucket]
author: nik
share: true
published: true
comments: true
---

<img class="logo" src="/assets/oauth_logo.png" title="OAuth logo">

In our continuous drive to make the Greenhouse experience smooth and hassle-free, we are
currently working on a feature whereby users will be able to select a Git
repository for their new project directly via our UI instead of having to paste
a repo URL. This will be initially supported for repositories hosted on
Bitbucket and GitHub and will require that the user first sets up an
OAuth-backed integration between Greenhouse and respective service.

<!--more-->

To make sure that users don't run into issues while cloning large repositories
via HTTPS, we would like to default to SSH cloning repos selected via this new
feature. To do so, Greenhouse will need to add a deployment SSH key to the
remote repository selected by the user. Our current GitHub integration already
gives Greenhouse the necessary permissions for doing so, but unfortunately our
previous Bitbucket integration was too restrictive to allow this.

To this end, we have updated the list of permissions Greenhouse now requests
when a user sets up the Bitbucket integration or signs up for our service using
Bitbucket credentials. The new permission added to our original list is
`repo:admin`, which is necessary for us to be able to add the deployment SSH
keys. The full list of permissions our Bitbucket OAuth connection now requests
is as follows:

- Account: Email, Read
- Team membership: Read
- Repositories: Read, Admin
- Pull Requests: Read
- Webhooks: Read and write

**This change to our requested OAuth permissions means that all existing
integrations have been invalidated by Bitbucket.** This is a very reasonable and
expected behaviour of their OAuth implementation, designed to protect their
users. If you previously had a Greenhouse-Bitbucket integration set up, please
visit your and/or your team's account settings section, disconnect from
Bitbucket and then re-connect again. While doing so, you will have a chance to
review the new list of permissions requested by Greenhouse and explicitly
approve them (or reject, of course :) ). Until you do so, your Bitbucket
integration won't function. This means that Greenhouse won't be able to update
build statuses in Bitbucket for existing projects, or receive notifications about
events such as commit pushes and pull requests for any new projects.

We are currently working to make sure that broken Bitbucket integrations don't
affect your ability to build your Greenhouse projects, as well as to better
communicate any such integration issues via our UI. In the meantime, we strongly
encourage you to reset your Greenhouse-Bitbucket connection as soon as possible
to avoid interruptions to your service.

Thanks, and stay tuned for the official feature announcement!

_OAuth logo by By Chris Messina, CC BY-SA 3.0
[https://commons.wikimedia.org/w/index.php?curid=7188066](https://commons.wikimedia.org/w/index.php?curid=7188066)_
