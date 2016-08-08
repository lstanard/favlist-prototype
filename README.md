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

* `npm start` = start application

## Build

* `npm run build`

## Watch

* `npm run dev`

## Application notes

### Resources

| Resource	      | Method    		| Endpoint
| --------------- | ------------    | ------------- |
| Get all lists   | GET       		| /lists        |
| Get list     	  | GET       		| /lists/:id    |
| Create list     | POST       		| /lists	    |
| Delete list     | DELETE       	| /lists/:id	|
| Update list     | PUT       	    | /lists/:id	|
| Create user     | POST       		| /users	    |

#### Models

* User
	* user.hasMany(list)
* List
	* list.belongsTo(user)
	* list.hasMany(listItem)
* ListItem
	* listItem.belongsTo(list)

## Misc

* li.st
* REX - share recommendations