---
layout: post
title:  "delete keyword in JavaScript"
date:   2015-1-29 20:57:00
categories: coding
tags: js coding
image: /assets/images/cover.jpg
---
#delete keyword in JavaScript
In JavaScript, if you wanted to remove an attribute of an object, you would use the ***delete*** keyword.

For example:
    
    var a = { 'foo': 'bar' };
    delete a.foo; // returns true
    console.log(a); // prints {}
    var x = 1;
    delete x; // returns false
    console.log(x); // prints 1

The delete keyword simply removes the reference to the property, it doesn't actually delete the property itself because
that happens during garbage collection.

The delete keyword returns a boolean, whether or not the operation was successful:
    
    var a = { 'foo': { 'bar': 1 }}
    b = a.foo;
    delete b; // returns false
    console.log(b); // prints {'bar': 1}


However, this would be a valid case:

    var a = { 'foo': { 'bar': 1 }}
    b = a.foo;
    delete b.bar; // returns true
    console.log(b); // prints {}
    console.log(a.foo); // prints {}

I'm actually not entirely sure as to why JavaScript does this (I executed these commands from Chrome console), but I found this thorough article [here](http://perfectionkills.com/understanding-delete/) explaining more of the delete keyword.

