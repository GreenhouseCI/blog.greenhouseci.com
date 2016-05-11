---
layout: post
title:  "Using Kotlin to test Android applications"
date:   2016-05-11 00:00:00
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
tests for your Android applications. Namely, we observe how [**Kotlin**](https://kotlinlang.org/),
one of the latest stable and noteworthy additions to the vast world of JVM based
languages, can be utilized for test automation of Android applications.

<!--more-->

## Few words about Kotlin

Kotlin is an [open source language](https://github.com/JetBrains/kotlin)
developed and maintained by JetBrains, the company behind IntelliJ IDEA and
possibly your favorite IDE for Android development, Android Studio.

After being in development for more than 5 years (first commit dating back to 2010-11-08),
the first stable version of the language [was released](http://blog.jetbrains.com/kotlin/2016/02/kotlin-1-0-released-pragmatic-language-for-jvm-and-android/)
earlier this year in February.

Among its key characteristics we can list out

- Support for both OO and functional style.
- Interoperability with Java code, meaning you can easily mix Kotlin into your existing Java codebase or *vice versa*.
- Superb tooling with plugins available for IntelliJ based IDEs, Eclipse, and text editors like Atom, Emacs, Sublime Text and Vim.
- Strong emphasis on clarity and type safety.

## Android application testing in general

Since the early days of Android ecosystem its tooling, library and framework support
for testing has significantly improved. From plain instrumentation tests and regular
JUnit tests we have come to all the way to convenient tools like
[AssertJ](http://square.github.io/assertj-android/),
[Espresso](https://google.github.io/android-testing-support-library/docs/espresso/index.html),
[Robolectric](http://robolectric.org/),
[Robotium](https://github.com/RobotiumTech/robotium),
[UI Automator](https://google.github.io/android-testing-support-library/docs/uiautomator/index.html)
and the list goes on. All of which make our jobs easier and consequently our lives happier.

But it is rarely the case that your tests consist only of assertion statements. It is common
to have tons of utility and glue code just to prepare the test case, especially when you
are testing our more complicated user flows. And to make the matters worse, in some cases the
complexity of tests could easily exceed that of the main application. Those are exactly the
cases where the verbosity of Java could get in the way. Every now and then it is just bloody
convenient to open a file and loop over it's contents with one or two lines instead of
couple of dozen LOCs that are required to do so in Java.

In those situations a language like Kotlin can really help you to step up your game. The
expressiveness and clean syntax, combined with nifty language idioms make it a huge
improvement over the clumsiness that Java comes with. But enough of the small talk,
let us see how it all works out in practice with a hands on example.

## Plug Kotlin into your Android project

> *For easier reference you can already grab complete source code of the example
application from [this GitHub repository](https://github.com/GreenhouseCI/kotlin-tests).
All code snippets to come will be extracted from there.*

To start using Kotlin in your existing Android project you just have to add a few lines to your
project's Gradle build file, declaring which version of Kotlin you'd like to use and
which dependencies need to be additionally compiled. As far my experience goes,
[the official documentation](https://kotlinlang.org/docs/reference/using-gradle.html),
which seem to be great, will point you in the right direction. In any case, my `build.gradle`
build script ended up being like this:

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

Let us tear down the extra lines. On the second line, right after Android plugin is applied,
we inject Kotlin Gradle plugin that targets Android build model by
`apply plugin: 'kotlin-android'`.
To make that plugin available we need to declare it as a `buildscript` level dependency with

```groovy
dependencies {
    classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
}
```
where the preceding `ext.kotlin_version = '1.0.+'` just selects the newest version of Kotlin from
1.0 series.

Finally, under `dependencies` section we need to state that Kotlin _stdlib_ has to be compiled.
And as we are going to use Kotlin especially for testing purposes, it needs to be compiled for
tests as well.

__One note about tests and their location in the source tree.__

As unit and UI tests are usually stored in `src/test/java` and `src/androidTest/java`
respectively, we might want to maintain sanity in our codebase and keep Kotlin tests
in dedicated directories like `src/test/kotlin` and `src/androidTest/kotlin`. As these
are directories are not detected as Android test locations by default (*yet?*), we
need to make Gradle and Android Studio aware of them. This can be done in the `sourceSets`
section with

```groovy
android {
    ...
    sourceSets {
        test.java.srcDirs += 'src/test/kotlin'
        androidTest.java.srcDirs += 'src/androidTest/kotlin'
    }
}
```

## Our example app

The above mentioned [example application](https://github.com/GreenhouseCI/kotlin-tests) created for
the purposes of this blog post is of course yet another stunning shopping list app. As expected,
it is possible to add some items to the list and remove them from there as you wish. To add
some spice into the mix and make things a little bit more __testable__, every item that is
inserted to the list passes through a formatter that removes all excess whitespaces from the
input string. Critical business logic in the form of our formatter that we use to clear up
the strings lives in
[`Formatter.java`](https://github.com/GreenhouseCI/kotlin-tests/blob/master/app/src/main/java/com/greenhouseci/kotlin_tests/kotlintests/Formatter.java)
and looks like

```java
public class Formatter {

    public String stripMiddle(String s) {
        return s.replaceAll("\\s+", " ");
    }

    public String stripLeft(String s) {
        return s.replaceAll("^\\s+", "");
    }

    public String stripRight(String s) {
        return s.replaceAll("\\s+$", "");
    }

    public String strip(String s) {
        return stripLeft(stripRight(stripMiddle(s)));
    }
}
```

Bridge connecting user interactions with formatter resides conveniently in
[`MainActivityFragment`](https://github.com/GreenhouseCI/kotlin-tests/blob/master/app/src/main/java/com/greenhouseci/kotlin_tests/kotlintests/MainActivityFragment.java#L38).

All in all, our app stands in it's full glory as depicted below:
<div style="text-align:center; padding: 20px 0;"><img src="/assets/kotlin-app-screenshot.png" alt="Screenshot"/></div>

Evidently we want to test out that whenever item description `EditText` is filled with anything
meaningful and "Add item" button is pressed, the newly added item is populated to the list.
Furthermore, it is of utmost importance to ensure that all the items that are added to the list
do not contain any superfluous whitespaces. For that we need tests of course.

## Unit tests

Let us start off with unit tests for our `Formatter` class shown above. As already mentioned,
we'll store our unit tests under `src/test/kotlin`. Right there we have a test class
`FormatterTestKotlin` defined in
[`FormatterTestKotlin.kt`](https://github.com/GreenhouseCI/kotlin-tests/blob/master/app/src/test/kotlin/com/greenhouseci/kotlin_tests/kotlintests/FormatterTestKotlin.kt):

```ruby
package com.greenhouseci.kotlin_tests.kotlintests

import org.junit.Assert.assertEquals
import org.junit.Test


class FormatterTestKotlin {

    private val formatter: Formatter = Formatter()

    infix fun Any.equals(expected: Any) {
        assertEquals(expected, this)
    }

    ...

    @Test
    @Throws(Exception::class)
    fun testStrip() {
        val reference = "my string"
        val testStrings = arrayOf(
            reference,
            " $reference ",
            " $reference  ",
            " \t $reference \t ",
            " \n  $reference \n ",
            "\tmy \n string\t"
        )
        testStrings.map { formatter.strip(it) equals reference }
    }
```

A glimpse at the snippet above shows that while it is a Kotlin code, there are some
familiar elements from regular Java already, like package name and import statements.
Further decomposing it reveals lack of semicolons in the end of the lines and differences
in variable and function declarations. But also some obvious similarities like code block
separation by usage of curly brackets and support for annotations.

__Variable and function declaration__

In our sample code we can see that declaring a value can be be as simple as

```groovy
val reference = "my string"
```

where the type of the object that is assigned is implicitly guessed by compiler.
Or we can explicitly declare the type of the object by writing

```groovy
val formatter: Formatter = Formatter()
```

where the type information follows variable name with colon and precedes the value
to be assigned.

Kotlin also provides an easy way to distinguish read-only and mutable fields.
It does so by exposing two types of keywords: `val` for declaring read-only fields
and `var` for variables that ought to be mutable. In the realm of Java, `val` corresponds
to the `final` modifier.

> *It is also worth noting how we can assign Java object to a Kotlin variable without
any further ado.*

Functions are defined using `fun` keyword followed by the function name and parameters
in parentheses. Return type and argument types are specified using the colon notation
just as it is with variable declaration. But as Kotlin has first class support for
user defined **infix** functions, as seen above, we can enrich the standard library
with syntactic sugar of our choosing with no effort whatsoever. For example here we
have replaced

```java
assertEquals(expected, actual)
```

checks with

```java
actual equals expected
```

statements for readability, utilizing our custom infix procedure `equals`.

```java
infix fun Any.equals(expected: Any) {
    assertEquals(expected, this)
}
```

Of course, all other gems of Kotlin are readily available to us, including
convenient array declaration, avoidance of clumsy `for` loops using `map` and
other functional elements.

Last but not least, we annotate out test functions with `@Test` as usual to make
compiler aware of them.

```java
@Test
fun myTestCase() { ... }
```

## Espresso tests

Making use of the interoperability of Java and Kotlin code we can blend Espresso into
our Kotlin test classes with just a blink of an eye. That's how we can benefit both from
battle tested Espresso framework that makes testing UI components a bliss and
all the gems that Kotlin provides as a language to make writing our _glue_ code and other
testing logic as easy and clean as possible.

As usual, we store our Espresso and other UI tests under `src/androidTest`, with a
little discrepancy that instead of `java` subdirectory, we store our Kotlin source code in
`kotlin` subdirectory. And in order to run Espresso tests we need to declare it as a dependency
in our build script plus set `AndroidJUnitRunner` as the default test instrumentation
runner, exactly like you would do with plain Espresso tests:

```groovy
android {
    ...
    defaultConfig {
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
}

dependencies {
    ...
    androidTestCompile 'com.android.support.test.espresso:espresso-core:2.2.2'
}
```

Now to the test suite itself. Our example Espresso test class
[`EspressoKotlinTest`](https://github.com/GreenhouseCI/kotlin-tests/blob/master/app/src/androidTest/kotlin/com/greenhouseci/kotlin_tests/kotlintests/EspressoKotlinTest.kt)
looks like

```ruby
@RunWith(AndroidJUnit4::class)
class EspressoKotlinTest {

    ...

    @Rule @JvmField
    var activityRule = ActivityTestRule<MainActivity>(MainActivity::class.java)

    ...

    @Test
    fun testAddItemsToList() {
        val formatter = Formatter()
        val lv = onData(anything()).inAdapterView(withId(R.id.lv_items))

        var items = arrayOf(
            Pair("    item 1", "item 1"),
            Pair("item 2  ", "item 2"),
            Pair("  item  \n3  ", "item 3")
        )

        items.map { pair -> addItemToList(pair.first) }
        items.mapIndexed { index, pair ->
            val expected = formatter.strip(pair.second)
            lv.atPosition(index).onChildView(withId(R.id.tv_list_item)).check(
                matches(withText(expected))
            )
        }
    }
}
```

You can see that the Espresso test suite at hand doesn't differ much from the
unit tests we discussed in the previous section. And neither does it differ much from
your already existing Espresso tests written in Java. Truth is, that majority of the
code that does the heavy lifting is plain *Java* and other parts are almost
drop in replacements.

As usual with instrumentation tests, we start off by creating an instrumented JUnit 4
test class by adding

```ruby
@RunWith(AndroidJUnit4::class)
```

annotation at the beginning of our test class definition. And naturally we can make
use of Espresso's built-in `ActivityTestRule` to handle our activity life cycle:

```ruby
@Rule @JvmField
var activityRule = ActivityTestRule<MainActivity>(MainActivity::class.java)
```

With one minor caveat that you need to annotate it with `@JvmField` to convert it
from Kotlin *property*, that is unrecognized by JUnit, to a JVM field that is edible
by JUnit.

Apart from these tiny details, you can just use the familiar Espresso API from the
test functions.

## Running our Kotlin tests

Since we have already updated our `sourceSets` in `build.gradle` we don't have to
go through any configuration magic any more. You can execute both unit and instrumentation
tests right from Android Studio by just right-clicking either on your tests packages or
Kotlin test files and clicking on "Run 'Tests in ...'" as can be seen below:

<div style="text-align:center; padding: 20px 0;"><img src="/assets/run-kotlin-tests-form-android-studio.png" alt="Run Kotlin tests from Android Studio"/></div>

The very same minimal configuration logic applies also in case you should want to
execute your tests from command line. Kotlin unit and instrumentation tests can be
executed with regular Gradle commands

```bash
gradlew test
```

and

```bash
gradle connectedAndroidTest
```

## But what good are tests if you don't run them?

Long story short, running your tests manually is just not feasible. __To ensure the
wellbeing of your app, it has to be tested after every commit, with no exceptions allowed!__
The best way to achieve it is to make use of CI. And with Greenhouse you get full support
for tests written in Kotlin out of the box. Just follow our regular flow for [building
an Android app](http://docs.greenhouseci.com/docs/building-android-apps) and we'll
automatically detect and run all your tests, including those written in Kotlin.

## Final remarks
