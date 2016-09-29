---
layout: post
title:  "Reproducible builds"
date:   2016-09-09 00:00:00
categories: Greenhouse update
tags: [ci, continuous integration, reproducible builds]
author: uku
share: true
published: false
comments: true
---

Continuous integration (CI) seems to have been adopted by a fairly large pool of developers. Although there haven't been any large-scale surveys (to the best knowledge of the author), one can reach this conclusion by the growing popularity of various hosted and self-hosted CI solutions, as well as the wide-spread adoption of agile software development practices.

One of the highly coveted values of CI is the market advantage it provides: speeding up and automating the development-testing-delivery cycle gives an obvious market advantage by allowing products to be released faster and with fewer defects.
But this need not be the only benefit that CI could bring to the table. 

<!--more-->


## Code versus application: the difference
Before revealing what this benefit is, it is necessary to delve into some vital distinctions.
Open source applications are often said to increase security because the source code can easily reviewed by many developers. 
This line of argumentation is made famous by [Linus' law](https://en.wikipedia.org/wiki/Linus%27s_Law):  many eyes make all bugs shallow. 

However, most of the applications that we rely on are not open source. An open source zealot might claim that he is better off by making use of open source applications. But there is still a big problem: only the source code of application has been reviewed. 

Since compiling everything from scratch is not practical (unless you are a Gentoo user ;)), there exists a great divide between the source code and final application. As a result, most of the libraries and applications that we use are distributed as compiled binaries. **But how can we be sure that the compiled source code matches that of the binary?** 

The obvious answer in this case would be of course that we let the users compile the source code and compare for themselves. If the distributed and self-compiled binaries are byte-for-byte the same then we can say with certainty that the source code matches the binary. But unfortunately it's not that easy! The byte-for-byte comparison must exclude code signatures since the end user will not have the private key which was used for distributing the application. It turns out that code signing is just the tip of the iceberg, as we will learn in the next chapter, very minuscule details can turn builds not reproducible.

Alas, it turns out that even with open source applications, we are at the mercy of the vendor of the software, and must assume that the vendor is not malicious nor compromised. At least until we have reproducible builds.

## Problems with achieving reproducibility

As mentioned in the previous section, reproducibility can be really tricky to achieve. This is because various parts of the build process might introduce indeterminism. 
Sources for indeterminism include:

* timestamps
* version information
* locales
* randomness
* ...
* and many more 

I won't dig into these numerous problems here, since it's out of the scope of this short blog post. You can learn more about the problems related to and solutions for reproducible builds at [reproducible-buils.org](https://reproducible-builds.org). But the key takeaway from this should be that even the tiniest change in any of these details can make a build produce different binary output, which makes it almost impossible to tell whether the binary matches the given source code.


## Reproducible builds for Android

Greenhouse is a continuous integration platform for mobile applications, so it makes sense for me to talk about how to make your mobile app builds reproducible.
Before we go any further, I would like to give credit where it's due, the following is largely based on the [short and sweet](https://whispersystems.org/blog/reproducible-android/) blog post by [moxie0](https://en.wikipedia.org/wiki/Moxie_Marlinspike)

The structure of Android application. Android applications are packaged and distributed as APKs. The structure of an APK is very similar to that of a jar file, it is basically ZIP archive:
<img src="http://image.slidesharecdn.com/english-final-140610053432-phpapp02/95/android-applications-in-the-cruel-world-how-to-save-them-from-threats-6-638.jpg?cb=1402390537"/>

The only directory that is relevant for our purposes here is the **META-INF**, this directory directory contains three files. `MANIFEST.MF`, `CERT.{RSA,DSA,EC}`, `CERT.SF`. For the sake of simplicity, I will not delve into the details of these files, but for our purposes it will be sufficient to know that they deal with the code signing of the application. 

So, the Android Operating System, when presented with the task of installing or upgrading an APK file, will use this directory to verify whether the signature is valid and whether to allow the installation to continue. The conclusion is that two APKs cannot be compared byte-for-byte, because we do not have the same signing files as the author of the application, so the **META-INF** directories are bound to differ.
As result these files must be discarded when comparing two APK files.

The guys over at Whisper Systems have created a nifty script that compares two APKs, aptly named [apkdiff](https://github.com/WhisperSystems/Signal-Android/blob/master/apkdiff/apkdiff.py), which does exactly that: it takes two APK files as input and compares them, discarding the code signing related directories, byte-for-byte. The advantage of just comparing files byte-for-byte is that we escape all of the difficulties related to different timestamps which are pain when comparing archive formats such as ZIP files.

Without even noticing it, we have already made major strides in achieving reproducible builds for Android:we know the about the basic anatomy of Android applications, and thanks to this insight have a programmatic way of determining if two APKs are the same.

So, the only thing left to do is to ensure the APKs are always the same, regardless of the where or by whom they are built. This of course is the most difficult step :)


## Make it so 
**Getting it to build**

Let's try to turn an existing non-deterministic Android build into a reproducible one: for this we will use the [Google 2015 I/O application](https://github.com/google/iosched). Why not 2016? Simply because Google people have not bothered to release the 2016 source code for some reason, despite [promises](https://github.com/google/iosched/issues/199#issuecomment-218789356) to do so very soon. The application consists of two parts: the server application and the Android app, we will only focus on the latter, so when I reference a file in the repository, it's in the `android` folder.

Let's start of by fetching the code.
```bash
git clone https://github.com/google/iosched && cd iosched/android
git checkout tags/2015
```

Note that we are using the `2015` release tag for this to get a consistent snapshot of the code.


The first step logical step would be to get the application compiling in release mode, because this configuration is the most likely candidate to be used by Google for publishing to Play Store. So, before doing anything, let's take a look at the `build.gradle` file and corresponding section in `buildConfigs`.

```groovy
release {
    debuggable false
    minifyEnabled true
    // No signing config as we do this separately.
    proguardFiles getDefaultProguardFile('proguard-android.txt'), file('proguard-project.txt')
    buildConfigField("String", "SERVER_MANIFEST_ENDPOINT", "\"${production_api_manifest_endpoint}\"")
    buildConfigField("String", "GCM_SERVER_URL", "\"${production_gcm_server_endpoint}\"")
    resValue("string", "website_host_name", "${production_website_host_name}")
}
```

We are in luck, well, sort of, because unlike the other buildConfigs, `release` does not seem to  have a `signingConfig` set for it and there's a comment that suggests that this is done manually. This means that we don't have to generate a keystore for the build to work at all.

So, let's try to to compile it:
```bash
../gradlew clean assembleRelease
...
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':android:packageRelease'.
> Unable to compute hash of /tmp/iosched/android/build/intermediates/classes-proguard/release/classes.jar

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.

BUILD FAILED
```
We have a small problem which is related to Proguard. Thankfully adding these lines to `proguard-project.txt` fixes it. 

```
-dontwarn com.android.volley.toolbox.**
-dontwarn com.google.android.gms.analytics.**
-dontwarn com.google.android.gms.internal.zzvp
-dontwarn com.google.android.gms.common.GooglePlayServicesUtil
-dontwarn com.google.android.gms.tagmanager.**
-dontwarn com.larvalabs.svgandroid.**
```
```
:android:dexRelease
:android:packageRelease
:android:assembleRelease

BUILD SUCCESSFUL
```
The build succeeds
```bash
find . -name *.apk
./build/outputs/apk/android-release-unsigned.apk
```
So, we have now have our release APK.

**Getting it to reproduce**

Obvious sources for indeterminism are external dependencies which are not part of the project itself, but are fetched from somewhere else. So, the first step would be fix these dependencies with hard-coded versions.
So, let's start by examining [build.gradle](https://github.com/google/iosched/blob/master/android/build.gradle)

In the `repositories` section, we see

```groovy
repositories {
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
```

Furthermore, in the dependencies section, we see entries like this
```groovy
compile "com.google.android.gms:play-services-analytics:${google_play_services_client_library_version}"
```

```groovy
compile 'com.google.code.gson:gson:2.3'
```

The dependency variables are resolved from `gradle.properties` and seem to be hard-coded to specific versions, meaning that Google has already done a good job of fixing the dependencies, and we are well on our way towards a reproducible build.

With this being said, we see that some, or even most, of the dependencies come from Maven Central, few others are included in the repository. But how can we be sure that Maven Central is not compromised and someone doesn't change the dependencies there? This could just happen without us noticing anything.

Thankfully WhisperSystems comes to the rescue once again with a very useful plugin: [Gradle Witness](https://github.com/WhisperSystems/gradle-witness). To put it shortly, it records the cryptographic hash of each of the dependencies in your `build.gradle` file and on each build it checks whether the dependencies fetched still match these fixed hashes. 


So, as the first modification, let's try to add the Gradle Witness to this project.
We begin by fetching and building Gradle Witness and including it in the `libs` folder

```bash
git clone https://github.com/UkuLoskit/gradle-witness witness
../gradlew -b witness/build.gradle build
cp witness/build/libs/witness.jar libs/
```

*Note that the repository above is my fork of Gradle Witness. This is because I actually found a small bug in the plugin which makes it fail with an unhandled exception if one of the dependencies has an empty value for 'group'. You can find the diff with upstream [here](https://github.com/WhisperSystems/gradle-witness/commit/2bf6c933534977cf7c084de69e63dd57a3a9a66b).*

Now, augment your `build.gradle` as such:

```groovy
buildscript {
    dependencies {
        classpath files('libs/witness.jar')
    }
}

apply plugin: 'witness'
```

Now we can run `../gradlew -q calculateChecksums` 

```
```


There is a problem though: for some reason not all of the dependencies are showing up in the output, for example, where is `volley`? It seems that, by using the approach employed by Witness, some of the dependencies may not end up in this list.

When you look closely, you can see a pattern: looks like local dependencies which have been specified like this:
```groovy
compile files('../third_party/disklrucache/libs/disklrucache-2.0.2.jar')
```

do not show up, whereas if they are in this form
```groovy
compile (name:'svg-android-2.0.7-20150515.214425-1', ext:'jar')
```
they do. So, let's modify  our `build.gradle` accordingly
```diff
repositories {
     flatDir {
         dirs 'libs'
     }
@@ -28,9 +28,21 @@ repositories {
     flatDir {
         dirs '../third_party/svg-android/libs/'
     }
+    flatDir {
+        dirs '../third_party/basic-http-client/libs'
+    }
+    flatDir {
+        dirs '../third_party/disklrucache/libs'
+    }
+    flatDir {
+        dirs '../third_party/volley/libs'
+    }

 }
@@ -149,9 +171,9 @@ dependencies {
     // Glide library, used to handle asynchronous loading and caching of images.
     compile 'com.github.bumptech.glide:glide:3.5.2'


-    compile files('../third_party/disklrucache/libs/disklrucache-2.0.2.jar')
-    compile files('../third_party/volley/libs/volley.jar')
-    compile files('../third_party/basic-http-client/libs/basic-http-client-android-0.88.jar')
+    compile (name: 'disklrucache-2.0.2', ext: 'jar')
+    compile (name: 'volley', ext: 'jar')
+    compile (name: 'basic-http-client-android-0.88', ext: 'jar')

```

Now the `calculateChecksums` task should give us all of the dependencies needed for compiling the application. To make Witness verify this on every build, we add the output of `calculateChecksums` to `build.gradle` (since the plugin actually outputs Groovy code):

```bash
../gradlew calculateChecksums >> build.gradle
```


An astute reader might have noticed that the dependencies which are defined with `androidTestCompile` and `testCompile` do not show up in the output either, even after these changes. This seems to be by design, but having your tests reproducible as well seems like a pretty sensible use case. This shortcoming and the bug that I encountered forced me to delve into the [source code](https://github.com/WhisperSystems/gradle-witness/blob/master/src/main/groovy/org/whispersystems/witness/WitnessPlugin.groovy) of Gradle Witness. The plugin is quite simple, so if one would wish to extend the calculation of hashes and their verification to unit tests and instrumentation tests they would have to do it for `project.configurations.compile.resolvedConfiguration.resolvedArtifacts` and for `project.configurations.androidTestCompile.resolvedConfiguration.resolvedArtifacts`
as well as `project.configurations.testCompile.resolvedConfiguration.resolvedArtifacts`.

Unfortunately the addition of Witness requires another change to `proguard.txt`:

```
-dontwarn org.whispersystems.** 
```

The last piece of information should be, to my mind, included in the documentation of Gradle Witness.


## Reproducible build environment 

As the astute reader might have noticed, we have not dealt with keeping the build environment itself reproducible in any way. What is there to ensure that a minor update to Java, update to`libc` or something similar or even more obscure does not break our build? We have, up until now, swept this problem under the rug. Thanks to virtualization and containerization, this is not a huge problem, though. 

So, analogously to the Gradle dependency approach, we create a deterministic environment, but this time we are fixing the whole environment rather just the dependencies. Thanks to Docker we do not need to go virtualizing the entire operating system. The installation of Docker for their operating system is left as an [exercise](https://docs.docker.com/engine/installation/) for the reader.

Assuming that that you now have Docker installed and were able to successfully run the `hello-world` image, feast your eyes upon this `Dockerfile` file.

```bash
FROM ubuntu:14.04.3

RUN dpkg --add-architecture i386 && \
    apt-get update -y && \
    apt-get install -y software-properties-common && \
    add-apt-repository -y ppa:openjdk-r/ppa && \
    apt-get update -y && \
    apt-get install -y git=1:1.9.1-1ubuntu0.3 wget=1.15-1ubuntu1.14.04.2 libc6:i386=2.19-0ubuntu6.9 libncurses5:i386=5.9+20140118-1ubuntu1 libstdc++6:i386=4.8.4-2ubuntu1~14.04.3 unzip=6.0-9ubuntu1.5 lib32z1:i386=1:1.2.8.dfsg-1ubuntu1 openjdk-8-jdk=8u91-b14-0ubuntu4~14.04 && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get autoremove -y && 
    apt-get clean

ENV ANDROID_SDK_FILENAME android-sdk_r24.4.1-linux.tgz
ENV ANDROID_SDK_URL https://dl.google.com/android/${ANDROID_SDK_FILENAME}
ENV ANDROID_API_LEVELS android-23
ENV ANDROID_BUILD_TOOLS_VERSION 23.0.1
ENV ANDROID_HOME /usr/local/android-sdk-linux
ENV PATH ${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
RUN cd /usr/local/ && \
    wget -q ${ANDROID_SDK_URL} && \
    tar -xzf ${ANDROID_SDK_FILENAME} && \
    rm ${ANDROID_SDK_FILENAME} 
RUN echo y | android update sdk --no-ui -a --filter ${ANDROID_API_LEVELS}
RUN echo y | android update sdk --no-ui -a --filter extra-android-m2repository,extra-android-support,extra-google-google_play_services,extra-google-m2repository
RUN echo y | android update sdk --no-ui -a --filter tools,platform-tools,build-tools-${ANDROID_BUILD_TOOLS_VERSION}
RUN rm -rf ${ANDROID_HOME}/tools && unzip ${ANDROID_HOME}/temp/*.zip -d ${ANDROID_HOME}
```

If you are not familiar with Docker or the `Dockerfile` format, then what this does is that it uses the Ubuntu 14.04.3 base image and installs all of the required tools for building Android applications. You will notice that the dependencies installed via `apt-get` all have fixed version numbers, similarly to Gradle, this is in order to avoid any problems caused by newer packages upstream.

The next step is to create an actual image out of this Dockerfile. To do so, run

```bash
docker build -t "iosched ."
```
This process can take some time, so grab a hot cup of `$BEVERAGE` while it runs.
Once it has (hopefully successfully) finished, a Docker image tagged `iosched` will be available which is basically a very minimal installation of Ubuntu 14.04.

If you wish to interactively explore the container, you can start a shell in it:
```bash
docker run -t -i iosched:latest /bin/bash
```
If you navigate to `/usr/local/` you will find the Amdroid SDKs downloaded there, for example. Okay, you got the feel for how it works.

Now it's time to perform the build in our reproducible environment:






This approach is of course not without its problems. This `Dockerfile`, like much in this post, is adopted from WhisperSystems Signal-Android application. Their `Dockerfile` also has dependencies specified in the same manner, however, the particular versions they had specified had become unavailable upstream which made this process fail. Thus, we might run into an inconvenient situation where the build in the CI environment starts failing due to this, but updating the external requirements leads to different binary output. 

### Conclusion

In a sense this was an exercise in futility. We cannot really compare the produced APK to the one Google has in the App Store for Iosched because that would require Google to have used the same process for producing the APK in the first place, furthermore the application they have in the Play Store is much newer as well. However, the tutorial was more about providing the necessary tools and know-how as how to actually turn an existing project into a reproducible one.


## Reproducible builds for iOS

Unfortunately, reproducible builds are not as straightforward for iOS as they are for Android. 

The first obvious problem is that obtaining the legitimate App Store binary for an iOS application is much more difficult than it is for Google Playstore. To obtain the binary from the Apple App Store, you need to have a jailbroken device. This in turn implies that there is a working exploit for the current version of iOS, which might or might not be the case, whereas in the case of Android, the bootlocker already is or can be unlocked, allowing relatively painless access to installed APK files.

While the first complication might not be that severe for security enthusiasts, there is still more. Unlike for Android, codesigning is not the only change made to the application binary in the App Store. Apple additionally encrypts their binaries with their FairPlay DRM encryption. The reason for this is to hinder the cracking and reverse-engineering efforts. Obviously, the iOS OS cannot make sense of nor execute encrypted binaries, so the binary is decrypted by the kernel at runtime. Tools like Clutch take care of this problem and are able to extract the decrypted binary from memory.

But the complications do not end here. Unlike Android which uses platform-independent bytecode which is executed by the Dalvik virtual machine, iOS applications are actually platform-specific binary executables. Since iOS devices feature several platforms, the applications are usually distributed as fat binaries, or in Apple's terminology, universal binaries.
Matters are further complicated by the fact that.

The structure of
At appears to be the case
