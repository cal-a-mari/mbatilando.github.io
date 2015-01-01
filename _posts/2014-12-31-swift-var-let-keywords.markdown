---
layout: post
title:  "Swift var & let keywords"
date:   2014-12-31 20:57:00
categories: coding
tags: swift var let
image: /assets/images/cover.jpg
---
#Swift var & let keywords
Whenever you're declaring variables in Swift, you have the choice of using either the ***var***
or ***let*** keyword. In this post, I'll quickly talk about the differences between the two.

###var
***var*** is the normal case for a variable, we can easily reassign the variable to another value of the same type:

	var myString = "foo"
	myString = "bar"
	println(myString) // Prints bar

	myString = 5 // Error

### let
On the other hand, the ***let*** keyword defines a **constant** variable, meaning that its value cannot be changed after initialization:

	let myString = "foo"
	myString = "bar" // No bueno

Pretty straightforward, but things are a bit different if you use let with a reference type such as a class:

	class Animal {
		var name: String

		init (name: String) {
			self.name = name
		}
	}

	let shiba = Animal(name: "Shibi")
	shiba.name = "Timmy"
	println(shiba.name) // Prints Timmy

**This behavior is fine because you're not changing the value of the variable; you're only changing a property of the value of the variable.** So if I were to change the value of the variable instead, I would get an error:

	let shiba = Animal(name: "Shibi")
	corgi = Animal(name: "Timmy") // Illegal

Lastly, if you didn't want the name of the animal to be changed, you can declare name to be using the let keyword:

	class Animal {
		let name: String

		init (name: String) {
			println("Initializing: \(name)")
			self.name = name
		}

		deinit {
			println("Deallocating: \(self.name)")
		}
	}

	var myAnimal = Animal(name: "Shibi")
	myAnimal.name = "Timmy" // Error
