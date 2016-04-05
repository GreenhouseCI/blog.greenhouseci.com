---
layout: post
title:  "How it all started"
date:   2016-04-05 01:00:00
categories: Greenhouse update
tags: [general]
author: triin
share: true
comments: true
---

A couple of years ago, we were a bunch of Android and iOS developers, building apps for many awesome companies, including giants such as Skype and Microsoft. After years of working on multiple apps, our knowledge and skillset had expanded to a point where we knew the mobile development process inside out. This gave us the ability to constantly push our limits and increase the quality and speed of developing new apps. At the same time, however, we constantly struggled with ineffectiveness caused by manual work that could have been automated.
<!--more-->
This included a variety of related tasks such as building new app versions from a controlled environment, running and monitoring automated tests, keeping a proper history of different versions, distributing the latest builds to all developers and testers, and so on.

After a while, we understood that if we really wanted higher quality apps to reach end-users faster, we would have to implement a proper continuous integration pipeline -  a CI service that’s dead-easy to set up, doesn’t get in the way during day-to-day work, has sensible defaults, is always up to date with the latest SDKs and well.. just works.


![Team](/assets/team1.jpg "Team")

## Does continuous integration have to be so painful?

Building, testing and distributing mobile apps manually felt like plowing fields with horses in the age of tractors, and so we decided to take a look at the available CI tools. Other professional app developers seemed to rely primarily on Jenkins, which made it our first choice. But, boy, did that turn out to be a huge headache! Jenkins is one of the oldest and most used CI tools for software development. It is an open source automation server that provides hundreds of plugins to support building, deploying and automating any project. While Jenkins may well be the most versatile CI tool out there, the reality is that for a mobile app dev team like ours setting up a Jenkins server may easily take days. And while there’s a lot of configuration to be done up front, maintaining a running Jenkins server is where the hours really start adding up.

We realised that while Jenkins was a very broad CI solution, it still didn’t cover the specific needs of mobile app developers. Even if it had, its sheer bulk would have made it difficult for us to use the features we wanted. It would have been like using a sledgehammer when you actually needed a chisel. We looked at a number of other CI options, but while many of them were quite feature-rich, none addressed the needs of mobile app developers directly and fully.

## The solution? If there’s none, build one :)

Ultimately, we saw no better alternative than to build our own continuous integration solution.  While we knew that we were committing to a substantial project, it was clear that using another CI service would end up costing us even more time and effort in the long run. There are many platform-specific tools, such as build frameworks, testing frameworks, distribution channels and team communication channels that a CI server needs to be integrated with, and we wanted our solution to have all these features to be fully usable out of the box. It took us many months and long hours of intense programming, testing, improving, and long discussions between team members about what features to implement from the start and which to leave for later. And what made everything even more complicated was that while we had become really good at mobile app development, now we had to build web software even better. All this struggle made our already talented team super powerful - we transformed from a kick-ass mobile app dev team into a super-kick-ass software dev team.

## And the result?

The result was a cloud-based continuous integration tool that was easy to use, required no configuration or setup, and had all the features that mobile developers needed.

In 2014, by the time our hassle-free continuous integration server was already serving our team’s needs, the world started to notice a huge change in software development. Mobile apps had taken the center stage, pushing traditional web applications out of the spotlight. In 2010, there were fewer than two million app developers in the world, but this number has been growing 80% year over year. Last spring, we did a little research and found out that there are over 5 million mobile app developers worldwide, and their ranks are expected to triple by 2020. We suddenly understood how many developers our CI solution could actually help, and this moment of realisation brought Greenhouse to life.

## The moment of truth

After launching Greenhouse to the public, at first we just asked developers we knew to try out our CI solution and tell us what they thought of it. The feedback we received encouraged us to spread the word to the world at large that finally there existed a hassle-free continuous integration tool that was tailor-made for the specific needs of mobile app developers. We started to witness the magic of word of mouth, and without any marketing hacks people just came to our homepage, signed up and started using our CI service. It wasn't because Greenhouse had every feature imaginable and was entirely problem-free - we are always working to make it even better - but because people finally saw how a mobile-oriented CI solution can address their long-term pains.

## Continuous integration is a must-have for mobile app developers

Today we see more and more mobile app developers starting to understand how important it is to include continuous integration into their app development process. As the expectations of mobile apps’ end users continue to grow, developers need tools to help them build higher quality apps that can be released more quickly and painlessly. This is the essence of **Greenhouse** - we exist to make mobile app developers more productive, less stressed, and happier doing the work they love.
