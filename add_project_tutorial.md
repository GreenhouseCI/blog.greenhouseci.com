---
layout: page
permalink: /tutorials/add_project/
title: "Greenhouse Tutorial"
tags: [tutorial]
image:
  feature: greenhouse_bg_cropped_blog_feature_1024x256.jpg
share: true
---

How to add iOS projects to Greenhouse
===============================================

Regular iOS projects should work out of the box with Greenhouse. However, there might be some extra hassle when it comes to Cocoapods projects. The following tutorial will demonstrate who to fix and avoid the most common problems with Cocoapods.


Cocoapods
==========
Most iOS developers nowadays are using Cocoapods for dependency management. While it is an excellent tool, it is a bit tricky to set up correctly, at least for a CI environment.

Two things that are most likely to go wrong with Pods are:

1. Selecting a non-workspace project 
2. Not marking your schemes as shared


Selecting the correct project 
-----------------------------
If your project is using **Cocoapods**, you must select the project the name of which ends with **[workspace]**.

![Project selection]({{ site.url }}/images/project-selection-cropped.png)

Similarly, the respective configuration's name must end with **[scheme]**.


Sharing your schemes
--------------------
Schemes that are not marked shared in Xcode cannot be built outside Xcode, thus excluding any CI server as well.

Let's walk through the process of sharing a scheme

Navigate to **Product-> Scheme -> Manage Schemes**

![Schemes Menu]({{ site.url }}/images/schemes-menu-cropped.png)

You will then be displayed a list of schemes, each denoted as being **shared** or not.

![Schemes Dialog]({{ site.url }}/images/schemes-dialog-cropped.png)

Make sure that the **shared** checkbox is marked in front of your scheme, then click **OK**.

Finally, once you have marked the scheme as shared, you will have to add the files that Xcode has generated to your git repository as well.

{% highlight ruby %}
    git commit -am "fixing shared scheme"
{% endhighlight %}

Keep in mind that if you have an existing project at Greenhouse, then you will have to rescan your project after pushing the changes to your git repository. Otherwise the new configurations will not show up. You rescan your project for new configurations under your projects settings view:

![Recanning project]({{ site.url }}/assets/rescan-ios.png)

That's it!
