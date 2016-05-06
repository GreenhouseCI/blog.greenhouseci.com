---
layout: post
title:  "Using Kotlin to test Android applications"
date:   2016-05-05 12:00:00
categories: Greenhouse update
tags: [android, testing, kotlin, java]
author: priit
share: true
published: true
comments: true
---

Testing is an integral part of any kind of software development.
To ensure that code is ready to be deployed to production it is rarely
enough to just manually verify that new features are working.
When talking about code quality and reliability, importance of automated
testing cannot be overstated, be it regression tests, unit tests or UI tests.

In this blog post we discuss yet another possibility of how to write automated
tests for your Android applications. Namely we observe how [**Kotlin**](https://kotlinlang.org/),
one of the latest stable and noteworthy addition to the vast world of JVM based
languages, can be utilized to for test automation of Android applications.

<!--more-->

## Few words about Kotlin

Kotlin is an [open source language](https://github.com/JetBrains/kotlin)
developed and maintained by JetBrains, the company behind IntelliJ IDEA and
possibly your favorite IDE for Android development, Android Studio.

After being in development for more that 5 years (first commit dating back to 2010-11-08),
the first stable version of the language [was released](http://blog.jetbrains.com/kotlin/2016/02/kotlin-1-0-released-pragmatic-language-for-jvm-and-android/)
earlier this year in February.

Among it's key characteristics we can list out

- Support for both OO and functional style.
- Interoperability with Java code meaning you can easily mix Kotlin into your existing Java codebase or *vice versa*.
- Superb tooling with plugins available for IntelliJ based IDEs, Eclipse, and text editors like Atom, Emacs, Sublime Text and Vim.
- Strong emphasis on clarity and type safety.

## Android application testing in general

Since the early days of Android ecosystem its tooling, library and framework support
for testing has significantly improved. From plain instrumentation tests and regular
JUnit tests we have come to all the way to convenient tools like
[AssertJ](http://square.github.io/assertj-android/)
[Espresso](https://google.github.io/android-testing-support-library/docs/espresso/index.html),
[Robolectric](http://robolectric.org/),
[Robotium](https://github.com/RobotiumTech/robotium),
[UI Automator](https://google.github.io/android-testing-support-library/docs/uiautomator/index.html).
All of which make our jobs easier and consequently our lives happier.

But it is rarely the case that your tests consist only of assertion statements. It is not rare to have
tons of utility and glue code just to prepare the test case, especsially when you are
testing our more complicated user flows. And to make the matters worse, in some cases the complexity of
tests could easily exceed that of the main application. Those are exactly the cases where the verbosity
of Java could get in the way.

<!-- ## Common pitfalls/It's not all roses -->

<!-- ## What good are tests if they are not executed? -->