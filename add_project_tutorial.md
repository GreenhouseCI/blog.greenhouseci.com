---
layout: page
permalink: /tutorials/add_project/
title: "Tutorial: How to add iOS projects to Greenhouse"
tags: [tutorial]
image:
  feature: greenhouse_bg_cropped_blog_feature_1024x256.jpg
share: true
---


Cocoapods
==========
Most iOS developers nowadays are using Cocoapods for dependency management. While it is an excellent tool, it is a bit tricky to set up correctly.

Two things that are most likely to go wrong with Pods are:

1. Selecting a non-workspace project 
2. Not marking your schemes as shared


Selecting the correct project 
-----------------------------
If your project is using **Cocoapods** you must select the project that is suffixed by **[workspace]**


Sharing your schemes
--------------------
Schemes that are not marked shared in Xcode cannot be built outside Xcode, thus excluding any CI server as well.

Let's walk through the process of sharing a scheme

![Schemes Dialog]({{ site.url }}/images/schemes-menu-cropped.png)
Navigate to **Product-> Scheme -> Manage schemes**
![Schemes Dialog]({{ site.url }}/images/schemes-dialog-cropped.png)

Make sure that the **shared** checkbox is marked in front of your scheme.

Finally, once you have marked the scheme shared, you will have to add the files that Xcode has generated to your git repository as well.

{% highlight ruby %}
    git commit -am "fixing shared scheme"
{% endhighlight %}

That's it!
