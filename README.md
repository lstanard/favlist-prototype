# FavList App Prototype

## Requirements

| Prerequisite    | How to check    | How to install
| --------------- | ------------    | ------------- |
| Node.js         | `node -v`       | [nodejs.org](http://nodejs.org/) |
| npm             | `npm -v`        | Comes packaged with Node.js |

## Features

* WebPack build system
* Mocha node application testing

## Commands

* `npm start` = start application
* `npm test` = run mocha tests

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

* Set up Mocha testing (https://www.distelli.com/docs/tutorials/automated-mocha-tests-for-node)
* Finish user model, authentication
* Abstract keys in user model methods