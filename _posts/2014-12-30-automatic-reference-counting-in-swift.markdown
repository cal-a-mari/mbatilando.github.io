---
layout: post
title:  "Automatic Reference Counting in Swift"
date:   2014-12-30 20:57:00
categories: coding
tags: swift automatic reference counting
image: /assets/images/cover.jpg
---
#Automatic Reference Counting in Swift
One of the most awesome things about Swift is that you don't have to manually manage your
application's memory. In this post I'll quickly talk about how Swift uses Automatic Reference Counting (ARC) to manage your app's memory.

###Strong References
To make sure that Swift can safely deallocate memory of a certain instance, it counts how many strong references there are pointing to that instance. Strong references to an instance can be: a property, constant or variable.

Let's say you have a class called **Animal**

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

In Swift, we use the **'?'** keyword to state that a variable may have a value or that it may be nil:

	var shiba: Animal?
	shiba = Animal("Shibi")

By initializing an instance of an Animal and having a variable point to it, we make a strong reference and we see that Swift reserves memory and prints:

	Initializing: Shibi

If we want to deallocate memory for that instance, we simply remove the reference to it, and since there's only 1 strong reference to it, Swift automatically deallocates it for us:

	shiba = nil // Deallocating: Shibi

If we instead had 3 variables pointing to an instance, Swift will not deallocate it until all strong references are gone:

	var shiba1: Animal?
	var shiba2: Animal?
	var shiba3: Animal?

	shiba1 = Animal("Shibi")
	shiba2 = shiba1
	shiba3 = shiba1

	shiba1 = nil // Prints nothing
	shiba2 = nil // Prints nothing
	shiba3 = nil // Deallocating: Shibi

###Strong Reference Cycles
Pretty simple, however if two instances reference each other, a strong reference cycle occurs and both instances will not be deallocated even if we remove the references from the variables (leading to memory leaks):


	class Animal {
		let name: String
		var owner: Owner?

		init (name: String) {
			println("Initializing: \(name)")
			self.name = name
		}

		deinit {
			println("Deallocating: \(self.name)")
		}
	}

	class Owner {
		let name: String
		var pet: Animal?

		init (name: String) {
			println("Initializing: \(name)")
			self.name = name
		}

		deinit {
			println("Deallocating: \(self.name)")
		}
	}

	var shiba: Animal?
	var mari: Owner?

	shiba = Animal(name: "Shibi")
	mari = Owner(name: "Mari")

	shiba!.owner = mari
	mari!.pet = shiba

	shiba = nil // Prints nothing
	mari = nil // Prints nothing

Since I made a reference to the Owner instance from the Animal instance I created (and vice-versa) there are still strong references to both instances so Swift will not deallocate memory for both of them even after removing the variable references.

###Weak References
Enter weak references-- one solution for resolving strong reference cycles between instances. Weak references (unlike unowned references which I'll talk about later) are allowed to take on the value nil and allow you to reference another instance without keeping a strong hold on it, therefore disallowing a strong reference cycle. We use the **'weak'** keyword to declare a variable or property as a weak reference:

	class Animal {
		let name: String
		weak var owner: Owner? // An animal may or may not have an owner

		init (name: String) {
			println("Initializing: \(name)")
			self.name = name
		}

		deinit {
			println("Deallocating: \(self.name)")
		}
	}

	class Owner {
		let name: String
		weak var pet: Animal? // An owner may or may not have a pet

		init (name: String) {
			println("Initializing: \(name)")
			self.name = name
		}

		deinit {
			println("Deallocating: \(self.name)")
		}
	}

	var shiba: Animal?
	var mari: Owner?

	shiba = Animal(name: "Shibi")
	mari = Owner(name: "Mari")
	shiba!.owner = mari // Use the ! keyword to unwrap an optional value
	mari!.pet = shiba

Now, if we remove the variable references, we can deallocate memory for the instance:

	shiba = nil // Prints Deallocating: Shibi
	mari = nil // Deallocating: Mari

###Unowned References
Another solution to strong reference cycles is using unowned references. Unlike weak references, unowned references are not allowed to take on the value nil, hence all weak references are non-optional. For example, if we were to impose the rule that all pets must have an owner:

	class Animal {
		let name: String
		unowned let owner: Owner // An animal must have an owner

		init (name: String, owner: Owner) {
			println("Initializing: \(name)")
			self.name = name
			self.owner = owner
		}

		deinit {
			println("Deallocating: \(self.name)")
		}
	}

	class Owner {
		let name: String
		var pet: Animal? // An owner may or may not have a pet

		init (name: String) {
			println("Initializing: \(name)")
			self.name = name
		}

		deinit {
			println("Deallocating: \(self.name)")
		}
	}

Now, we can do:

	var mari: Owner?
	mari = Owner(name: "Mari")
	mari!.pet = Animal(name: "Shibi", owner: mari!)

And if we remove the reference from the variable mari, we also deallocate the Owner Instance as well as the Animal Instance:

	mari = nil // Prints Deallocating: Mari, Deallocating: Shibi
