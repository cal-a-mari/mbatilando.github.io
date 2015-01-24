---
layout: post
title:  "Flow Control In Swift"
date:   2015-1-20 20:57:00
categories: coding
tags: swift flow control
image: /assets/images/cover.jpg
---
#Flow Control In Swift
###for-loops
for-loops are pretty straight forward in Swift. There are a couple of ways to write a for-loop, here's one that you're probably familiar with:

	for var i=0, len = 10; i < len; i++ {
		println(i) // Prints 0..9
	}

Another way you could write it is using the ***in*** keyword to iterate over a range:

	for i in 1...5 {
		println(i) // Prints 1..5
	}

For this syntax, note that the end range is inclusive.

###while-loops
Another way to iterate is to use a while statement. A ***while*** statement uses a conditional to determine whether or not to continue iterating.

	var stopIndex = 10
	var i = 0

	while i < stopIndex {
		println(i) // Prints 0..9
		i++
	}

###break statement
If you wanted to direct the flow of execution out of the loop, use a ***break*** statement:

	for i in 1...5 {
		if i == 4 {
			println("Breaking at index \(i)")
			break;
		}
		println(i) // Prints 1, 2, 3
	}

###continue statement
On the other hand, if you just wanted to skip the current iteration of the loop, use a ***continue*** statement instead:

	for i in 1...5 {
		if i == 4 {
			continue;
		}
		println(i) // Prints 1, 2, 3, 5
	}

###switch statement
switch statements are very useful if you're trying to control the execution flow for many different values:

	func myFunc(num:Int) {
		switch num {
			case 3: println("Lucky number 3!")
			case 50...100: println("You can also do a range of values")
			default: println("If all else fails")
		}
	}

	myFunc(3) // Prints "Lucky number 3!"
	myFunc(70) // Prints "You can also do a range of values"
	myFunc(4) // Prints "If all else fails"

However, **switch statements must be comprehensive** (it must cover all possibilities). And that makes sense, how else would Swift know what to do if it doesn't have a case for a value? For example, if we were to remove the default case for the function above, we would get an error:

	func myFunc(num:Int) {
		switch num {
			case 3: println("Lucky number 3!")
			case 50...100: println("You can also do a range of values")
			// Error: Switch must be exhaustive
		}
	}

Switch statements don't necessarily have to use ints, you could also use strings or tuples:

	func myFunc(tuple: (String, Int)) {
		switch tuple {
			case ("Shiba", _): println("You can match according to one value")
			case ("Dolphins", 99): println("Exact match")
			default: println("If all else fails")
		}
	}

	myFunc(("Shiba", 10)) // Prints "You can match according to one value"
	myFunc(("Dolphins", 99)) // Prints "Exact match"
	myFunc(("Corgi", 888)) // Prints "If all else fails"
