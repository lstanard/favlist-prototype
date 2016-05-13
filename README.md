# FavList App Prototype

## Requirements

| Prerequisite    | How to check    | How to install
| --------------- | ------------    | ------------- |
| Node.js         | `node -v`       | [nodejs.org](http://nodejs.org/) |
| npm             | `npm -v`        | Comes packaged with Node.js |

## Features

* WebPack build system
* Mocha node application testing

## Application notes

### Models

* User [email, name, salt, password_hash, password]
	* user.hasMany(list)
* List [name, list_type, description]
	* list.belongsTo(user)
	* list.hasMany(listItem)
* ListItem [notes]
	* listItem.belongsTo(list)

## TODO

* Organize routes with express.Router() (https://www.terlici.com/2014/09/29/express-router.html)