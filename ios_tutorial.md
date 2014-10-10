---
layout: page
permalink: /tutorials/ios_tutorial/
title: "Building iOS apps with Greenhouse"
tags: [tutorial]
image:
  feature: greenhouse_bg_cropped_blog_feature_1024x256.jpg
share: true
---

# Building iOS apps with Greenhouse #

## What This Guide Covers ##

This tutorial guides you through setting up your iOS project in [Greenhouse](https://app.greenhouseci.com).
The tutorial covers how to:

 * [add your app's repository](#specify-git-repository)
 * [specify build configuration](#select-configuration)
 * [setup Git hooks](#configure-git-hook)
 * [get your tests up and running](#setup-tests)
 * [publish your build artefacts to TestFlight or HockeyApp](#publishing)
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

In the example below, I have entered the [GitHub](https://github.com) repository URL of our dummy iOS app
and selected public authentication:
![Public Git repository]({{ site.url }}/assets/add-app-public-ios.png "Public Git repository")

For authentication you have three options:

 * [public repository](#public-authentication),
 * [username and password](#username-and-password-authentication),
 * [SSH key](#ssh-key-authentication).

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

![Password protected Git repository]({{ site.url }}/assets/add-app-credentials-ios.png "Password protected Git repository")

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

![SSH key protected Git repository]({{ site.url }}/assets/add-app-ssh-key-ios.png "SSH key protected Git repository")

<h2 id="select-configuration">Select configuration</h2>

As soon as you submit a repository, either public or private, Greenhouse takes a first look
at it by listing the `branches` in this repository.
The next step for you is to **select the branch** you want Greenhouse to scan for projects from.
To do this you just have to select a branch from the dropdown.
If you've chosen the branch, you can hit the green "select branch" button to proceed
(note that you can change the branch later).

Clicking on the "select branch" makes Greenhouse to scan the repository from the specified branch.
This includes cloning the repository, looking for projects from it and searching for the
configurations.

All these actions can be monitored at the same time from your browser via the live log window
as seen below.

**If you are using Cocoapods to manage the dependencies of your project, please refer to the [<u>Cocoapods section</u>](#cocoapods) before continuing to read this section!**

Once the project scanning has finished, you need to do the following

* Select a project or a workspace - **Projects** are are containers for code, resources and different build settings.
**Workspaces** are containers of different projects.
    
* Based on the previous selection of **project** or **workspace**, you will need to select either a **Target** (projects) or a **Scheme** (workspaces)

Now that you are done with the build configuration, all that is left to provide the corresponding code signing files.

* [Developer Certificate](#developer-certificate)
* [Provisioning Profile](#provisioning-profile)

*You you might want to skip over to [<u>running your first build</u>](#first-build), if you already know how to provide your developer certificate and provisioning profile*

<h3 id="developer-certificate">Developer Certificate</h3>
----------------------
*Feel free to [<u>skip</u>](#provisioning-profile) this section if you know how to export your developer certificate*

First, we will find your **developer certificate**. 

Open up **Keychain Access** by searching for it in Spotlight. 
In the **Categories** submenu on the left sidebar select **My Certificates**

![Teams overview]({{ site.url }}/images/keychain-expanded-cropped.png)

The name of the certificate should start with **iPhone Developer:**

Once you have located your developer certificate, select **File -> Export Items** from the OSX menu bar.

![Teams overview]({{ site.url }}/images/keychain-export-cropped.png)

This will prompt you to save the developer certificate. 

![Keychain save dialog]({{ site.url }}/images/keychain-save-as-cropped.png)

Be sure to leave the file format filled as **Personal Information Exchange (.p12)**, as saving the certificate with the **.cer**  extension will not include your private key.

Finally, you will be prompted for the **certificate export password**. The password is not actually mandatory and you can leave as blank, but it is recommended to use a strong password.

That's it. Now all you need is the corresponding provisioning profile.

<h3 id="provisioning-profile">Provisioning Profile</h3>
--------------------
*Feel free to [<u>skip</u>](#first-build) this section if you know how to find the corresponding provisioning profile for your application*

Select the appropriate provisioning profile from <a href="https://developer.apple.com/account/ios/profile/profileList.action">Apple Developer portal</a>.
Download it and save it somewhere.


That's it. If you successfully downloaded your developer certificate that should be everything you need. Now you can upload both of these files. 
We check that the provisioning profile and developer certificate match. And will let you know if something goes wrong.


![Scanning projects]({{ site.url }}/assets/add-app-scan-repo-ios.png "Scanning projects")

Regular iOS projects should work out of the box with Greenhouse. However, there might be some extra hassle when it comes to Cocoapods projects. 


<h3 id="cocoapods">Cocoapods</h3>
*Note that you can [<u>skip</u>](#first-build) this section if you are not using Cocoapods for dependency management*

Most iOS developers nowadays are using Cocoapods for dependency management. While it is an excellent tool, it is a bit tricky to set up correctly, at least for a CI environment.

Two things that are most likely to go wrong with Pods are:

1. Selecting a non-workspace project 
2. Not marking your schemes as shared


<h4 id="select_project">Selecting the correct project</h4>

If your project is using **Cocoapods**, you must select the project the name of which ends with **[workspace]**.

![Project selection]({{ site.url }}/images/project-selection-cropped.png)

Similarly, the respective configuration name must end with **[scheme]**.


<h4 id="sharing_schemes">Sharing your schemes</h4>
--------------------
Schemes that are not marked shared in Xcode cannot be built outside Xcode, thus excluding any CI server as well.

Let's walk through the process of sharing a scheme

Navigate to **Product-> Scheme -> Manage Schemes**

![Schemes Menu]({{ site.url }}/images/schemes-menu-cropped.png)

You will then be displayed a list of schemes, each denoted as being **shared** or not.

![Schemes Dialog]({{ site.url }}/images/schemes-dialog-cropped.png)

Make sure that the **shared** checkbox is marked in front of your scheme, then click **OK**.

Finally, once you have marked the scheme as shared, you will have to add the files that Xcode has generated to your git repository as well.

1. Navigate to **Source Control > Commit**.

2. Select the **Shared Data** folder.

3. Enter your commit message in the text field.

4. Select the **Push to remote** option 

5. Click the **Commit Files** button.


![Recanning project]({{ site.url }}/assets/rescan.png)

<h3 id="first-build">Running your first build</h3>

That's it!

![Configure project]({{ site.url }}/assets/add-app-select-configuration-ios.png "Configure project")

Now there's only one more step left to build your iOS app with Greenhouse and that's clicking
the "save" button!

This action will show you the projects dashboard where you can see the app you just added already
being built.

![New app]({{ site.url }}/assets/add-app-building-ios.png "New app")

After `git clone` Greenhouse will automatically find the name and icon of your app from the
repo and updates your project accordingly. To see the progress of your build, just click the
"View build" you'll be shown the build overview, where you can see the real time logs of your
build.

![Build log]({{ site.url }}/assets/add-app-build-log-ios.png "Build log")

<h2 id="configure-git-hook">Configure Git hook</h2>

We assume that you don't want to bother yourself opening the web browser and clicking the "Build"
button in Greenhouse to see if the build still succeeds after every tiny change in your app's
codebase. That's why Greenhouse supports
[**Git hooks**](http://git-scm.com/book/en/Customizing-Git-Git-Hooks) that provide an easy way
to trigger some actions after you push your changes into the repository.
Using a hook you can trigger a build for every `git push` you make.

Greenhouse automatically detects the hook information from your repository URL and provides the necessary instructions for setting it up. Git hook information is available from project settings view (Navigate to dashboard, click on the name of your project and then on the little spanner icon), in the **Hooks** subsection.

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
Setting up testing in Greenhouse is 100% automatic. When you submit your repository, we scan the selected configuration for tests, and if there are any tests present, we run them for every push. 

Greenhouse currently only supports running XCTests. Additionally, the tests must be a part of your scheme in Xcode, otherwise we cannot detect and run them automatically.

The test report screen shows you a simple overview of all passed and failed tests including the failure reason so you can quickly identify what's broken.

![iOS build view]({{ site.url }}/assets/ios_test_view.png)

It provides specific information about where the error occurred, including the stacktrace, so you can zoom in fast on the underlying problem in your code.

![iOS build log]({{ site.url }}/assets/ios_build_log.png)

<h2 id="publishing">Publishing</h2>
Greenhouse supports publishing your artefacts to both [TestFlight](#testflight) and [HockeyApp](#hockeyapp)


<h3 id="testflight">Testflight</h3>

The setup is simple. Here's a quick guide:
In the project view, click the spanner icon,

<img class="post-img" src="{{ site.url }}/assets/spanner.png" />

this leads you to the project settings view.

In project settings you can see the Publishing section on the sidebar.
By clicking on it, you will be presented with the following fields:

<img class="post-img" src="{{ site.url }}/assets/testflight.png" />

To use TestFlight, insert the your [API token](https://testflightapp.com/account/#api) and the [team token](https://testflightapp.com/dashboard/team/edit/).
Just copy-paste these, hit save, and you are good to go!


All of the other fields are optional, but might be useful if you need some extra configuration.
Here's a quick overview of their meaning:

* **distribution list** is list of users who have access to the app
* checking **notify team mates** sends emails for every build to users who are permitted to use your app
* **replace binary** option replaces the application binary if there exists a binary on TestFlight with the same name and bundle version

Once you have configured Testflight for your project, the produced build artefacts are automatically uploaded to TestFlight and Greenhouse for each build. 

<img class="post-img" src="{{ site.url }}/assets/testflight_log_message_cropped.png"/>

In the screenshot, build log reports that it published the build artefacts to both Greenhouse and TestFlight.

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

In the screenshot, build log reports that it published the build artefacts to both Greenhouse and HockeyApp.

*Note that for iOS projects you can configure publishing to both HockeyApp and TestFlight. In that case Greenhouse will publish the artefacts to each configured service.*

<h2 id="build-versioning">Build versioning</h2>

To make your build version management easy, Greenhouse exports two environment variables
that you can use in your build scripts: `GREENHOUSE_BUILD` and `BUILD_NUMBER`.

`GREENHOUSE_BUILD` is set to `true` in Greenhouse for every build and it indicates that your build is currently running in a CI environment. `BUILD_NUMBER` environment variable 
holds the total count of builds (including the ongoing build) for this project in Greenhouse. In other words, if you have triggered 10 builds for some project in Greenhouse, the next time you build it `BUILD_NUMBER` will be exported as `11`.

Since the iOS build ecosystem supports running arbitrary scripts as a part of your build process, you can check the existence and the value of these environment variables in either bash or a scripting language of your choice (such as Ruby or Python).
