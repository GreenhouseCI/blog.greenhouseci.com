---
layout: post
title:  "Building a Hardware CI Dashboard"
date:   2015-10-04 23:21:14
categories: Greenhouse update
tags: [hardware]
author: tauno
share: true
comments: true
---

And now for something completely different and less serious...  

A couple of days ago I found my old trusty [Launchpad](http://global.novationmusic.com/launch/launchpad) tucked away from sight.
<!--more-->
<figure>
  <a data-lightbox="itunes" href="/assets/launchpad-intro.jpg">
    <img class="post-img" src="/assets/launchpad-intro.jpg"/>
  </a>
  <figcaption>(Launchpad v1, not to be confused with latest version with RGB LEDs and other cool improvements).</figcaption>
</figure>

The launchpad is a MIDI controller with a 8x8 grid of large illuminated buttons that can be used to trigger.. well, whatever it is that you want to trigger. Sadly I never really got into using it for making music (other than a try at covering [Madeon - Pop Culture](https://www.youtube.com/watch?v=lTx3G6h2xyA). But I digress). However I've always had the itch to use it for something. And making a hardware dashboard for [Greenhouse](http://greenhouseci.com) seemed like the perfect use for this. Let me explain why:

* Small physical form-factor, easy to install on a wall in the office
* Always on - everybody has a 24/7 overview of all the project statuses. No more hiding your build failures from your boss :)
* Easy to use - well, there are only a couple of buttons - what could possibly go wrong?

**Features:**

* Color coded projects that match the latest build status (green - ok, yellow - tests failed, red - build failed)
* Blinking light for a project that's currently building
* Trigger a new build by long-pressing the relevant pad.
* Shows the project name when pressing on the relevant pad.
* You have more than 64 projects? Use the up/down arrows to scroll the dashboard

Here's how it looks like in action. Scroll down to read how it was set up.

<iframe width="560" height="315" src="https://www.youtube.com/embed/7IMa_EKNzI4" frameborder="0" allowfullscreen></iframe>

## Building blocks
I set out to build a quick rough prototype. Due to my Android dev background my go-to language is Java. The following libraries came in quite handy:

* [**LP4J** - A Launchpad API for Java](https://github.com/OlivierCroisier/LP4J)
* [**OkHttp** - An HTTP & SPDY client for Android and Java applications](http://square.github.io/okhttp/)
* [**Retrofit** - A type-safe HTTP client for Android and Java](http://square.github.io/retrofit/)

## API Endpoints
The dashboard needs to perform only two actions:

1. Display projects and their statuses
2. Trigger a new build for a project

Greenhouse doesn't have a proper full-fledged REST API yet ([wanna help us build it?](http://greenhouseci.com/careers.html)) so we're going to use what we have.

1. There's an endpoint for querying your projects & statuses for [CCMenu](http://blog.greenhouseci.com/greenhouse/update/ccmenu-support/).
2. Git hook url for triggering builds - you can find it under the "Hooks" tab in your project settings.
The URL is in the following format: `https://app.greenhouseci.com/api/projects/[project_id]/build?token=[token]`. The **token** (which is a private access token that can only be used to start a new build) and the **project_id** that we get from the CCMenu endpoint can be used to construct a build trigger URL for every project.

## Communicating with the Launchpad
Getting something to display on the Launchpad is quite easy thanks to the excellent work of *Olivier Croisier* and **LP4J**
{% highlight java %}
Launchpad midiLaunchpad = new MidiLaunchpad(MidiDeviceConfiguration.autodetect());
LaunchpadClient launchpad = midiLaunchpad.getClient();
launchpad.setButtonLight(Button.STOP, Color.RED, BackBufferOperation.NONE);
{% endhighlight %}

Getting events from the Launchpad is also straight forward
{% highlight java %}
midiLaunchpad.setListener(new LaunchpadListenerAdapter() {
  @Override
  public void onPadPressed(Pad pad, long timestamp) {
    System.out.println("Pad pressed : " + pad);
  }
});
{% endhighlight %}

## Putting it all together
We know where to get the project info, we know how to display it, we know how to get an event when a pad on the Launchpad is pressed and we know how to trigger the build. Sounds easy enough - the rest is just (lots of) boilerplate (well it's Java) and logic around showing stuff on the 8x8 grid. [Grab the source here](https://github.com/tauntz/greenhouse-launchpad).
<!--more-->
