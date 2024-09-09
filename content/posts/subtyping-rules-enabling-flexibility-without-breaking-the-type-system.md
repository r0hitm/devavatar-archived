---
title: "Subtyping Rules: Enabling Flexibility without Breaking the Type System"
description: Subtyping is a fundamental concept in static typing that provides flexibility and polymorphism while ensuring soundness in the type system. In any language, subtyping must not break the type system and make it unsound. Therefore, there are certain rules that enables subtyping, namely, width-subtyping, permutation-subtyping, transitiviy-subtyping, and reflexivity.
pubDatetime: 2023-05-14T00:00:00.000Z
modDatetime: 2024-03-25T04:26:28.200Z
tags:
  - programming
---

Subtyping is a fundamental concept in statically typed programming languages. It refers to the ability of a type to be used in place of another type. That is, if `t1` is a subtype of `t2` then `t1` must be usable in every way `t2` is. This is called **Principle of Substitutability**. It is a fundamental concept that provides flexibility in statically typed programming languages, and it is used to achieve polymorphism.

## Table of Contents

## Subtyping Rules

In any language, subtyping must not break the type system and make it unsound. Therefore, there are certain (and I would add objective) rules that enables subtyping without breaking the soundness.

1. **"Width" Subtyping**: A supertype can have a subset of fields with the same types, i.e., a subtype can have “extra” fields. For example, a Rectangle class can be a subtype of a Shape class, where Shape has only a width and a height field, but Rectangle has an additional field for the color.

2. **"Permutation" Subtyping**: The subtype has the same set of fields as the supertype, but in a different order.

3. **Transitivity**: If `t1` is a subtype of `t2` and `t2` is a subtype of `t3` then `t1` is also a subtype of `t3`. For example, if a Dog class is a subtype of an Animal class and an Animal class is a subtype of a LivingBeing class, then the Dog class is also a subtype of the LivingBeing class.

4. **Reflexivity**: Every type is a subtype of itself.

There is also a 5th rule called _"Width" Subtyping,_ where a type has nested fields and another type is considered a subtype if the nested field is also a subtype of the supertype. For example, a supertype Person class can have a nested field called Address, and a subtype Employee can have a nested field called WorkAddress. Employee is considered a subtype of Person if WorkAddress is a subtype of Address.

However, if the programming language has mutations, rule 5 makes it unsound and is therefore, usually not allowed in languages with mutations.

## Conclusion

In conclusion, subtyping is a fundamental concept in statically typed programming languages that provides flexibility and polymorphism while ensuring soundness in the type system. The rules of subtyping, including "width" subtyping, permutation subtyping, transitivity, and reflexivity, enable subtypes to be used in place of supertypes while maintaining type safety.
