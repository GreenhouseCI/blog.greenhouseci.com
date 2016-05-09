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

Among its key characteristics we can list out

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

But it is rarely the case that your tests consist only of assertion statements. It is not
rare to have tons of utility and glue code just to prepare the test case, especially when you
are testing our more complicated user flows. And to make the matters worse, in some cases the
complexity of tests could easily exceed that of the main application. Those are exactly the
cases where the verbosity of Java could get in the way. Every now and then it is just bloody
convenient to open a file and loop over it's contents with one or two lines instead of
couple of dozen LOCs that are required to do so in Java.

In those situations language like Kotlin really help you to step up your game. The
expressiveness and clean syntax, combined with nifty language idioms make it a huge
improvement over the clumsiness that Java comes with. But enough of the small talk,
let us see how it all works out in practise with a hand on example.

## Plug Kotlin into your Android project

> For easier reference you can already grab complete source code of the example
> application from [this GitHub repository](https://github.com/priitlatt/kotlin-tests).
> All code snippets to come will be extracted from there.

To start using Kotlin in your existing Android project you just have to add a few lines to your
project's Gradle build file, declaring which version of Kotlin you'd like to use and
which dependencies need to be additionally compiled. As far my experience goes, [the official documentation](https://kotlinlang.org/docs/reference/using-gradle.html), which seem to be great, will point you to the right direction. In any case, my `build.gradle` build script ened up being like

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'

buildscript {
    ext.kotlin_version = '1.0.+'
    repositories {
        jcenter()
        mavenCentral()
    }
    dependencies {
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

android {
    ...
}

dependencies {
    compile "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    testCompile "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    testCompile "org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version"
    ...
}
```

Let us tear down the extra lines now. On the second line, right after Android plugin is applied,
we inject Kotlin Gradle plugin that targets Android build model by
`apply plugin: 'kotlin-android'`.
To make that plugin available we need to declare it as a `buildscript` level dependency with

```groovy
dependencies {
    classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
}
```
where preceeding `ext.kotlin_version = '1.0.+'` just selects the newest version of Kotlin from
1.0 series.

Finally, under `dependencies` section we need to state that Kotlin _stdlib_ has to be compiled.
And as we are going to use Kotlin especially for testing purposes, it needs to be compiled to
tests as well.

As unit and UI tests are usually stored in `src/test/java` and `src/androidTest/java` respectively, we might want to maintain sanity in our codebase and keep Kotlin tests in dedicated directories like `src/test/kotlin` and `src/androidTest/kotlin`. As these are not default test directories, we need to notify Gradle about it. This can be done within the `sourceSets` section as

```groovy
android {
    ...
    sourceSets {
        test.java.srcDirs += 'src/test/kotlin'
        androidTest.java.srcDirs += 'src/androidTest/kotlin'
    }
}
```

<!-- ## Common pitfalls/It's not all roses -->

<!-- ## What good are tests if they are not executed? -->