---
layout: post
title:  "Type Casting in Swift"
date:   2015-1-10 20:57:00
categories: coding
tags: swift type casting
image: /assets/images/cover.jpg
---
#Type Casting in Swift
In short, type casting is just a way to check if an instance is a member of a certain class hierarchy. You can also use it to treat an instance as another class within its hierarchy.

Let's define a sample class hierarchy to show how type casting works:

	class Animal {
		var name = ""

		init (name: String) {
			self.name = name
		}
	}

	class Dog: Animal {
		var owner = ""

		init (name: String, owner: String) {
			self.owner = owner
			super.init(name: name)
		}
	}

	class Shark: Animal {
		var prey = ""

		init (name: String, prey: String) {
			self.prey = prey
			super.init(name: name)
		}
	}

We've defined classes **Dog** and **Shark** to be subclasses of **Animal**. Instances of Dog have a property called owner, while instances of Shark have a property called prey. Since they belong to the same superclass, we can put both instances of Dog and Shark into the same array:

	let kisu = Dog(name: "Kisu", owner: "Mari")
	let mizu = Dog(name: "Mizu", owner: "Paulina")
	let moomoo = Dog(name: "Moomoo", owner: "Carina")
	let shark = Shark(name: "Bob", prey: "humans")
	let animals = [kisu, mizu, moomoo, shark]

Swift is actually smart enough to infer that the *animals* array is of type **[Animal]** since all items in it are instances of Dog and Shark which have the same superclass. We could have also done this to be more explicit:

	let animals:[Animal] = [kisu, mizu, moomoo, shark]

###***is*** Operator
If we wanted to iterate through our *animals* array and get a count of each instance, we'd have to check whether the instance we're currently on is either an instance of type Dog or Shark. To do this, we use the ***is*** operator:

	var animalCount = 0,
			sharkCount = 0;

	for animal in animals {
		if animal is Dog {
			++animalCount
		}
		if animal is Shark {
			++sharkCount
		}
	}

###Downcasting
Now let's say we wanted to print the corresponding property depending on the instance we're currently on. So if the element we're currently on is of type Dog then we'd want to print its *name* and its *owner* property. If we're currently on an instance of a Shark then we'd want to print its *prey*.

To do this, we'll use the ***as*** operator to ***downcast*** each element. Downcasting is essentially an attempt to treat an instance as an instance of one of its subclass. Since Swift treats the elements in our animal array as type Animal, we'll have to determine whether the element is actually a Dog or a Shark. Note that downcasting can fail so we use the ***as?*** operator as an optional operator that returns nil if it fails.

	for animal in animals {
		if let dog = animal as? Dog {
			println("\(dog.name) is owned by \(dog.owner)")
		}
		else if let shark = animal as? Shark {
			println("It's a shark")
		}
	}
