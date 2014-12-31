---
layout: post
title:  "Swift Closures"
date:   2014-12-30 20:57:00
categories: coding
tags: swift closures
image: /assets/images/cover.jpg
---
#Swift Closures
Similar to JavaScript, Swift uses closures to encapsulate, capture and store references of constants and variables from the context in which they are defined.

Functions are actually special cases of closures. Here are two different types of closures:

	/* A global function is a closure that has a name
	 * and does not capture any values
	 */
	func foo() -> String {
		return "bar"
	}

	println(foo()) // Prints "bar"

	/* A nested function is a closure that has a name and
	 * captures values from its enclosing function
	 */
	func nestedClosure () -> () -> String {
		var myValue = "bar"
		func nested () -> String {
			return myValue
		}
		return nested
	}

	var test = nestedClosure()()
	println(test) // Prints "bar"

###Closure Expressions
The third type of closures are called closure expressions which are anonymous (unnamed) functions that can be written in a very concise syntax and can capture values from its context. Let's take a look at the **map** function of the Array type:

> map(_:)

> Returns an array of elements built from the results of applying a provided transforming closure for
> each element in the array.

Let's say we wanted to increment an array of Ints by one. One way to do this would be to define an ***incrementOne*** function and pass it to map:

	let myInts = [1, 2, 3, 4, 5]
	func incrementOne(elem: Int) -> Int {
		return elem + 1;
	}
	var incremented = myInts.map(incrementOne)
	println(incremented) // Prints [2, 3, 4, 5, 6]

That gets the job done, however, Swift actually lets us be more concise. Instead of explicitly defining a function, we can use closure expressions:

	let myInts = [1, 2, 3, 4, 5]
	var incremented = myInts.map({(element: Int) -> Int in return element + 1})
	println(incremented) // Prints [2, 3, 4, 5, 6]

Pretty cool, huh. Let's look at the key different parts of a closure expression:

	{(element: Int) -> Int in return element + 1}

First we have the double curly braces **{}** which signifies the start of the closure expression. Next we have **(element: Int)** which is the parameter for the closure. We have **-> Int** to specify the return type. Next have the **in** keyword specifying the start of the closure expression. And following that we obviously have the return statement.

###Type Inference
That's already pretty concise, but we can still get away with less! Swift uses a technique called **Type Inference**, meaning it can determine the types of your parameters and return value from the map function so that you don't have to specify them yourself. In this case, we can write:

	var incremented = myInts.map({(element) in return element + 1})
	println(incremented) // Prints [2, 3, 4, 5, 6]

###Implicit Returns
Nice, we just cut down more characters..but wait! Since our closure is a single-expression, we can also omit the **return** keyword:

	var incremented = myInts.map({ element in element + 1})

###Shorthand Argument Names
We're actually not even done yet, Swift allows us to use shorthand argument names, so instead of using element as our parameter name we can type:

	var incremented = myInts.map({$0 + 1})

###Trailing Closures
If we wanted to do something more than a single-expression for our closure. We can use a trailing closure if we want our final (or only) argument to be a closure expression. Here's a piece of code that uses a trailing closure. Notice that you can remove the () if the only argument is a closure.

	import UIKit
	let weirdAnimalSounds = ["Meep", "Moo", "Meow", "Derp"]
	let people = ["Mari", "Paulina", "Carina"]
	var repeatThrice = people.map {
		(var elem) -> String in
		var rand = Int(arc4random_uniform(UInt32(weirdAnimalSounds.count)))
		return "\(elem) says \(weirdAnimalSounds[rand])"
	}
	println(repeatThrice) // Prints ["Mari says Meow", "Paulina says Moo", "Carina says Derp"]
