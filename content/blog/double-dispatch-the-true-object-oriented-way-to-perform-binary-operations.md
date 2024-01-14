---
title: "Double Dispatch: The True Object-Oriented Way to Perform Binary Operations"
date: 2023-05-07
tags: 
  - programming blog
  - object oriented programming
  - visitor pattern
---

In object-oriented programming (OOP), binary operations involve performing operations on two objects of different classes. Suppose we have two classes and there is some method, say `add`, that can add two objects of the same class. Now, suppose we want to extend the `add` class such that these two classes can be added together. However, passing the second class to `add` will not work correctly and might have different properties that `add` didn't account for. So how do we do this?

Trivial way of doing this would be to use methods (such as `is_a?` in ruby) to determine the class of the argument and do the appropriate action. But doing so would be cheating as then it will not be OOP but rather functional style. Why? Because being OOP, objects should "know how to perform the required operation on themselves with another value". In other words, the responsibility of performing an operation should lie with the object itself, rather than being determined by external conditions. This is where double dispatch comes in, allowing objects to interact with each other in a truly object-oriented way.

## What is Double-Dispatch?

It is a mechanism that dispatches a method call to different concrete method based on the runtime types of two objects involved in the call.

**Basic Idea** is that receiver class does not know (or cannot ask for it, because that won't be OOP) the class of the argument, but receiver knows its class. Therefore, it can pass itself to the appropriate method of the argument class that knows how to deal with it.

To understand this better, consider this simple example in Ruby:

```rb
class MyNumber
  attr_reader :num
  
  def initialize(num)
    @num = num
  end
  
  # double dispatch
  def add(other)
    other.add_number(self)
  end
  
  # other is a number, so do a numeric addition
  def add_number(other)
    MyNumber.new(num + other.num)
  end
  
  # MyNumber is being added to MyString
  def add_string(other)
    MyString.new(other.str + num.to_s)
  end
  
  def print
	puts num
  end
end

class MyString
  attr_reader :str
  
  def initialize(str)
    @str = str
  end
  
  # double dispatch
  def add(other)
    other.add_string(self)
  end
  
  # case: MyString + MyNumber
  def add_number(other)
    MyString.new(other.num.to_s + str)
  end
  
  # case: MyString + MyString
  def add_string(other)
    MyString.new(str + other.str)
  end
  
  def print
	puts str
  end
end

# helper function
def add_values(a, b)
  result = a.add(b)
  result.print
end

number = MyNumber.new(123)
string = MyString.new("abc")

add_values(number, string)  # "123abc"
add_values(string, number)  # "abc123"
add_values(string, string)  # "abcabc"
add_values(number, number)  # 246
```

Here, we have two classes: `MyNumber` and `MyString`. Each class defines an `add` method that takes another object as an argument and dispatches the method call based on the runtime types of both objects.

When adding a `MyNumber` and a `MyString`, the `add` method of the `MyNumber` class is called, which in turn calls the `add_string` method of the `MyString` class. This method converts the `MyNumber` object to a string and concatenates it with the `MyString` object, resulting in a new `MyString` object that represents the concatenated string.

Similarly, when adding a `MyString` and a `MyNumber`, the `add` method of the `MyString` class is called, which in turn calls the `add_number` method of the `MyNumber` class. This method converts the `MyNumber` object to a string and concatenates it with the `MyString` object, resulting in a new `MyString` object that represents the concatenated string.

Finally, when adding two `MyString` objects, the `add` method of the `MyString` class is called, which in turn calls the `add_string` method of the other `MyString` object. This method concatenates the two strings and returns a new `MyString` object that represents the concatenated string.

Double dispatch, however, has a minor *drawback* that each class requires a corresponding method to handle all other classes, or else it may result in runtime errors when calling a method on an argument class that is not defined. In the example provided, both classes had two appropriate methods to handle being added to themselves and with each other, resulting in a total of 2x2 = 4 cases. Generally, if there are N classes that define M operations and can interact with each other, then each class must define M methods to account for resulting NxM binary operations.

It's worth noting that *double dispatch is not needed* in languages that support multimethod. Multimethod allow you to define a method implementation based on the runtime types of all the arguments, not just the receiver. This eliminates the need for double dispatch. We're not diving into multimethod in this post, but it's a cool feature that deserved a mention.

In conclusion, double dispatch is a powerful mechanism in OOP that allows for safe and elegant binary operations in a true OOP way.

![](https://media.tenor.com/FuUKld1JLYMAAAAC/oop-object-oriented-programming.gif align="center")