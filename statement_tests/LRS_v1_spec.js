/**
 * LRS_Validator
 * https://github.com/MonkoftheFunk/LRS_Validator
 */
var frisby = require('../lib/frisby');
var API_DOMAIN = "localhost"
var API_VER = "1.0"

//todo create something queryiable all statements share for quick removal after test
//todo should I just void or implement delete

//initialy create all statements types and describe their unique traits
var guid1 = "1";
var stmt1 = "1";
var guid2 = "2";
var ssguid2 = "2a"; //test get substatement using 
var stmt2 = "2"
var guid3 = "3";

var guid4, guid5, guid6, guid7;
var stmt4 = "4";
var stmt5 = "5";
var stmt6 = "6";
var stmt7 = "7";

var err_stmt1 = "e1";
var stmt8 = "8"; //share same verb for easy query
var stmt9 = "9"; //share same verb

var void_guid1;
var voided_guid1;
var void_stmt1 = ""; //contains ref to voided_guid1
var voided_stmt1 = "";

/* PUT */

frisby.create('PUT - Valid Statement w/ id')
  .put(API_DOMAIN+'?statementId='+guid1,
	{stmt1})
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();

frisby.create('PUT - Valid Statement w/ Valid Substatement')
  .put(API_DOMAIN+'?statementId='+guid2,
	{stmt2})
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();

frisby.create('PUT - Id no Statement')
  .put(API_DOMAIN+'?statementId='+guid3)
    .expectStatus(400)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();

frisby.create('PUT - Valid same statement and id as existing no conflict')
  .put(API_DOMAIN+'?statementId='+guid1,
	{stmt1})
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
	
frisby.create('PUT - Valid different satements same id confilict')
  .put(API_DOMAIN+'?statementId='+guid1,
	{stmt2})
    .expectStatus(409)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();

/* POST */

frisby.create('POST - No Statement')
  .post(API_DOMAIN)
    .expectStatus(400)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
	
frisby.create('POST - Valid statement and return id in array')
  .post(API_DOMAIN,
	{stmt4})
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength("?",1)
	.expectJSONTypes('?', Array)
	.afterJSON(function(ids) {
		guid4 = ids[0];
	})
	.toss();

frisby.create('POST - Valid multiple statements return id in array')
  .post(API_DOMAIN,
	{[stmt5,stmt6,stmt7]})
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength("?",3)
	.expectJSONTypes('?', Array)
	.afterJSON(function(ids) {
		guid5 = ids[0];
		guid6 = ids[1];
		guid5 = ids[2];
	})
	.toss();

//get query stmt8 & stmt9 to confirm didn't save 	
frisby.create("POST - Invalid statement in mulitiple don't save all")
  .post(API_DOMAIN,
	{[stmt8,err_stmt1,stmt9]})
    .expectStatus(400)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength("*",0)
	.toss();

//get query voided_guid1 to confirm void
frisby.create('PUT - Statement to be Voided')
  .put(API_DOMAIN+'?statementId='+voided_guid1,
	{voided_stmt1})
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.afterJSON(function(ids) {		
		frisby.create('POST - Void statment')
		  .post(API_DOMAIN,
			{void_stmt1})
			.expectStatus(200)
			.expectHeaderContains("X-Experience-API-Version", API_VER)
			.expectJSONLength("?",1)
			.expectJSONTypes('?', Array)
			.afterJSON(function(ids) {
				void_guid1 = ids[0];
			})
			.toss();
	})
	.toss();
	
/* GET */

//get query stmt8 & stmt9 to confirm didn't save 	
//get query voided_guid1 to confirm void

// single query id confirm id returned and content-length same 200
// no params return all with default limit of 10 (statement count will be less)
// no params return all with default limit of 10 (statement count will be more)
// single query id no existing id found 404
// single query all fields returned accuratly 204 (many)
// single query void by voidedSatementId 204
// single query void by statementId 404

/* GET Complex query */