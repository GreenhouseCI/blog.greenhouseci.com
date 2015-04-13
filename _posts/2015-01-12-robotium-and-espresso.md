---
layout: post
title:  "Making UI testing on Android easy"
date:   2015-01-05 16:00:00
author: uku
categories: Greenhouse update
tags: [testing, android, robotium, espresso]
share: true
comments: true
---

UI testing is much like flossing, we all know that it is good for us, but for some reason or another, we still tend to not do it.
<!--more-->

We at Greenhouse have compiled a list of common reasons not to test:

1. **My tests take way too long to complete**. What is more, running them breaks my workflow, as I have to wait for the tests to finish running before I can continue my development work.
2. **Tests are unreliable**. Someone at the Megacorp made us create a big UI test suite, but nobody checks the status of these tests anymore, because they fail randomly due to timing issues.
3. **Testing is expensive**. My manager does not care about testing, because it takes all the time away from developing features.
4. **Automated UI testing does not find bugs**. My buddy QA Steve has found way more bugs than any automated system. Let the QA do their work and the developers theirs!
5. Our product moves too fast, **every new change breaks the tests**, so why waste time tilting at windmills.

I'm sure you have heard all of these before, perhaps from your manager, your teammates or you yourself have made one or several of these claims.
However, the whole idea of continuous integration relies on testing the application for every code change. Sure, it may build, but how can you be sure that it does not crash as soon as you open up the app? 

Let's look at claim from above and try to counter them.

1. This is the number one reason why you should be using a CI solution like Greenhouse. Outsource the running of tests to a safe environment, so that you can keep working on your code and be notified only if something goes South. Outsourcing it to the continuous integration server is not a silver bullet though. If the test suite takes 3 hours to run, you will get the results 3 hours later regardless. This is why your tests should be fast as well.
2. It is easy to see why UI tests might not be as reliable as unit tests. Navigating between different activities can cause subtle timing issues. The typical solution to timing issues is using a sufficiently long timeout or employing a number of retries to some operation. In addition to being annoying to write, timeouts and retries make your tests painfully slow.
3. This point is difficult to argue against. If you are dealing with a short term project UI testing might be, infeasible. However, for a long term project spanning multiple years, UI testing can actually become cost-efficient.
4. Kudos to QA Steve for his wonderful work. But the truth of the matter is that you shouldn't expect UI tests to find new bugs. UI tests should be used for regression - to make sure that your new changes do not break previously working functionality.
5. This point can be alleviated by employing test driven development. Start out by what you want to see happening in the UI. Iterate on your code until the functionality matches the tests.


The two most popular UI frameworks for Android today are Espresso and Robotium. Both of the frameworks are built on top of Android Instrumentation. From the previous discussion we concluded that UI tests should be 
1) **easy to write** 2) **fast** 3) **reliable**. 
We will review the two frameworks according to these criteria.


Robotium ![Robotium]({{ site.url }}/assets/logo-robotium.png){: .heading-icon }
--------

Robotium really improves on the simplicity of writing tests in comparison to native Android Instrumentation. 
Android Instrumentation forces you to write a lot of boilerplate for retrieving UI elements from the views. Robotium, on the other hand, provides you with the Solo object that provides more human-friendly interface. 

To best illustrate the difference between the two, imagine a simple login screen with two input fields (username and password) and a submit button.

To test the login form in Android Instrumention, we would have to write something like this:

{% highlight java %}
EditText username = (EditText) mActivity.findViewById(R.id.username);
EditText password = (EditText) mActivity.findViewById(R.id.password);
Button loginButton = (Button) mActivity.findViewById(R.id.submit_button);
username.requstFocus();
username.setText("MyUsername");
password.requstFocus();
password.setText("MyPassword");
loginButton.performClick();
{% endhighlight %}

This, as you can imagine, is quite cumbersome. A more intuitive way would be writing the tests from a user's perspective. 

{% highlight java %}
robo.enterText(0, "user-name");
robo.enterText(1, "password");
robo.clickButton(0);
{% endhighlight %}

Which translates into 

1. "Enter MyUsername into the first field"
2. "Enter MyPassword into the second field"
3. "Press the first button"

Robotium provides timeout based mechanisms to cope with timing issues that are inherent to UI testing. The downside of using timeouts is that they are not reliable and slow the testing down considerably.


Espresso ![Espresso]({{ site.url }}/assets/logo-espresso.jpeg){: .heading-icon }
--------

Previously, we mentioned that writing and debugging tests can be cumbersome due to synchronization issues. Add a little sleep or retry here, and another timeout there, it all starts to add up. Soon your test suite will take too long to run. Furthermore, the tests start failing randomly, leaving you wondering whether your app is broken or if there is some annoying timing issue at play.

Espresso improves on this situation immensely. For both regular Android Instrumentation tests and Robotium, the tests run in a separate thread from the UI without any synchronization. Espresso automatically synchronizes the UI with the tests actions and assertions, so you do not have to worry about timing issues anymore. As a result, the tests are both more reliable and fast.

In addition, Espresso makes use of the Hamcrest selectors.
Hamcrest string matchers make finding views a lot easier and flexible in comparison to both Robotium's Solo and the Android Instrumentation.

{% highlight java %}
onView(withId(R.id.submit_button)).perform(click()).check(matches(isDisplayed()));
{% endhighlight %}

This following snippet follows where we left off with the login screen example. The snippet, which reads like it is written in some cool functional language, performs a click on the submit button and checks if it is displayed after that. The ability to filter and combine different matchers make Espresso very powerful and useful.


New features
------------

We are glad to announce that Greenhouse now supports both Robotium and Espresso UI automation tests.
Also, since we switched to using Genymotion emulators instead of Android emulators, the testing process in Greenhouse has become a lot faster and more reliable.


Since we were using stock Android emulators before, the improvements in build durations for Android projects are significant.
Genymotion startup is alot faster when compared to stock emulators.
We created a little comparison chart between the two and Android builds with tests are now almost 2x faster.
You can see the results in the following chart:

<a data-lightbox="genymotion-vs-android" href="{{ site_url }}/assets/genymotion-vs-android-chart.png">
    <img class="post-img" src="{{ site.url }}/assets/genymotion-vs-android-chart.png" title="Genymotion vs Android"/>
</a>

Coming up
---------

In the coming weeks, Greenhouse will be adding support for **over-the-air (OTA) distribution** via e-mail. This means that you can install your Android or iOS application **straight from your device**, no third-party integrations required. 

Additionally, we will be looking into adding more test frameworks to Android and iOS, in particular, we will soon be implementing **support for Appium**.
