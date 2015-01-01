---
layout: post
title:  "Swift Classes & Structs"
date:   2015-1-1 20:57:00
categories: coding
tags: swift classes structs
image: /assets/images/cover.jpg
---
#Swift Classes & Structs
At first glance, classes and structs seem very similar in Swift. Let's take a look at the two:

	class Animal {
		var name = ""

		init (name: String) {
			self.name = name
		}
	}

	struct Person {
		var name = ""

		init (name: String) {
			self.name = name
		}
	}

	var shiba = Animal(name: "Mizu")
	var person = Person(name: "Mari")
	println(shiba.name) // Prints "Mizu"
	println(person.name) // Prints "Mari"

Structs and classes are both syntactically similar. You initialize both the same way, and you can access both of their properties using dot notation. However, if you dig deeper, there are actually key differences between the two.

###Memberwise Initializers
Unlike classes, structs have **memberwise initializers** that allow you to set the value of member variables. For example, instead of explicitly defining an init method for a struct, we can write:

	struct Car {
		var color: String
		var make: String
		var model: String
	}

	var myCar = Car(color: "silver", make: "Lexus", model: "CT 200h")

###Structs are Value Types
Meaning structs are copied (aka they are **pass-by-value**) when they are assigned to a variable, a constant, or passed through a function:

	var myCar = Car(color: "silver", make: "Lexus", model: "CT 200h")
	var hisCar = myCar
	hisCar.color = "black"
	println(myCar.color) // Prints "silver"
	println(hisCar.color) // Prints "black"

This sounds inefficient especially for Arrays, but Swift is actually smart enough to not copy value types until either one is actually changed. For example, for arrays:

	var a = [1, 2, 3, 4, 5]
	var b = a // Copying hasn't occured yet
	b.append(6) // Copying occurs

If you want to change the instance of the struct itself without making another copy within a function, you can declare the parameter to be **inout**:

	var myCar = Car(color: "silver", make: "Lexus", model: "CT 200h")

	func changeCarColor(inout car: Car, color: String) {
		car.color = color
	}

	changeCarColor(&myCar, "black") // You must use the & since the parameter is inout
	println(myCar.color) // Prints "black"


###Classes are Reference Types
On the other hand, classes are reference types, therefore they are **pass-by-reference**. This means that other variables, constants and functions point to the actual instance instead of copying it:

	var foo = Animal(name: "Foo")
	var bar = foo
	bar.name = "Bar"
	println(foo.name) // Prints "Bar"

###Equality Operator
Unlike structs, classes have an equality operator **===** that checks if variables or constants reference (or point to) the same instance:

	var shiba = Animal(name: "Mizu")
	var anotherShiba = Animal(name: "Mizu")
	var pointer1 = shiba
	println(shiba === anotherShiba) // Prints "false"
	println(pointer1 === shiba) // Prints "true"
