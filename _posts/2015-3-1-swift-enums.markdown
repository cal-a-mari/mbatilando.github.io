---
layout: post
title:  "Swift Enums"
date:   2015-3-1 20:57:00
categories: coding
tags: ios coding
image: /assets/images/cover.jpg
---
#Swift Enums
You use enums to create a common type for a group of related values:

```
enum Dogs {
	case Shiba, Corgi, Labrador, Poodle
}

var myDog = Dogs.Shiba
println(myDog) // Enum value
```

### Raw Values
Enums can hold different types of raw values (Int, String, Char, Floating Point) and can be initialized to a certain value:

```
enum Rating: Int {
  case Horrible = 1
  case Mediocre
  case Okay
  case Good
  case Epic

  init () {
    self = .Okay
  }
}

var rating = Rating()
println(rating.rawValue) // 3
```

### Associated Values
You can also associate values to enums using associated values. This is especially useful if your application needs to access these values at some point in time.

```
enum Currency {
	case Dollars(Double)
	case Yen(Double, Double)
}

let dollars = Currency.Dollars(10.0)
let yen = Currency.Yen(10000, 0.0084)
switch yen {
	case .Dollars(let cash):
		println("I have \(cash) dollars.")
	case .Yen(let cash, let conversionRate):
		println("I have \(conversionRate * cash) dollars") // Prints I have 84 dollars
}
```
