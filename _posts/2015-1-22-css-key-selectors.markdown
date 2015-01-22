---
layout: post
title:  "Key Selectors in CSS"
date:   2015-1-22 20:57:00
categories: coding
tags: css coding
image: /assets/images/cover.jpg
---
After working with CSS for a couple of years, [this article](http://oli.jp/2011/ids/) totally blew my mind.

	#home a {…}

> We’d generally read this selector as find the element with id="home", then apply these styles to every a it contains. This should be super > fast, right? After all there should only be one id="home" on the page. However, browsers read this differently: find every a element, then > check if its parent element is id="home", and if not keep checking parent elements until you find it or reach <html>. That’s a lot less 
> performant than our mental model.