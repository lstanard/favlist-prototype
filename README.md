# FavList App Prototype

## Requirements

| Prerequisite    | How to check    | How to install
| --------------- | ------------    | ------------- |
| Node.js         | `node -v`       | [nodejs.org](http://nodejs.org/) |
| npm             | `npm -v`        | Comes packaged with Node.js |

## Features

* WebPack build system
* Mocha testing

## Commands

* `npm start` = start application
* `npm test` = run mocha tests

## Application notes

### Models

* User
	* user.hasMany(list)
* List
	* list.belongsTo(user)
	* list.hasMany(listItem)
* ListItem
	* listItem.belongsTo(list)

### Resources

* Create new user = `POST /users`
* User login = `POST /users/login`
* User logout = `DELETE /users/login`

## TODO

* Add listItem model and associations
* Set up Mocha testing (https://www.distelli.com/docs/tutorials/automated-mocha-tests-for-node)
* Finish user model, authentication
* Abstract keys in user model methods
* Fix sequelize-fixtures test data issue (in db.js)