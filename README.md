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

    cd github.com/LRS_Validator
    jasmine-node statement_tests
	
	optional
	--config CLEAN false
	--config DOMAIN http://localhost:8080

## Overview of tests to perform (so far)
    /* from: https://github.com/adlnet/ADL_LRS/blob/master/lrs/tests/StatementsTests.py */
    //11 pregen valid statements 

### PUT
    // header format test
    // add a variety of statement types and check they cleared 204
    // add statement with substatement 204 (use statement and sub statement for GET Test)
    // invalid no statement in put w/ id 400
    // valid satement no put id 400
    // valid different satements same id confilict 409
    // valid same statement and id as existing no conflict 204

### POST
    // header format test
    // invalid fields as 400 (many)
    // valid statement 200 and return id (use same statment for GET Tests)
    // invalid not array field types 400 (many)
    // invalid time types 400
    // invalid ref id to non found statment 404
    // valid multiple statements 200 and return ids (use same statment for GET Tests)
    // valid statement & id as if PUT 204
    // valid statment with group actor 200 return id
    // invalid statement in mulitiple don't save all 400 (requires GET to confirm not saved)
    // void statment (GET confirm voided)
    // mutlipart attachment test (todo)

### GET
    // single query id confirm id returned and content-length same 200
    // no params return all with default limit of 10 (statement count will be less)
	// no params return all with default limit of 10 (statement count will be more)
    // single query id no existing id found 404
    // single query all fields returned accuratly 204 (many)
    // single query void by voidedSatementId 204
    // single query void by statementId 404

### GET Complex query
    /* https://github.com/adlnet/ADL_LRS/blob/master/lrs/tests/StatementFilterTests.py */
	// limit below total return limit count statements 200
	// filter by verb id
	// filter by agent "id" related_agent check if in both statment and substatement (anywhere the agent can be)
	// filter agent "id" in group
	// filter since and until
	// filter agent "id" related_agent until
	// filter registration id and verb
	// filter activity
	// filter activity related
	// filter with format(s)
	// filter attachments

### TODO
    // Re-Run above with request type in query string
    // Auth tests with permissions of POST/PUT/GET
