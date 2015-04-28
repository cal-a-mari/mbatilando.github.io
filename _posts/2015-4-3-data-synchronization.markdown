---
layout: post
title:  "Types of Data Synchronization"
date:   2015-04-03 20:57:00
categories: coding
tags: swift data synchronization
image: /assets/images/cover.jpg
---

#Types of Data Synchronization
Data synchronization is a problem for every platform and young programmers like me often forget about this problem. Since I'm a total noob in this area, I decided to read more about it and stumbled upon [this](https://github.com/drewmccormack/ensembles) awesome objc.io article. I've made an abridged version of the article if you want the TLDR version.

![Synchronous Peer-to-Peer]({{ site.url }}/assets/images/data-synchronization/sp2p.png)
###Synchronous Peer-to-Peer
You can think of this approach similar to how iTunes syncs your data between your devices. There's no server involved, just two clients-- your computer and your phone. One of the main advantages of using this approach is that it's fast, since both clients are on the same local network. Therefore this approach is more appealing when you're trying to synchronize data-heavy content between devices such as music or photos.

![Synchronous Client-Server]({{ site.url }}/assets/images/data-synchronization/scs.png)
###Synchronous Client-Server
This approach is very similar to the last one, however this time there's a server that's present and handles data synchronization between all devices. Think of Amazon Web Services (AWS) holding all your data and just having your devices sync up to it whenever it has network connectivity. However, this approach sacrifices speed with convenience since cloud data transfers are slower than local network data transfers.

![Asynchronous Client-Server]({{ site.url }}/assets/images/data-synchronization/acs.png)
###Asynchronous Client-Server
Asynchronous Client-Server is very similar to its counterpart with the difference that the clients themselves also have a local data store. An example of this would be an application that uses Core Data and Ensembles as its synchronization API with the server. One of the major advantages using this approach is that users of your app can continue to use it even without a network connection and then have it sync up with the server whenever it gets reconnected (so cool!). This is especially prevalent in mobile development because you can't always rely on your users to have a really good network connection.

![Asynchronous Peer-to-Peer]({{ site.url }}/assets/images/data-synchronization/ap2p.png)
###Asynchronous Peer-to-Peer
This approach removes the need to have an 'intelligent' server and replaces it with a basic file handling server. Think of Asynchronous Client-Server, except that the server simply sends out logs to the clients with the changes and has them figure out the state of the application.
