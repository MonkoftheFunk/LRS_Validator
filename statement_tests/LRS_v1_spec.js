/**
 * LRS_Validator
 * https://github.com/MonkoftheFunk/LRS_Validator
 * jasmine-node statement_tests/ --c onfig DOMAIN localhost
 */
 
var frisby = require('../frisby/lib/frisby');
var API_DOMAIN = (process.env.DOMAIN)?process.env.DOMAIN:"localhost";
var API_VER = "1.0"

//todo create something queryiable all statements share for quick removal after test
//todo should I just void or implement delete

//initialy create all statements types and describe their unique traits
var guid1 = "1";
var stmt1 = {
    "actor": {
        "objectType": "Agent",
        "mbox": "mailto:learner@example.adlnet.gov"
    },
    "verb" : {
        "id": "http://adlnet.gov/expapi/verbs/experienced",
        "display": {
            "en-US": "experienced"
        }
    },
    "object": {
        "id": "http://adlnet.gov/xapi/",
        "definition": {
            "type": "http://adlnet.gov/expapi/activities/link"
        }
    }
};
var guid2 = "2";
var ssguid2 = "2a"; //test get substatement using 
var stmt2 = {
    "actor": {
        "objectType": "Agent",
        "mbox": "mailto:learner@example.adlnet.gov"
    },
    "verb" : {
        "id": "http://adlnet.gov/expapi/verbs/experienced",
        "display": {
            "en-US": "experienced"
        }
    },
    "object": {
        "id": "http://adlnet.gov/xapi/",
        "definition": {
            "type": "http://adlnet.gov/expapi/activities/link"
        }
    }
};
//substatement of 2 to verify against
var stmt2a = {
    "actor": {
        "objectType": "Agent",
        "mbox": "mailto:learner@example.adlnet.gov"
    },
    "verb" : {
        "id": "http://adlnet.gov/expapi/verbs/experienced",
        "display": {
            "en-US": "experienced"
        }
    },
    "object": {
        "id": "http://adlnet.gov/xapi/",
        "definition": {
            "type": "http://adlnet.gov/expapi/activities/link"
        }
    }
};
var guid3 = "3";

var guid4, guid5, guid6, guid7;
var stmt4 = {
    "actor": {
        "objectType": "Agent",
        "mbox": "mailto:learner@example.adlnet.gov"
    },
    "verb" : {
        "id": "http://adlnet.gov/expapi/verbs/experienced",
        "display": {
            "en-US": "experienced"
        }
    },
    "object": {
        "id": "http://adlnet.gov/xapi/",
        "definition": {
            "type": "http://adlnet.gov/expapi/activities/link"
        }
    }
};
var stmt5 = {
    "actor": {
        "objectType": "Agent",
        "mbox": "mailto:learner@example.adlnet.gov"
    },
    "verb" : {
        "id": "http://adlnet.gov/expapi/verbs/experienced",
        "display": {
            "en-US": "experienced"
        }
    },
    "object": {
        "id": "http://adlnet.gov/xapi/",
        "definition": {
            "type": "http://adlnet.gov/expapi/activities/link"
        }
    }
};
var stmt6 = {
    "actor": {
        "objectType": "Agent",
        "mbox": "mailto:learner@example.adlnet.gov"
    },
    "verb" : {
        "id": "http://adlnet.gov/expapi/verbs/experienced",
        "display": {
            "en-US": "experienced"
        }
    },
    "object": {
        "id": "http://adlnet.gov/xapi/",
        "definition": {
            "type": "http://adlnet.gov/expapi/activities/link"
        }
    }
};
var stmt7 = {
    "actor": {
        "objectType": "Agent",
        "mbox": "mailto:learner@example.adlnet.gov"
    },
    "verb" : {
        "id": "http://adlnet.gov/expapi/verbs/experienced",
        "display": {
            "en-US": "experienced"
        }
    },
    "object": {
        "id": "http://adlnet.gov/xapi/",
        "definition": {
            "type": "http://adlnet.gov/expapi/activities/link"
        }
    }
};

var err_stmt1 = {
    "actor": {
        "objectType": "Agent",
        "mbox": "mailto:learner@example.adlnet.gov"
    },
    "verb" : {
        "id": "http://adlnet.gov/expapi/verbs/experienced",
        "display": {
            "en-US": "experienced"
        }
    },
    "object": {
        "id": "http://adlnet.gov/xapi/",
        "definition": {
            "type": "http://adlnet.gov/expapi/activities/link"
        }
    }
};

var guid8="8";
var stmt8 = {
    "actor": {
        "objectType": "Agent",
        "mbox": "mailto:learner@example.adlnet.gov"
    },
    "verb" : {
        "id": "http://adlnet.gov/expapi/verbs/experienced",
        "display": {
            "en-US": "experienced"
        }
    },
    "object": {
        "id": "http://adlnet.gov/xapi/",
        "definition": {
            "type": "http://adlnet.gov/expapi/activities/link"
        }
    }
}; //share same verb for easy query
var stmt9 = {
    "actor": {
        "objectType": "Agent",
        "mbox": "mailto:learner@example.adlnet.gov"
    },
    "verb" : {
        "id": "http://adlnet.gov/expapi/verbs/experienced",
        "display": {
            "en-US": "experienced"
        }
    },
    "object": {
        "id": "http://adlnet.gov/xapi/",
        "definition": {
            "type": "http://adlnet.gov/expapi/activities/link"
        }
    }
}; //share same verb

var guid10="10";
var stmt10 = {
    "actor": {
        "objectType": "Agent",
        "mbox": "mailto:learner@example.adlnet.gov"
    },
    "verb" : {
        "id": "http://adlnet.gov/expapi/verbs/experienced",
        "display": {
            "en-US": "experienced"
        }
    },
    "object": {
        "id": "http://adlnet.gov/xapi/",
        "definition": {
            "type": "http://adlnet.gov/expapi/activities/link"
        }
    }
};

var void_guid1;
var voided_guid1 = "v1";
var void_stmt1 = {
    "actor" : {
        "objectType": "Agent",
        "name" : "Example Admin",
        "mbox" : "mailto:admin@example.adlnet.gov"
    },
    "verb" : {
        "id":"http://adlnet.gov/expapi/verbs/voided",
        "display":{
            "en-US":"voided"
        }
    },
    "object" : {
        "objectType":"StatementRef",
        "id" : "e05aa883-acaf-40ad-bf54-02c8ce485fb0"
    }
}; //contains ref to voided_guid1
var voided_stmt1 = {
    "actor": {
        "objectType": "Agent",
        "mbox": "mailto:learner@example.adlnet.gov"
    },
    "verb" : {
        "id": "http://adlnet.gov/expapi/verbs/experienced",
        "display": {
            "en-US": "experienced"
        }
    },
    "object": {
        "id": "http://adlnet.gov/xapi/",
        "definition": {
            "type": "http://adlnet.gov/expapi/activities/link"
        }
    }
};

/* PUT */

frisby.create('PUT - Valid Statement w/ id')
  .put(API_DOMAIN+'?statementId='+guid1,
	stmt1)
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();

frisby.create('PUT - Valid Statement w/ Valid Substatement')
  .put(API_DOMAIN+'?statementId='+guid2,
	stmt2)
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
	stmt1)
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
	
frisby.create('PUT - Valid different satements same id confilict')
  .put(API_DOMAIN+'?statementId='+guid1,
	stmt2)
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
	stmt4)
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength("?",1)
	.expectJSONTypes('?', Array)
	.afterJSON(function(ids) {
		guid4 = ids[0];
	})
	.toss();

var multi = [stmt5,stmt6,stmt7];
frisby.create('POST - Valid multiple statements return id in array')
  .post(API_DOMAIN,
	multi,{"json":true})
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength("?",3)
	.expectJSONTypes('?', Array)
	.afterJSON(function(ids) {
		guid5 = ids[0];
		guid6 = ids[1];
		guid7 = ids[2];
	})
	.toss();

frisby.create('POST - Valid Statement w/ id')
  .post(API_DOMAIN+'?statementId='+guid10,
	stmt10)
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
	
//get query stmt8 & stmt9 to confirm didn't save 	
var multi = [stmt8,err_stmt1,stmt9];
frisby.create("POST - Invalid statement in mulitiple don't save all")
  .post(API_DOMAIN,
	multi,{"json":true})
    .expectStatus(400)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength("*",0)
	.toss();

//get query voided_guid1 to confirm void
frisby.create('PUT - Statement to be Voided')
  .put(API_DOMAIN+'?statementId='+voided_guid1,
	voided_stmt1)
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.afterJSON(function(ids) {		
		frisby.create('POST - Void statment')
		  .post(API_DOMAIN,
			void_stmt1)
			.expectStatus(200)
			.expectHeaderContains("X-Experience-API-Version", API_VER)
			.expectJSONLength("?",1)
			.expectJSONTypes('?', Array)
			.toss();
	})
	.toss();
	
/* GET */

//get query stmt8 & stmt9 to confirm didn't save
frisby.create("GET - Statement that shouldn't have been saved")
  .get(API_DOMAIN+'?statementId='+guid8)
    .expectStatus(404)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
	
//get query voided_guid1 to confirm void
frisby.create("GET - Voided Statement by statementId")
  .get(API_DOMAIN+'?statementId='+voided_guid1)
    .expectStatus(404)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
	
frisby.create("GET - Voided Statement by statementId")
  .get(API_DOMAIN+'?statementId='+voided_guid1)
    .expectStatus(404)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
	
frisby.create("GET - Voided Statement by voidedStatementId")
  .get(API_DOMAIN+'?voidedSatementId='+voided_guid1)
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSON(voided_stmt1)
	.toss();

frisby.create("GET - Existing Statement by PUT statementId")
  .get(API_DOMAIN+'?statementId='+guid1)
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSON(stmt1)
	.toss();

frisby.create("GET - Existing Statement by POST statementId")
  .get(API_DOMAIN+'?statementId='+guid5)
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSON(stmt5)
	.toss();	

frisby.create("GET - Existing Sub Statement")
  .get(API_DOMAIN+'?statementId='+ssguid2)
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSON(stmt2a)
	.toss();
	
// single query all fields returned accuratly 204 (many)

/* GET Complex query */
// no params return all with default limit of 10 (statement count will be less)
// no params return all with default limit of 10 (statement count will be more)
