---
layout: post
title:  "Reproducible builds: do you really need them?"
date:   2016-09-09 00:00:00
categories: Greenhouse update
tags: [ci, continuous integration]
author: uku
share: true
published: true
comments: true
---

<img class="center-image" src="https://imgs.xkcd.com/comics/cnr.png">

Continuous integration (CI) seems to have been adopted by a fairly large pool of developers. Although there haven't been any large-scale surveys (to the best knowledge of the author), one can reach this conclusion by the growing popularity of various hosted and self-hosted CI solutions, as well as the wide-spread adoption of agile software development practices.

One of the highly coveted values of CI is the market advantage it provides: speeding up and automating the development-testing-delivery cycle gives an obvious market advantage by allowing products to be released faster and with fewer defects.
But this need not be the only benefit that CI could bring to the table. 

<!--more-->


## Code versus application: the difference
Before revealing what this benefit is, it is necessary to delve into some vital distinctions.
Open source applications are often said to increase security because the source code can easily reviewed by many developers. 
This line of argumentation is made famous by Linus' law:  many eyes make all bugs shallow. One may argue 

However, most of the applications that we rely on are not open source. An open source zealot might claim that he is better off by making use of open source applications. But there is still a big problem: only the source code of application has been reviewed. Since compiling everything from scratch is not practical (unless you are a Gentoo user ;)), there exists a great divide between the source code and final application. As a result, most of the libraries and applications that we use are distributed as compiled binaries. **But how can we be sure that the compiled source code matches that of the binary?**. 

The obvious answer in this case would be of course that we let the user compile the source code and compare themselves. If distributed and self-compiled binaries are byte-for-byte the same thing then. The byte-for-byte comparison must exclude code signaures since most likely the person testing the application will not have the private key which was used

It turns out that we are at the mercy of the vendor of the software, and must assume that the vendor is not malicious nor compromised.

## Problems with achieving reproducibility

As mentioned in the previous section, reproducibility can be really tricky to achieve. This is because various parts of the build process might introduce indeterminism. In the following we will briefly examine the possible source of determinism.


## Reproducible builds for Android

Greenhouse is a continuous integration platform for mobile applications, so it makes sense for me to talk about how to make your mobile app builds reproducible.

The structure of Android application. Android applications are packaged and distributed as APKs. The structure of an APK is very similar to that of a jar file, it is basically ZIP archive:
<img src="http://image.slidesharecdn.com/english-final-140610053432-phpapp02/95/android-applications-in-the-cruel-world-how-to-save-them-from-threats-6-638.jpg?cb=1402390537"/>

The only directory that is relevant for our purposes here is the **META-INF**, this directory directory contains three files. `MANIFEST.MF`, `CERT.{RSA,DSA,EC}`, `CERT.SF`. For the sake of simplicity, I will not delve into the details of these files, but for our purposes it will be sufficient to know that they deal with the code signing of the application. 

So, the Android Operating System, when presented with the task of installing or upgrading an APK file, will use this directory to verify whether the signature is valid and whether to allow the installation to continue. The conclusion is that two APKs cannot be compared byte-for-byte, because we do not have the same signing files as the author of the application so the **META-INF** directories are bound to differ.
As result these files must be discarded when comparing two APK files.

The guys over at Whisper Systems have created a nifty script that compares two APKs, aptly named [apkdiff](https://github.com/WhisperSystems/Signal-Android/blob/master/apkdiff/apkdiff.py), which does exactly that: it takes two APK files as input and compares them, discarding the codesigning related directories, byte-for-byte. The advantage of just comparing files byte-for-byte is that we escape all of the difficulties related to different timestamps which are pain when comparing archive formats such as ZIP files.

Without even noticing it, we have already made major strides in achieving reproducible builds for Android: we now have a way of determining if two APKs are `one and the same` and we know the basic structure of Android applications.
So, the only thing left to do is to somehow get APK to be the one and the same. This of course is the most difficult step :)

So, let's consider for a second what might be the sources of indeterminism for any Android application. 

## Make it so ##

Let's try to turn an existing non-deterministic Android build into a reproducible one: for this we will use the [Google 2015 I/O application](https://github.com/google/iosched). Why not 2016? Simply because Google people have not bothered to release the 2016 source code for some reason. The application consists of two parts: the server application and the Android app, we will only focus on the latter, so when I reference a file in the repository, it's in the `android` folder.

The obvious sources for indeterminism are external dependencies which are not part of the project itself, but are fetched from somewhere else. So, the first step would be fix these dependencies with hardcoded versions.
So, let's start by examining [build.gradle](https://github.com/google/iosched/blob/master/android/build.gradle)

In the `repositories` section, we see

<pre><code>repositories {
    mavenCentral()
    flatDir {
        dirs 'libs'
    }
    flatDir {
        dirs '../third_party/AndroidSlidingUpPanel/libs/'
    }
    flatDir {
        dirs '../third_party/svg-android/libs/'
}
</code></pre>

Furthermore, in the dependencies section, we see entries like this
<pre><code>compile "com.google.android.gms:play-services-analytics:${google_play_services_client_library_version}"
</code></pre>

<pre><code>compile 'com.google.code.gson:gson:2.3'
</code></pre>

The dependencies variables are resolved from `gradle.properties` and seem to be hard-coded to specific versions, meaning that Google has already done a good job of fixing the dependencies, and we are well on our way towards a reproducible build.

With this being said, we see that some, or even most, of the dependencies come from Maven Central, few others are included in the repository. But how can we be sure that Maven Central is not compromised and someone doesn't change the dependencies there? This could just happen without us noticing anything.

Thankfully WhisperSystems comes to the rescue once again with a very useful plugin: [Gradle Witness](https://github.com/WhisperSystems/gradle-witness). To put it shortly, it records the hash of each of the dependencies in your `build.gradle` file and on each build, it checks whether the dependencies are fetched still match these fixed hashes. This of course helps with reproducibility as well, because it ensures that the dependencies remain the same.

So, as the first modification, let's try to add the Gradle Witness to this project.
We begin by fetching and building Gradle Witness and including it in the `libs` folder

<pre><code># current working directory is $IOSCHED_REPO_ROOT/android
git clone https://github.com/WhisperSystems/gradle-witness witness
gradle -b witness/build.gradle build
cp witness/build/libs/gradle-witness.jar libs/
</code></pre>

Now, add it your `build.gradle` as such:

<pre><code>buildscript {
    dependencies {
        classpath files('libs/gradle-witness.jar')
    }
}
</code></pre>


## Reproducible builds for iOS

Unfortunately, reproducible builds are not as straightforward for iOS as they are for Android. 

The first obvious problem is that obtaining the legitimate App Store binary for an iOS application is much more difficult than it is for Google Playstore. To obtain the binary from the Apple App Store, you need to have a jailbroken device. This in turn
implies that there is a working exploit for the current version of iOS, which might or might not be the case, whereas in the case of Android, the bootlocker already is or can be unlocked, allowing relatively painless access to installed APK files.

While the first complication might not be that severe for security enthusiasts, there is still more. The structure of



## Security benefits of CI
CI could also greatly improve the security of applications. 


## An alternative to reproducible builds

Reproducible builds are too my mind not practical for most projects, at least with the current state of the software development industry.
So, I would propose an alternative solution focus on making your builds more deterministic. 
** Deterministic build ** 

