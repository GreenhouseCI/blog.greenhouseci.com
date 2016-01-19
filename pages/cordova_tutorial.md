---
layout: post
permalink: /tutorials/cordova_tutorial/
title: "Building Apache Cordova apps with Greenhouse"
tags: [tutorial]
share: true
---

# Building Apache Cordova apps with Greenhouse

## What This Guide Covers

This tutorial guides you through setting up your Cordova project in [Greenhouse](https://app.greenhouseci.com).
We will show you how to

 * [add your app's repository](#specify-git-repository)
 * [specify build configuration](#select-configuration)
 * [setup Git hooks](#configure-git-hook)
 * [publish your build artefacts](#publishing)
 * [handle build versioning](#build-versioning)

## First steps

All you need to setup your project in [Greenhouse](https://app.greenhouseci.com) is a web browser.
As you are reading this, we can probably agree that you have one already.
[Greenhouse](https://app.greenhouseci.com) doesn't require any additional software
from your side and you don't even have to write any tedious configuration files full of technical
boilerplate. We'll scan your repository and based on its contents our builders will find
everything they need. You'll just have to confirm the configuration you want to build.

But let's get our hands dirty and see how the process works in detail.

The first time you log in to [Greenhouse](https://app.greenhouseci.com) you'll be
presented with an empty dashboard that encourages you to "Add an app to get started!"
Let's get going by clicking on "add new app".
![Greenhouse dashboard]({{ site.url }}/assets/empty-dashboard-cordova.png "Greenhouse dashboard")

<h2 id="specify-git-repository">Specify Git repository</h2>

Clicking the "add new app" card on the dashboard will open a new project creation flow that asks
for your **Git repository URL** and an **authentication type** for that repository.

In the example below, I have entered the [GitHub](https://github.com) repository URL of our dummy Cordova app
and selected public authentication:
![Public Git repository]({{ site.url }}/assets/add-app-public-cordova.png "Public Git repository")

For authentication you have three options:

 * [public repository](#public-authentication),
 * [username and password](#username-and-password-authentication),
 * [SSH key](#ssh-key-authentication).

<h3 id="public-authentication">Public authentication</h3>

If you have a public repository stored on [**GitHub**](https://github.com),
[**Bitbucket**](https://bitbucket.org/) or any other Git server, you should select
**Public repository** for the authentication type.
Please note, however, that you have to use an `httpS://` URL for the repository.

So, for [**GitHub**](https://github.com) users, the repo URL should be in the form
<pre><code>https://github.com/username/repository-name.git</code></pre>
and for [**Bitbucket**](https://bitbucket.org/) users, the repo URL should look like
<pre><code>https://user@bitbucket.org/username/repository-name.git</code></pre>

Once you have filled in the repository field, hit the green "continue" button and you will be
directed to the [select configuration](#select-configuration) section.

<h3 id="username-and-password-authentication">Username and password authentication</h3>

In case you have a **password protected repository**, or in other words you are using
*basic auth* to protect your repo, you should select **Username and password**
for the authentication type. Having done so, two more inputs are displayed so that you can fill
in your credentials.

As with public repos, we expect you to enter your repository URL in the `httpS://` format, otherwise
you will see a warning that asks you to do so. Once again,
if your repository is in [**GitHub**](https://github.com), the repo URL should be in the form
<pre><code>https://github.com/username/repository-name.git</code></pre>
and for [**Bitbucket**](https://bitbucket.org/) users, the repo URL should look like
<pre><code>https://user@bitbucket.org/username/repository-name.git</code></pre>
All others just make sure your URL starts with a `httpS://` prefix.

After you have filled in the repository and credentials fields, you can hit the
green "continue" button and to be directed to the
[select configuration](#select-configuration) section.

![Password protected Git repository]({{ site.url }}/assets/add-app-credentials-cordova.png "Password protected Git repository")

<h3 id="ssh-key-authentication">SSH key authentication</h3>

Is your repository protected by an SSH key? No worries, just select **SSH Key** from the
authentication dropdown. You will be shown an input where you can *drag-and-drop* your
`SSH private key` or on which you can click to pick the key in a more conventional way.
As soon as you select/drop the key, we will peek into it and check if it's
password protected. If we discover that this is indeed the case, we will ask you to
enter the passphrase into the input field that appears under the SSH key field.

Please note that in case of `SSH key` authentication, you should provide a repository URL
that starts with `ssh://`, so the given URL should be something of the form
<pre><code>ssh://username@example.com/path/to/repo</code></pre>
However, the exact pattern will vary from one hosting service to another.

For example, [**GitHub**](https://github.com) users have to use a URL that has the following
pattern:
<pre><code>git@github.com:username/repo-name.git</code></pre> while
[**Bitbucket**](https://bitbucket.org/) users' repo URL should look like
<pre><code>git@bitbucket.org:username/repo-name.git</code></pre>

After you have filled in the repository field and have selected your SSH private key, you can
hit the green "continue" button and you will be redirected to the
[select configuration](#select-configuration) section.

![SSH key protected Git repository]({{ site.url }}/assets/add-app-ssh-key-cordova.png "SSH key protected Git repository")

<h2 id="select-configuration">Select configuration</h2>

As soon as you submit a repository, either public or private, Greenhouse takes a first look
at it and lists the `branches` it finds.
The next step for you is to **select the branch** you want Greenhouse to scan for projects.
Use the dropdown menu to do so.
Once you've chosen the branch, you can hit the green "select branch" button to proceed
(note that you can change the branch later).

Clicking on the "select branch" button makes Greenhouse scan the selected branch.
This includes cloning the repository, looking for projects in it and searching for the
configurations.

All these actions can be monitored from your browser via the live log window
as seen below.

When Greenhouse completes the scan, you will be presented with several new
options.

Immediately under the branch selector, you will see a dropdown menu with the project(s) Greenhouse
found in the selected branch. Each project's name is followed, in brackets, by a list of
platforms for which Greenhouse will attempt to build your application. This is
determined based on the `platforms.json` file found within your project's
`/platforms` subfolder. Since some developers choose not to include this
subfolder in version control, Greenhouse will default to building both Android
and iOS versions of the app if it can't find `platforms.json`. Importantly, this
means that by default you will need to upload your iOS signing files (see below) before the
project can be built. If you are not interested in building for the iOS
platform, please ensure that your repository contains the `platforms` subfolder
with the following `platforms.json` file:

{% highlight json %}
{
    "android": <version>
}
{% endhighlight %}

When building for the iOS platform, the next step is to provide the corresponding code signing files.

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


![Scanning projects]({{ site.url }}/assets/add-app-scan-repo-cordova.png "Scanning projects")

<h3 id="first-build">Running your first build</h3>

That's it!

![Configure project]({{ site.url }}/assets/add-app-select-configuration-cordova.png "Configure project")

Now there's only one more step left to build your Cordova app with Greenhouse and that's clicking
the "save" button!

This action will show you the projects dashboard where you can see the app you just added already
being built.

![New app]({{ site.url }}/assets/add-app-building-cordova.png "New app")

After running `git clone`, Greenhouse will automatically extract the name and icon of your app from the
repo and update your project's card accordingly. To see the progress of your build, just click the
"View build" you'll be shown the build overview, from which you can navigate to see
the real-time logs of your build.

![Build log]({{ site.url }}/assets/add-app-build-log-cordova.png "Build log")

<h2 id="configure-git-hook">Configure Git hook</h2>

We suspect that you don't want to bother opening the web browser and clicking the "Build"
button in Greenhouse to see if the build still succeeds after every tiny change in your app's
codebase. That's why Greenhouse supports
[**Git hooks**](http://git-scm.com/book/en/Customizing-Git-Git-Hooks) that provide an easy way
to trigger some actions after you push your changes to the repository.
Using a hook you can trigger a build for every `git push` you make.

Greenhouse automatically detects the hook information from your repository URL
and provides the necessary instructions for setting it up. Git hook information
is available in the **Hooks** subsection of the project settings view
(navigate to the dashboard, click on the name of your project and then on the little spanner icon).

<h3>Github hooks</h3>
![Github hook]({{ site.url }}/assets/github-git-hook.png "Github hook")
To setup a hook in Github, navigate to the **Hooks** subsection. Click on the
**Github hooks page** link that automatically redirects you to your repository settings page in Github.

Now click on **Add webhook** and copy and paste the Payload URL from the text box in Greenhouse to Github.
Note that you must be logged into Github, otherwise Github will tell you that the link is invalid.

<h3>Bitbucket hooks</h3>
To setup a hook for Bitbucket, navigate to the **Hooks subsection**. Click on the
**Bitbucket hooks page** link that automatically redirects you to your
repository settings page in Bitbucket.
![Bitbucket hook]({{ site.url }}/assets/bitbucket-git-hook.png "Bitbucket hook")

Now click on **Add hook**, choose **POST** from the menu and copy and paste the
URL from the text box in Greenhouse to Bitbucket.

Note that you must be logged into Bitbucket, otherwise Bitbucket will tell you
that the link is invalid.

<h3>Generic hooks</h3>
If you are not hosting your repository on Github or Bitbucket, then setting up
the hook can be a bit more involved.

![Generic hook]({{ site.url }}/assets/generic-git-hook.png "Generic hook")
When you navigate to the Greenhouse hooks page, a **Download hook** button will
be shown. Clicking this button will trigger a download of a `post-receive`
script file. This file *must be* added to your **main Git repository** to which
you push your changes, **not your locally checked out version**. Place the file
in the `.git/hooks` folder located at the root of your main Git repository and
make the script executable by running <pre><code>chmod +x post-receive</code></pre>.

<h2 id="setup-tests">Testing</h2>
Greenhouse does not currently support testing for Cordova projects, but we are
actively investigating different testing options. If your team makes use of
Cordova testing please [let us know](https://greenhouseci.com/contact-us.html).

<h2 id="publishing">Publishing</h2>
Greenhouse supports publishing the build artefacts of your Cordova apps to
[HockeyApp](#), [Crashlytics](#) and [TestFairy](#). Additionally, the artefacts
are always published to Greenhouse and can also be sent to one or multiple
recepients via email. You can also set up [Slack](#) or [HipChat](#)
integrations to receive build notifications. While all the setup steps are very
straight-forward and self-explanatory, we also have dedicated tutorials that you
can peruse by following the links above.

<h2 id="build-versioning">Build versioning</h2>

To make your build version management easy, Greenhouse exports two environment variables
that you can use in your build scripts: `GREENHOUSE_BUILD` and `GREENHOUSE_BUILD_NUMBER`.

`GREENHOUSE_BUILD` is set to `true` in Greenhouse for every build and it
indicates that your build is currently running in a CI environment.
`GREENHOUSE_BUILD_NUMBER` environment variable holds the total count of builds
(including the ongoing build) for this project in Greenhouse. In other words,
if you have triggered 10 builds for some project in Greenhouse, the next time
you build it `GREENHOUSE_BUILD_NUMBER` will be exported as `11`.

You can use `GREENHOUSE_BUILD_NUMBER` to automatically increment your apps' version
numbers using [Cordova hooks](https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html).
This [Github gist](https://gist.github.com/ohh2ahh/f35ff6e0d9f8b4268cdb) has an
example of such a hook that you can cutomize to fit your needs.
