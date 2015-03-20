---
layout: post
title:  "Lazy Initialization in Swift"
date:   2015-3-20 20:57:00
categories: coding
tags: ios coding
image: /assets/images/cover.jpg
---
#Lazy Initialization in Swift
One neat feature in Swift is its lazy instantiation using its ***lazy*** keyword. This feature can actually become really useful in iOS programming mainly because of how much memory it can save you while users are using your application. You obviously don't want your app to reserve space for unneeded memory since the more memory an app. takes up in the background, the more likely it is to get killed by the OS.


You can use this feature by simply declaring a property as ***lazy*** and using a closure:

```
lazy var magicalNumber: Int = {
    // stuff that only gets computed when program asks for it    
}()
```

Another way you can do it is by using an instance method:

```
lazy var magicalNumber: Int = self.computationallyIntensiveMathHackz()
func computationallyIntensiveMathHackz() -> Int {
    // Do crazy hard math stuff
    magicNumber = computePI()
    return magicNumber
}
```

You can also use a class method:

```
class MyClass {
    lazy var magicalNumber: MyClass.computationallyIntensiveMathHackz()
    class func computationallyIntensiveMathHackz() {
        // Do crazy hard math stuff
        magicNumber = computePI()
        return magicNumber
    }
}
```

Here's an example of how lazy properties work:

```
class Dog {
    var name: String
    lazy var bark: String = {
        return "Bark, bark! My name is \(self.name)"
    }()
    
    init(name: String) {
        self.name = name
    }
}

let mizu = Dog(name: "Mizu")
mizu.bark // "Bark, bark! My name is Mizu"
```