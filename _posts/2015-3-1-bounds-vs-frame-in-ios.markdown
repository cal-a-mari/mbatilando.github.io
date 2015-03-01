---
layout: post
title:  "bounds vs. frames in iOS"
date:   2015-3-1 20:57:00
categories: coding
tags: ios coding
image: /assets/images/cover.jpg
---
#bounds vs. frames in iOS
We recently started messing around with animation in my CodePath iOS bootcamp and one aspect that sort of confused me was the concept of bounds vs. frames.

This tutorial from Ray Wenderlich gave a good, quick explanation of the difference between the two and I suggest that you take a look at this tutorial. However, if you just need a quick answer you can just read my quick explanation below.

###frames
You can think of a frame of a view just like a...well..a picture frame. And just like a picture frame, a view frame has contents within it. With that analogy, whenever you change a view's frame, you're essentially moving the entire view (and its contents within it) around its superview.

```
containerView.frame.origin.x += 50 // Move the container view to the right by 50 points
```

###bounds
You can think of the bounds of a view as a way to tell the view where to start drawing itself. As a result of manipulating the view's bounds, you're moving where the contents within it will be displayed. Note that changing a view's bounds **DOES NOT** change the location the view itself in the super view.


```
containerView.bounds.origin.x += 50 // Start drawing my contents at (x + 50, y)
```
