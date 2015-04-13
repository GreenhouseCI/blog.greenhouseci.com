---
layout: post
title:  "App Extension Support"
date:   2015-01-12 16:00:00
author: lauris
categories: Greenhouse update
tags: [ios]
share: true
comments: true
---

Happy New Year! The holidays have been a busy time trying to bring you more features. Finally, we have added support for iOS app extensions.
App extensions are a way for users to take advantage of your app's features while outside of the application.

<!--more-->


What is an App Extension?
-------------------------

Starting from iOS 8.0, apps are able to extend their functionality to other applications on the device.
This enables users to take advantage of your features while using another app. You can think of an extension
as a way to do a specific task.

There are several types of extension, each of which can perform a certain task for the user.
The types of extensions are:

1. Today - Perform a quick task in the Today view of Notification Center
2. Share - Share content with others
3. Action - Modify or view content
4. Photo Editing - Use Photos app to edit an image
5. Document Provider - Provide access to files
6. Custom Keyboard - Replace the system keyboard
7. Finder Sync (OS X only) - Show file sync state in Finder

Developers are able to select the type of extension that best matches their needed functionality and build their
own solution on top of that.

Adding an App Extension
-------------------------

Creating an extension is really easy. All you need to do is add a new target to your project:


![Add Extension Target]({{ site.url }}/assets/app-extension-target.png)


---


Fill out the required information. As you can see, extension's bundle identifier extends the host application's identifier.
This is why additional profiles are required to distribute the app.

![Add Extension Name]({{ site.url }}/assets/app-extension-name.png)


---


Now all that's left to do is write your extension implementation. Xcode will generate an extension template for you.
Each extension type has its specific template that you can use as a base for your awesome features.

The following template was generated for our sample application's share extension:


![Add Extension Implementation]({{ site.url }}/assets/app-extension-impl.png)



Building an App Extension
-------------------------

App extensions are basically additional targets that get built with the application and are packaged into the application binary.
They have their own Bundle Identifier different from the host app. This means that more than one provisioning profile is
needed to build the app for distribution.

To enable users to build projects with app extensions, we've added a way to add more than one provisioning profile
to your build configuration in Greenhouse. When you add or rescan a project, we will check if app extensions are used.
If needed, multiple provisioning profiles can be uploaded. All uploaded profiles will be made available during the
build so that the system can use them as necessary.

![App Extension Scan]({{ site.url }}/assets/app-extension-scan.png)

Building applications with app extensions in Greenhouse is as easy as uploading an additional provisioing profile
and starting a new build.

Add an Extension Today
----------------------

Nowadays, applications are all about sharing content with others, creating easier ways to get things done and
making our days as easy as possible. Why not add a new share feature, quick access to documents or even a new keyboard to your application?
It's as easy as uploading a file to Greenhouse and you're all set.

See the [official documentation](https://developer.apple.com/app-extensions/) to learn more.
