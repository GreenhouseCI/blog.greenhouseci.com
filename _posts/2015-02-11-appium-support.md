---
layout: post
title:  "Greenhouse has added support for Appium"
date:   2015-02-11 16:00:00
categories: Greenhouse update
share: true
comments: true
---

After many hours of hard work, Appium support for both Android and iOS is finally here.
We currently enable writing Appium tests in either Java or PHP.

<!--more-->
<h2>What is Appium?</h2>

<a href="http://appium.io/">Appium</a> is a mobile automation platform that provides a cross-platform API for writing tests.
This means that you can use the same API to write tests for both Android and iOS. This leads to better code reuse, because if you are developing your application for both Android and iOS in parallel, the functionality is quite likely very similar. So, you reuse the same tests for both platforms.

What is even more cool about Appium, is that you can write the tests in your language of choosing. Yes, you heard that right, the only requirement is that your language provides the WebDriver API. *Language of your choosing* might have been  a bit of stretch as you unfortunately cannot write tests in neither <a href="http://esolangs.org/wiki/Malbolge">Malbolge</a> nor <a href="http://esolangs.org/wiki/chicken">chicken</a>. But you are not limited to writing tests in Objective C for iOS or Java for Android. You can just as easily write them in your favorite scripting language, like PHP, Ruby or Python. 


<h2>Running Appium tests in Greenhouse</h2>

Getting Appium tests up and running in Greenhouse takes a bit of extra work. But nothing that would break a sweat, I promise! 
There are some differences in the setup based on the language and platform.

<h3>How we find your tests</h3>

We detect your tests by looking for specific files in the repository. For PHP, we expect that your tests are configured via a PHPUnit configuration file which must be named **greenhouseci-phpunit.xml**

You can learn more about the file format from the official documentation <a href="https://phpunit.de/manual/current/en/appendixes.configuration.html">here</a>.

For Java, we look for a Maven build file **pom.xml**, which includes the Appium dependency.

<h2>Writing tests</h2>

In your tests, you must specify the location of the app: the <strong>*.app</strong> directory for iOS
or <strong>*.apk file</strong> for Android.

<h3>Android</h3>

For <b>Android</b>, this should be the relative path from the test file to the <code>apk</code> as in the following examples:

<h4>Java example</h4>

{% highlight java %}
File classpathRoot = new File(System.getProperty("user.dir"));
File appPath = new File(classpathRoot, "../../App/build/outputs/apk/App-greenhouseandroid-debug.apk");
DesiredCapabilities capabilities = new DesiredCapabilities();
...
capabilities.setCapability("app", appPath);
{% endhighlight %}

<h4>PHP example</h4>

{% highlight php %}
define("APP_PATH", realpath(dirname(__FILE__).'/../../App/build/outputs/apk/App-greenhouseandroid-debug.apk'));

class BaseTest extends Sauce\Sausage\WebDriverTestCase {
    ...
    public static $browsers = array(
        array(
         ...
        'desiredCapabilities' => array(
            ...
            'app' => APP_PATH)
{% endhighlight %}

<h3>iOS</h3>

For iOS, we export an environment variable <code>GREENHOUSE_SYMROOT</code>. This will hold the path of the current build's SYMROOT. Your tests should use this variable as in the following examples: <br />

<h4>Java example</h4>

{% highlight java %}
String appPath = System.getenv("GREENHOUSE_SYMROOT");
File appDir = new File(appPath, "Debug-iphonesimulator");
File app = new File(appDir, "greenhouse-ios.app");
DesiredCapabilities capabilities = new DesiredCapabilities();
...
capabilities.setCapability("app", app.getAbsolutePath());
{% endhighlight %}

<h4>PHP example</h4>

{% highlight php %}
define("APP_PATH", realpath(getenv("GREENHOUSE_SYMROOT")."/Debug-iphonesimulator/greenhouse-ios.app"));

class BaseTest extends Sauce\Sausage\WebDriverTestCase {
    ..
    public static $browsers = array(
        array(
        ...
        'desiredCapabilities' => array(
            ...
            'app' => APP_PATH)
{% endhighlight %}

Example code is available for both <a href="https://github.com/GreenhouseCI/greenhouse-android/tree/appium">Android</a> and <a href="https://github.com/GreenhouseCI/greenhouse-ios/tree/appium/greenhouse-ios/appium">iOS</a>.

<h3>Testing view</h3> 
We have added a testing configuration view where you can disable or enable tests.

Previously you could not disable tests for **iOS** and we ran them for every build. 
For **Android**, you needed to select a build target (a target with **build** prefix). 

This is all in the past now. When you add your project, we enable all of the tests by default. You can disable or enable them as you go, if the need be. For **iOS** you can now also **test a single target** if your scheme contains multiple targets.

<a data-lightbox="testing" href="{{ site_url }}/assets/testing_view.png">
    <img class="post-img" src="{{ site_url }}/assets/testing_view.png"/>
</a>

<h2>Coming up</h2>

<h3>Saucelab support for Appium</h3>
Many people choose to run their Appium tests in the Saucelabs cloud. Saucelabs allows you to view test runs live in the browser and provides video captures for later viewing. These two features are very important if you want diagnose problems in your UI tests. So, one of the upcoming features is running the UI tests in Saucelabs.

<h3>More languages for Appium</h3>
Perhaps you would like to write your tests in another language other than Java or PHP?
Check out Appium <a href="https://github.com/appium/sample-code/tree/master/sample-code/examples">code examples</a> for a list of different languages that have the Webdriver API driver available.
If you would like to see your favorite language supported by Greenhouse <a href="http://greenhouseci.com/contact-us.html">please let us know</a>.
<h3>Migration from TestFlight to iTunes Connect</h3>
Unfortunately Apple is <a href="http://help.testflightapp.com/customer/portal/articles/1768754">discontinuing the TestFlight service as of 2/26/2015</a>. As many of our customers rely on TestFlight for build distribution, we are currently working on integrating iTunes Connect build publishing with Greenhouse.

