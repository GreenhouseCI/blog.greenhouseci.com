---
layout: post
title:  "Test your hybrids!"
date:   2016-09-16 00:00:00
categories: Greenhouse update
tags: [testing]
author: nik
share: true
published: true
comments: true
---

At Greenhouse, we're strong believers in automated testing. The Greenhouse
codebase itself is thoroughly covered by tests and we constantly aim to make our
testing even more comprehensive. And as most of you probably know, our service has
included robust support for native iOS and Android app tests since day
one. Today, we are happy to announce that Greenhouse now supports testing for
cross-platform applications as well. Our implementation requires a bit of
configuration up front, but gives you tons of flexibility in how you write and
run your tests. Let's dive in!

<!--more-->

## Testing cross-platform applications

Our overriding goal at Greenhouse is to make everything as simple as possible
for our users. That is why we spent no small amount of time ensuring that your
Android and iOS tests can be detected, executed and reported automatically, with
no extra work required on your part.

When it came to supporting testing for hybrid apps, however, we could see that
the fully automated approach would not work. The hybrid ecosystem does not have
well-defined standards for how tests are written, where they are placed within
the project structure, what testing framework they use or how they are run. Some
of you might put unit tests in the "testing" directory and use the Karma test
runner to execute them directly from the command line. Others will write
comprehensive end-to-end tests with Protractor and run them via a custom Gulp
task. Or run both unit and feature tests with Grunt. Some are happy to use a
headless browser such as PhantomJS, others insist on the real deal that is
Chrome. Or Firefox. Or... Given such endless possibilities, any attempt at
complete automation was bound to come up short and leave many users frustrated.

![Hybrid app testing stack](/assets/hybrid_test_stack.png "Hybrid app testing
dependencies")

Instead, we ask you to tell Greenhouse how to run your tests, and to make
sure that the results are reported in the standard xUnit format. With that done,
Greenhouse will detect the output, parse it, show detailed testing results for
your build in the UI, and take these into consideration when setting the build's
final status.

## Setting up custom tests in Greenhouse

The first step of the setup is to ensure that all of your testing dependencies
are available in the build sandbox. We are including Chrome, Firefox, karma-cli
and Protractor by default. (If you think something else should be added to this
list, please let us know via [our forum](http://docs.greenhouseci.com/discuss).)
The most natural place to do this is in a [custom post-clone script](http://docs.greenhouseci.com/docs/custom-build-steps),
which you may well be using already to install your cross-platform app's other
dependencies.

Next, configure your test runner of choice to output its results in the xUnit
format to the location specified by the [`$GREENHOUSE_XUNIT_RESULTS_DIR`](http://docs.greenhouseci.com/docs/environment-variables-files)
environment variable. You can take advantage of other Greenhouse environment
variables, such as `$GREENHOUSE=true` or `$CI=true` to make the output
conditional on whether the tests are running locally or in Greenhouse.
Alternatively, you can create separate config files for your test runners and
use them when running tests in Greenhouse.

Finally, include a [post-build script](http://docs.greenhouseci.com/docs/custom-build-steps)
with the commands necessary to run your tests. Here, you can make use of another
environment variable, `$GREENHOUSE_BUILD_STEP_STATUS=success/failure` to decide
whether the tests should be executed. To prevent the script from exiting with a
non-zero code in case of test failures, append the null command `|| :` to each
test invocation:

```shell
#!/bin/sh

if [ "$GREENHOUSE_BUILD_STEP_STATUS" == "success" ]
then
    karma start greenhouse_karma.conf.js --single-run || :
    protractor greenhouse_protractor.conf.js || :
fi
```

With these simple steps out of the way, your custom tests will be executed
during the next successful build. Greenhouse will then show the testing results
in the **Tests** tab of the build info screen and will take them into account
when determining the build's final status.

![Custom test results in Greenhouse](/assets/greenhouse_custom_test_results.png
"Greenhouse custom test results")

Please consult [our documentation](http://docs.greenhouseci.com/v1.0/docs/testing-hybrid-applications)
for a more detailed description of setting up testing for your cross-platform
application. As always, should you have any questions, comments or suggestions,
please get in touch with us
[directly](https://greenhouseci.com/contact-us.html), via [our forum](http://docs.greenhouseci.com/discuss)
or by tweeting [@GreenhouseCI](https://twitter.com/GreenhouseCI).
