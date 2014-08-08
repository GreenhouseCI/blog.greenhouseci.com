---
layout: page
permalink: /tutorials/codesigning_tutorial/
title: "Tutorial: How to add iOS Credentials to Greenhouse"
tags: [tutorial]
image:
  feature: greenhouse_bg_cropped_blog_feature_1024x256.jpg
share: true
---

Unfortunately Apple has made the whole code signing process (some might go to as far as to say needlessly) complicated. 
When you are adding your project to Greenhouse, you need three things: a **provisioning profile**, **developer certificate**, and a **private key**.


<h2 id="developer_certificate">Developer Certificate</h2>

First, we will get find your **developer certificate**. 

Open up **Keychain Access** by searching for it in Spotlight. 
In the **Categories** submenu on the left side bar select **My Certificates**

![Teams overview]({{ site.url }}/images/keychain-expanded-cropped.png)

The name of the certificate should start with **iPhone Developer:**

Once you have located your developer certificate, select **File -> Export Items** from the OSX menu bar.

![Teams overview]({{ site.url }}/images/keychain-export-cropped.png)
![Teams overview]({{ site.url }}/images/keychain-not-expanded-cropped.png)

This will prompt you to save the developer certificate. 

Be sure to leave the file format filled as **Certificate (.cer)**.

![Keychain save dialog]({{ site.url }}/images/keychain-certificate-dialog-cropped.png)


<h2 id="private_key">Private key</h2>
Now, repeat the process as in the previous process, except this time be  sure to leave the file format filed as **Personal Information Exchange (.p12)**.

![Keychain save dialog]({{ site.url }}/images/keychain-save-as-cropped.png)

Finally, you will be prompted for the **certificate export password**. The password is not actually mandatory and you can leave as blank, but it is recommended to use a strong password.

That's it. Now all you need is the corresponding provisioning profile.

<h2 id="provisioning_profile">Provisioning Profile</h2>
--------------------
Select the appropriate provisioning profile from <a href="https://developer.apple.com/account/ios/profile/profileList.action">Apple Developer portal</a>.
Download it and save it somewhere.


That's it. If you successfully downloaded your developer certificate that should be everything you need. Now you can upload both of these files. 
We check that the provisioning profile and developer certificate match. And will let you know if something goes wrong.


Having trouble?
--------------
Still having trouble? Let us know via team@greenhouseci.com
