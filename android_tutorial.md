---
layout: page
permalink: /tutorials/android_tutorial/
title: "Building Android apps with Greenhouse"
tags: [tutorial]
image:
  feature: greenhouse_bg_cropped_blog_feature_1024x256.jpg
share: true
---

# Building Android apps with Greenhouse #

## What This Guide Covers ##

In this tutorial we give detailed instructions for Android project setup in
[Greenhouse](https://app.greenhouseci.com).
To be more precise, you'll see how to

 * [add your app's repository](#specify-git-repository)
 * [specify build configuration](#select-configuration)
 * [setup Git hook](#configure-git-hook)
 * [get your tests up and running](#setup-tests)
 * [publish your build artefacts to HockeyApp](#hockeyapp-publishing)
 * [handle build versioning](#build-versioning)

## First steps ##

All you need to setup your project in [Greenhouse](https://app.greenhouseci.com) is a web browser.
But as you are already reading this, then I guess we can agree that you have one anyway.
[Greenhouse](https://app.greenhouseci.com) doesn't require any kind of additional software
from your side and you don't even have to write any tedious configuration files full of technical
boilerplate. We'll scan your repository and from what you have there our builders find
everything they need. You'll just have to confirm what configuration you want to build.

But let's get our hands dirty and see how the process works in detail.

The first time you log in to [Greenhouse](https://app.greenhouseci.com) you'll be
presented with an empty dashboard that encourages you to "Add an app to get started!"
Let's get going by clicking on "add new app".
![Greenhouse dashboard]({{ site.url }}/assets/empty-dashboard.png "Greenhouse dashboard")

<h2 id="specify-git-repository">Specify Git repository</h2>

Clicking the "add new app" card on the dashboard will open a new project creation flow that asks
for your **Git repository URL** and **authentication type** for the repository.

In the example below, I have entered our dummy Android app's [GitHub](https://github.com)
repo URL and selected public authentication:
![Public Git repository]({{ site.url }}/assets/add-app-public-android.png "Public Git repository")

For authentication you have three options:

 * [public repository](#public-authentication)
 * [username and password](#username-and-password-authentication)
 * [SSH key](#ssh-key-authentication)

<h3 id="public-authentication">Public authentication</h3>

If you have a public repository stored in [**GitHub**](https://github.com),
[**Bitbucket**](https://bitbucket.org/) or any other Git server, you should select
**Public repository** for the authentication type.
Please note, however, that you have to use `http(s)://` URL for the repository.

So, for [**GitHub**](https://github.com) users, the repo URL should be in the form
<pre><code>https://github.com/username/repository-name.git</code></pre>
and for [**Bitbucket**](https://bitbucket.org/) users, the repo URL should look like
<pre><code>https://user@bitbucket.org/username/repository-name.git</code></pre>

If you have filled in the repository field, hit the green "continue" button and you will be
directed to the [select configuration](#select-configuration) section.

<h3 id="username-and-password-authentication">Username and password authentication</h3>

In case you have a **password protected repository**, or in other words you are using
*basic auth* to protect your repo, you should select **Username and password**
for the authentication type. Having done so, two more inputs are displayed so that you could fill
in your credentials.

As with public repos, we expect you to enter your repository URL in `http(s)://` format, otherwise
you might see a warning that asks you to do so anyway. In conclusion,
if your repository is in [**GitHub**](https://github.com), the repo URL should be in the form
<pre><code>https://github.com/username/repository-name.git</code></pre>
and for [**Bitbucket**](https://bitbucket.org/) users, the repo URL should look like
<pre><code>https://user@bitbucket.org/username/repository-name.git</code></pre>

All others just make sure your URL starts with a `http(s)://` prefix.

After you have filled in the repository and credentials inputs, you can hit the
green "continue" button and you will be directed to the
[select configuration](#select-configuration) section.

![Password protected Git repository]({{ site.url }}/assets/add-app-credentials-android.png "Password protected Git repository")

<h3 id="ssh-key-authentication">SSH key authentication</h3>

Your repository is protected by an SSH key? No worries, just select **SSH Key** from the
authentication dropdown. You will be displayed an input where you can *drag-n-drop* your
`SSH private key` or on which you can click to pick the key in a more conventional way.
At the very moment you select/drop the key, we will peek into it and check if it's
password protected. If we discover that the key is indeed protected, we kindly ask you to
write the passphrase to the input field that appears under the SSH key field.

Please note that in case of `SSH key` authentication, you should provide a repository URL
that starts with `ssh://`, so the given URL should be something of the form
<pre><code>ssh://username@example.com/path/to/repo</code></pre>
However, the exact pattern might vary from one hosting service to another.

For example, [**GitHub**](https://github.com) users have to use URL that has the following
pattern:
<pre><code>git@github.com:username/repo-name.git</code></pre>
and for [**Bitbucket**](https://bitbucket.org/) users the repo URL should look like
<pre><code>git@bitbucket.org:username/repo-name.git</code></pre>

After you have filled in the repository field and have selected the SSH private key, you can
hit the green "continue" button and you will be redirected to the
[select configuration](#select-configuration) section.

![SSH key protected Git repository]({{ site.url }}/assets/add-app-ssh-key-android.png "SSH key protected Git repository")

<h2 id="select-configuration">Select configuration</h2>

As soon as you submit a repository, either public or private, Greenhouse takes a first look
at it by listing the `branches` in this repository.
The next step for you is to **select the branch** you want Greenhouse to scan for projects from.
To do this you just have to select a branch from the dropdown.
If you've chosen the branch, you can hit the green "select branch" button to proceed.
*(Note that you can change the branch later.)*

Clicking on the "select branch" makes Greenhouse to scan the repository from specified branch.
This includes cloning the repository, looking for projects from it and searching for the
configurations.

All these actions can be monitored at the same time from your browser via the live log window
as seen below.

![Scanning projects]({{ site.url }}/assets/add-app-scan-repo-android.png "Scanning projects")

When the scanning completes you'll be populated with two options: **project** and
**configuration**.

The **Project** section means here an Android app directory in your repository or the
repository root. Project, in a sense, is a container for one or more app flavours. Usually there
is only one project in the repository, but there might be more, for example when you have a
library project and a sample app that uses this library.
In the **configuration** section you can select a `gradle` task that will be used to build
your app by Greenhouse. The easiest choice there is to pick the `assemble` task which
builds every possible configuration of your app at once. If you have some specific flavour
you want to be built, say *ExampleFlavour*, then just select `assembleExampleflavour` and you're
ready to go.

![Configure project]({{ site.url }}/assets/add-app-select-configuration-android.png "Configure project")

Now there's only one more step to build your Android app with Greenhouse and that's clicking
the "save" button!

This action will show you the projects dashboard where you can see the app you just added already
being built.

![New app]({{ site.url }}/assets/add-app-building-android.png "New app")

After `git clone` Greenhouse will automatically find the name and icon of your app from the
repo and updates your project accordingly. To see the progress of your build, just click the
"View build" and you'll be shown the build overview, where you can see the realtime logs of your
build.

![Build log]({{ site.url }}/assets/add-app-build-log-android.png "Build log")

<h2 id="configure-git-hook">Configure Git hook</h2>

We assume that you don't want to bother yourself opening the web browser and clicking the "Build"
button in Greenhouse to see if the build still succeeds after every tiny change in your app's
codebase. That's why Greenhouse supports
[**Git hooks**](http://git-scm.com/book/en/Customizing-Git-Git-Hooks) that provide an easy way
to trigger some actions after you push your changes into the repository.
Using a hook you can trigger a build for every `git push` you make.

Greenhouse automatically detects the hook information from your repository URL and provides the necessary instructions for setting it up. Git hook information is available from project settings view (*Navigate to dashboard, click on the name of your project and then on the little spanner icon*), in the **Hooks** subsection.

<h3>Github hooks</h3>
![Github hook]({{ site.url }}/assets/github-git-hook.png "Github hook")
To setup a hook in Github, navigate to the **Hooks** subsection. Click on **Github hooks page** link that automatically redirects you to your repository settings page in Github.

Now click on **Add webhook** and copy and paste the Payload URL from the text box in Greenhouse to Github.
Note that you must be logged into Github, otherwise Github will tell you that the link is invalid.

<h3>Bitbucket hooks</h3>
To setup a hook for Bitbucket, navigate to the **Hooks subsection**. Click on **Bitbucet hooks page** link that automatically redirects you to your repository settings page in Github.
![Bitbucket hook]({{ site.url }}/assets/bitbucket-git-hook.png "Bitbucket hook")

Now click on **Add hook**, choose **POST** from the menu and copy and paste the URL from the text box in Greenhouse to Bitbucket.

Note that you must be logged into Bitbucket, otherwise Bitbucket will tell you that the link is invalid.
<h3>Generic hooks</h3>
If you are not hosting your repository on Github or Bitbucket, then setting up the hook can be a bit more involved.

![Generic hook]({{ site.url }}/assets/generic-git-hook.png "Generic hook")
When you navigate to the Greenhouse hooks page a **Download hook** button will be shown. Clicking this button downloads a `post-receive` script file. This file *must be* added to your **main Git repository**, where you push your changes, **not your locally checked out version**. 

Finally, you need to add this file to the `.git/hooks` folder which is located at the root of your main Git repository and make the script executable by running
<pre><code>chmod +x post-receive</code></pre>

<h2 id="setup-tests">Testing</h2>

Setting up testing in Greenhouse is 100% automatic. When you submit your repository, we scan the selected configuration for tests. If there are any tests present and you have selected a configuration with `build` prefix, we'll run the tests for every build you make.

In detail, Greenhouse looks for `instrumentTest` or `androidTest` directory from your project based on Android Gradle plugin version specified in the project's `build.gradle` file. (*If you have overridden the default tests directory in your build script, then Greenhouse will look for that.*)

The test report screen shows you a simple overview of all passed and failed tests including the failure reason so you can quickly identify what's broken.

![Tests view]({{ site.url }}/assets/android_test_view.png "Tests view")

It provides specific information about where the error occurred, including the stacktrace, so you can zoom in fast on the underlying problem in your code.

![Build log]({{ site.url }}/assets/android_build_log.png "Build log")

<h2 id="publishing">Publishing</h2>
Greenhouse supports publishing your Android artefacts to [HockeyApp](#hockeyapp)

<h3 id="hockeyapp">HockeyApp</h3>

In the project view, click on the spanner icon,

<img class="post-img" src="{{ site.url }}/assets/project-spanner.png" />

this leads you to the project settings view.

In project settings you can see the Publishing section on the sidebar. 
By clicking it, the fields for configuring HockeyApp are displayed.

<img class="post-img" src="{{ site.url }}/assets/hockeyapp.png" />

To use HockeyApp:

* obtain your API token from [here](https://rink.hockeyapp.net/manage/auth_tokens)
* copy-paste the token to Greenhouse and hit save
* and that's it!

Other fields are optional, but might come in handy if you'd like to configure a bit more.
Here's a quick overview of their meaning:

* checking **notify teammates** sends emails for every build to users who are permitted to use your app
* private option enables the private download page for artefact

Once you have configured HockeyApp for your project, the produced build artefacts are automatically uploaded to HockeyApp and Greenhouse for each build.

<img class="post-img" src="{{ site.url }}/assets/hockeyapp_log_message_cropped.png"/>

In the screenshot, build log reports that it has published the build artefacts to both Greenhouse and HockeyApp.

<h2 id="build-versioning">Build versioning</h2>

To make your build version management easy, Greenhouse exports two environment variables
that you can use in your build scripts: `GREENHOUSE_BUILD` and `BUILD_NUMBER`.

`GREENHOUSE_BUILD` is set to `true` in Greenhouse for every build and it indicates that your build is currently running in a CI environment. `BUILD_NUMBER` environment variable 
holds the total count of builds (including the ongoing build) for this project in Greenhouse. In other words, if you have triggered 10 builds for some project in Greenhouse, the next time you build it `BUILD_NUMBER` will be exported as `11`.

In your `build.gradle` script you can check these values with
<pre><code>greenhouseBuild = System.getenv("GREENHOUSE_BUILD")</code></pre>
and
<pre><code>greenhouseBuildNumber = System.getenv("BUILD_NUMBER")</code></pre>
