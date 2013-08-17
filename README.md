Tin Can/xAPI LRS validator with REST test cases from ADL's LRS, useful for those who plan on building their own LRS 

Uses [Frisby.js](http://frisbyjs.com/)

## Running Tests

Frisby is built on top of the jasmine BDD spec framework, and uses the excellent [jasmine-node test runner](https://github.com/mhevery/jasmine-node) to run spec tests in a specified target directory.  

## Installation

Install Frisby from NPM:

    npm install frisby
	
### File naming conventions

Files must end with `spec.js` to run with jasmine-node.

Suggested file naming is to append the filename with `_spec`, like `mytests_spec.js` and `moretests_spec.js`

### Install jasmine-node

    npm install -g jasmine-node

### Run it from the CLI

    cd your/project
    jasmine-node .
