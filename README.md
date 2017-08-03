# DolliDB

## Overview

DolliDB was inspired by Reddit's Thing DB. In DolliDB there are Items and there is Data. Each Item has Data associated with it. For example, say you want to store a list of Users and their details. There would be a User Item table  which would have an ID and any fields that would be indexable. There would be a User Data Table that references the User Item ID. The Data table would be contain arbitray data that is linked to the User item by its ID. Each row in the data table has an ItemID, Path, and Value.

Under the hood DolliDB coverts objects to paths. This allows for easy writing and updating of deeply nested, artibtraily named objects.

Here's an example of how DolliDB would convert an object to paths:
```js
  const userData = {
    address: {
      street: '1 Sansome',
      state: 'CA',
      city: 'San Francisco',
    },
    name: 'Chester',
  }
```
Say we created a User Item with the ID as 1. We want to add Data associated with this Item. The above object would be converted to the following and each primative field would be saved as its own row in Dynamo with 3 fields, ItemID, Path, and Value:



| ItemID | Path | Value |
| ------ | ---- | ----- |
| 1 | address.street | 1 Sansome |
| 1 | address.state | CA |
| 1 | address.city | San Francisco |
| 1 | name | Chester |


