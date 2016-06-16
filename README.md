# FavList App Prototype

## Requirements

| Prerequisite    | How to check    | How to install
| --------------- | ------------    | ------------- |
| Node.js         | `node -v`       | [nodejs.org](http://nodejs.org/) |
| npm             | `npm -v`        | Comes packaged with Node.js |
| Webpack		  | `webpack -v`	| npm install -g webpack |

## Installation

1. `npm install`

## Commands

Run on node.js version 5. `nvm use 5`

* `npm start` = start application

## Build

* `webpack --watch` = run webpack and watch for changes

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

### Deployment to Heroku

## TODO

* When a list is deleted all associated list items should be deleted too
* Finish user model, authentication
* Abstract keys in user model methods
* Fix sequelize-fixtures test data issue (in db.js)