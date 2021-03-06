/**
 * LRS_Validator
 * https://github.com/MonkoftheFunk/LRS_Validator
 * jasmine-node statement_tests/ --c onfig DOMAIN localhost
 */
 
var frisby = require('../frisby/lib/frisby');
var API_DOMAIN = (process.env.DOMAIN)?process.env.DOMAIN:"http://localhost:8080";
var API_VER = "1.0"
var CLEAN = (process.env.CLEAN!="false")

console.log("Clean: "+CLEAN+" - API Domain: "+API_DOMAIN);
//todo create something queryiable all statements share for quick removal after test
//todo should I just void or implement delete

//initialy create all statements types and describe their unique traits
//test_all_fields_activity_as_object
var guid1 = "1";
var stmt1 = {
	"actor": {
		"objectType": "Agent",
		"name": "Lou Wolford",
		"account": {
			"homePage": "http://example.com",
			"name": "uniqueName"
		}
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/created",
		"display": {
			"en-US": "created",
			"en-GB": "made"
		}
	},
	"object": {
		"objectType": "Activity",
		"id": "http:adlnet.gov/my/Activity/URL",
		"definition": {
			"name": {
				"en-US": "actName",
				"en-GB": "anotherActName"
			},
			"description": {
				"en-US": "This is my activity description.",
				"en-GB": "This is another activity description."
			},
			"type": "http://adlnet.gov/expapi/activities/cmi.interaction",
			"moreInfo": "http://some/activity/url",
			"interactionType": "choice",
			"correctResponsesPattern": ["golf",
			"tetris"],
			"choices": [{
				"id": "golf",
				"description": {
					"en-US": "Golf Example",
					"en-GB": "GOLF"
				}
			},
			{
				"id": "tetris",
				"description": {
					"en-US": "Tetris Example",
					"en-GB": "TETRIS"
				}
			},
			{
				"id": "facebook",
				"description": {
					"en-US": "Facebook App",
					"en-GB": "FACEBOOK"
				}
			},
			{
				"id": "scrabble",
				"description": {
					"en-US": "Scrabble Example",
					"en-GB": "SCRABBLE"
				}
			}],
			"extensions": {
				"ext:key1": "value1",
				"ext:key2": "value2",
				"ext:key3": "value3"
			}
		}
	},
	"result": {
		"score": {
			"scaled": 0.85,
			"raw": 85,
			"min": 0,
			"max": 100
		},
		"completion": true,
		"success": true,
		"response": "Well done",
		"duration": "P3Y6M4DT12H30M5S",
		"extensions": {
			"ext:resultKey1": "resultValue1",
			"ext:resultKey2": "resultValue2"
		}
	},
	"context": {
		"registration": "6",
		"contextActivities": {
			"other": [
				{"id": "http://example.adlnet.gov/tincan/example/test"}
			],
			"grouping": [
				{"id": "http://groupingID"}
			]
		},
		"revision": "Spelling error in choices.",
		"platform": "Platform is web browser.",
		"language": "en-US",
		"statement": {
			"objectType": "StatementRef",
			"id": "7"
		},
		"extensions": {
			"ext:contextKey1": "contextVal1",
			"ext:contextKey2": "contextVal2"
		}
	},
	"timestamp": "2013-04-01T12:00:00Z"
};

//test_all_fields_substatement_as_object
var guid2 = "2";
var ssguid2 = "2a"; //test get substatement using 
//substatement of 2 to verify against
var stmt2a = {
		"objectType": "SubStatement",
		"actor": {
			"objectType": "Agent",
			"name": "Tom Creighton",
			"mbox": "mailto:tom@adlnet.gov"
		},
		"verb": {
			"id": "http://adlnet.gov/expapi/verbs/assess",
			"display": {
				"en-US": "assessed",
				"en-GB": "Graded"
			}
		},
		"object": {
			"id": "http://example.adlnet.gov/tincan/example/simplestatement",
			"definition": {
				"name": {
					"en-US": "SubStatementname"
				},
				"description": {
					"en-US": "SubStatementdescription"
				},
				"type": "http: //adlnet.gov/expapi/activities/cmi.interaction",
				"interactionType": "matching",
				"correctResponsesPattern": ["lou.3",
				"tom.2",
				"andy.1"],
				"source": [{
					"id": "lou",
					"description": {
						"en-US": "Lou",
						"it": "Luigi"
					}
				},
				{
					"id": "tom",
					"description": {
						"en-US": "Tom",
						"it": "Tim"
					}
				},
				{
					"id": "andy",
					"description": {
						"en-US": "Andy"
					}
				}],
				"target": [{
					"id": "1",
					"description": {
						"en-US": "ADLLRS"
					}
				},
				{
					"id": "2",
					"description": {
						"en-US": "lrs"
					}
				},
				{
					"id": "3",
					"description": {
						"en-US": "theadllrs",
						"en-CH": "thelrs"
					}
				}]
			}
		},
		"result": {
			"score": {
				"scaled": 0.50,
				"raw": 50,
				"min": 1,
				"max": 51
			},
			"completion": true,
			"success": true,
			"response": "Poorly done",
			"duration": "P3Y6M4DT12H30M5S",
			"extensions": {
				"ext:resultKey11": "resultValue11",
				"ext:resultKey22": "resultValue22"
			}
		},
		"context": {
			"registration": "10",
			"contextActivities": {
            "parent": [
                {
                    "id": "http://www.example.com/meetings/series/267",
                    "objectType": "Activity"
                }
            ],
            "category": [
                {
                    "id": "http://www.example.com/meetings/categories/teammeeting",
                    "objectType": "Activity",
                    "definition": {
                        "name": {
                            "en": "team meeting"
                        },
                        "description": {
                            "en": "A category of meeting used for regular team meetings."
                        },
                        "type": "http://example.com/expapi/activities/meetingcategory"
                    }
                }
            ],
            "other": [
                {
                    "id": "http://www.example.com/meetings/occurances/34257",
                    "objectType": "Activity"
                },
                {
                    "id": "http://www.example.com/meetings/occurances/3425567",
                    "objectType": "Activity"
                }
            ]
        },
			"revision": "Spelling error in target.",
			"platform": "Ipad.",
			"language": "en-US",
			"statement": {
				"objectType": "StatementRef",
				"id": "11"
			},
			"extensions": {
				"ext:contextKey11": "contextVal11",
				"ext:contextKey22": "contextVal22"
			}
		}
	};
	
var stmt2 = {
	"actor": {
		"objectType": "Agent",
		"name": "Lou Wolford",
		"account": {
			"homePage": "http://example.com",
			"name": "louUniqueName"
		}
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/said",
		"display": {
			"en-US": "said",
			"en-GB": "talked"
		}
	},
	"object": stmt2a,
	"result": {
		"score": {
			"scaled": 0.85,
			"raw": 85,
			"min": 0,
			"max": 100
		},
		"completion": true,
		"success": true,
		"response": "Well done",
		"duration": "P3Y6M4DT12H30M5S",
		"extensions": {
			"ext:resultKey1": "resultValue1",
			"ext:resultKey2": "resultValue2"
		}
	},
	"context": {
		"registration": "12",
		"contextActivities": {
			"other": [ {
				"id": "http:adlnet.gov/my/Activity/URL"
			}]
		},
		"revision": "Spelling error in choices.",
		"platform": "Platform is web browser.",
		"language": "en-US",
		"statement": {
			"objectType": "StatementRef",
			"id": "12"
		},
		"extensions": {
			"ext:contextKey1": "contextVal1",
			"ext:contextKey2": "contextVal2"
		}
	},
	"timestamp": "2013-04-01T12:00:00Z"
};

var guid3 = "3";
var stmt3 = {
	"id": guid3,
	"object": {
		"objectType": "Agent",
		"name": "jon",
		"mbox": "mailto:jon@jon.com"
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/created",
		"display": {
			"en-US": "created"
		}
	},
	"actor": {
		"objectType": "Agent",
		"mbox": "mailto:t@t.com"
	},
	"context": {
			"registration": "10",
			"contextActivities": {
            "parent": [
                {
                    "id": "http://www.example.com/meetings/series/267",
                    "objectType": "Activity"
                }
            ],
            "category": [
                {
                    "id": "http://www.example.com/meetings/categories/teammeeting",
                    "objectType": "Activity",
                    "definition": {
                        "name": {
                            "en": "team meeting"
                        },
                        "description": {
                            "en": "A category of meeting used for regular team meetings."
                        },
                        "type": "http://example.com/expapi/activities/meetingcategory"
                    }
                }
            ],
            "other": [
                {
                    "id": "http://www.example.com/meetings/occurances/34257",
                    "objectType": "Activity"
                },
                {
                    "id": "http://www.example.com/meetings/occurances/3425567",
                    "objectType": "Activity"
                }
            ]
        }
	}
};

var guid4, guid5, guid6, guid7;
var stmt4 = {
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/created",
		"display": {
			"en-US": "created"
		}
	},
	"actor": {
        "name": "Team PB",
        "mbox": "mailto:teampb@example.com",
        "member": [
            {
                "name": "Andrew Downes",
                "account": {
                    "homePage": "http://www.example.com",
                    "name": "13936749"
                },
                "objectType": "Agent"
            },
            {
                "name": "Toby Nichols",
                "openid": "http://toby.openid.example.org/",
                "objectType": "Agent"
            },
            {
                "name": "Ena Hills",
                "mbox_sha1sum": "esydnag7fhxkquopagrr4aiputa=",
                "objectType": "Agent"
            }
        ],
        "objectType": "Group"
    },
	"object": {
		"objectType": "Activity",
		"id": "act:foogie",
		"definition": {
			"name": {
				"en-US": "testname2",
				"en-GB": "altname"
			},
			"description": {
				"en-US": "testdesc2",
				"en-GB": "altdesc"
			},
			"type": "http://www.adlnet.gov/experienceapi/activity-types/http://adlnet.gov/expapi/activities/cmi.interaction",
			"interactionType": "fill-in",
			"correctResponsesPattern": ["answer"],
			"extensions": {
				"ext:key1": "value1",
				"ext:key2": "value2",
				"ext:key3": "value3"
			}
		}
	},
	"result": {
		"score": {
			"scaled": 0.85
		},
		"completion": true,
		"success": true,
		"response": "kicked",
		"duration": "P3Y6M4DT12H30M5S",
		"extensions": {
			"ext:key1": "value1",
			"ext:key2": "value2"
		}
	},
	"context": {
		"registration": "1",
		"contextActivities": {
			"other": [{
				"id": "act:NewActivityID2"
			}]
		},
		"revision": "food",
		"platform": "bard",
		"language": "en-US",
		"extensions": {
			"ext:ckey1": "cval1",
			"ext:ckey2": "cval2"
		}
	}
};

var stmt5 = {
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/created",
		"display": {
			"en-US": "created"
		}
	},
	"actor": {
		"objectType": "Agent",
		"mbox": "mailto:s@t.com"
	},
	"object": {
		"objectType": "Activity",
		"id": "act:foogie",
		"definition": {
			"name": {
				"en-US": "testname3",
				"en-GB": "altname"
			},
			"description": {
				"en-US": "testdesc3",
				"en-GB": "altdesc"
			},
			"type": "http://www.adlnet.gov/experienceapi/activity-types/http://adlnet.gov/expapi/activities/cmi.interaction",
			"interactionType": "fill-in",
			"correctResponsesPattern": ["answers"],
			"extensions": {
				"ext:key11": "value11",
				"ext:key22": "value22",
				"ext:key33": "value33"
			}
		}
	},
	"result": {
		"score": {
			"scaled": 0.75
		},
		"completion": true,
		"success": true,
		"response": "shouted",
		"duration": "P3Y6M4DT12H30M5S",
		"extensions": {
			"ext:dkey1": "dvalue1",
			"ext:dkey2": "dvalue2"
		}
	},
	"context": {
		"registration": "2",
		"contextActivities": {
			"other": [{
				"id": "act:NewActivityID22"
			}]
		},
		"revision": "food",
		"platform": "bard",
		"language": "en-US",
		"extensions": {
			"ext:ckey11": "cval11",
			"ext:ckey22": "cval22"
		}
	}
};

var stmt6 = {
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/created",
		"display": {
			"en-US": "created"
		}
	},
	"actor": {
		"objectType": "Agent",
		"mbox": "mailto:s@s.com"
	},
	"object": {
		"objectType": "Activity",
		"id": "act:foogals",
		"definition": {
			"name": {
				"en-US": "testname3"
			},
			"description": {
				"en-US": "testdesc3"
			},
			"type": "http://adlnet.gov/expapi/activities/cmi.interaction",
			"interactionType": "fill-in",
			"correctResponsesPattern": ["answers"],
			"extensions": {
				"ext:key111": "value111",
				"ext:key222": "value222",
				"ext:key333": "value333"
			}
		}
	},
	"result": {
		"score": {
			"scaled": 0.79
		},
		"completion": true,
		"success": true,
		"response": "shouted",
		"duration": "P3Y6M4DT12H30M5S",
		"extensions": {
			"ext:dkey1": "dvalue1",
			"ext:dkey2": "dvalue2"
		}
	},
	"context": {
		"registration": "3",
		"contextActivities": {
			"other": [{
				"id": "act:NewActivityID22"
			}]
		},
		"revision": "food",
		"platform": "bard",
		"language": "en-US",
		"instructor": {
			"objectType": "Agent",
			"name": "bob",
			"mbox": "mailto:bob@bob.com"
		},
		"extensions": {
			"ext:ckey111": "cval111",
			"ext:ckey222": "cval222"
		}
	}
};

var stmt7 = {
	"object": {
		"objectType": "Agent",
		"name": "jon",
		"mbox": "mailto:jon@jon.com"
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/created",
		"display": {
			"en-US": "created"
		}
	},
	"actor": {
		"objectType": "Agent",
		"mbox": "mailto:s@s.com"
	}
};

//error on duplicate id/statment exists
var err_stmt1 = {
	"id": guid3,
	"object": {
		"objectType": "Agent",
		"name": "jon",
		"mbox": "mailto:jon@jon.com"
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/created",
		"display": {
			"en-US": "created"
		}
	},
	"actor": {
		"objectType": "Agent",
		"mbox": "mailto:s@s.com"
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
        "id" : voided_guid1
    }
}; //contains ref to voided_guid1
// todo back to lower camel case, get goLrs output lower camel
var voided_stmt1 = {
    "actor": {
        "objectType": "Agent",
        "mbox": "mailto:learner@example.adlnet.gov"
    },
    "verb" : {
        "id": "http://adlnet.gov/expapi/verbs/experienced",
        "display": {
            "En-US": "experienced"
        }
    },
    "object": {
        "id": "http://adlnet.gov/xapi/",
        "definition": {
            "type": "http://adlnet.gov/expapi/activities/link"
        }
    }
};

var guid11="11";
var stmt11 = {
	"object": {
		"objectType": "Agent",
		"name": "jon",
		"mbox": "mailto:jon@jon.com"
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/created",
		"display": {
			"en-US": "created"
		}
	},
	"actor": {
		"objectType": "Agent",
		"mbox": "mailto:s@s.com"
	},
	"context": {
		"registration": "11",
		"contextActivities": {
			"other": 
				{"id": "http://example.adlnet.gov/tincan/example/test"}			
		},
		"revision": "Spelling error in choices.",
		"platform": "Platform is web browser.",
		"language": "en-US",
		"statement": {
			"objectType": "StatementRef",
			"id": "7"
		},
		"extensions": {
			"ext:contextKey1": "contextVal1",
			"ext:contextKey2": "contextVal2"
		}
	}
};

var stmt11a = {
	"object": {
		"objectType": "Agent",
		"name": "jon",
		"mbox": "mailto:jon@jon.com"
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/created",
		"display": {
			"en-US": "created"
		}
	},
	"actor": {
		"objectType": "Agent",
		"mbox": "mailto:s@s.com"
	},
	"context": {
		"registration": "11",
		"contextActivities": {
			"other": 
				[{"id": "http://example.adlnet.gov/tincan/example/test"}]			
		},
		"revision": "Spelling error in choices.",
		"platform": "Platform is web browser.",
		"language": "en-US",
		"statement": {
			"objectType": "StatementRef",
			"id": "7"
		},
		"extensions": {
			"ext:contextKey1": "contextVal1",
			"ext:contextKey2": "contextVal2"
		}
	}
}

/* PUT */
//1
frisby.create("PUT - Valid Statement w/ id")
  .put(API_DOMAIN+"/statements/?statementId="+guid1,
	stmt1,{"json":true})
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
//2
frisby.create("PUT - Valid Statement w/ Valid Substatement")
  .put(API_DOMAIN+"/statements/?statementId="+guid2,
	stmt2,{"json":true})
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
//3
frisby.create("PUT - Id no Statement")
  .put(API_DOMAIN+"/statements/?statementId="+guid3)
    .expectStatus(400)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
	
//4
frisby.create("PUT - Valid same statement and id as existing no conflict")
  .put(API_DOMAIN+"/statements/?statementId="+guid1,
	stmt1,{"json":true})
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
//5	
frisby.create("PUT - Valid different satements same id confilict")
  .put(API_DOMAIN+"/statements/?statementId="+guid1,
	stmt2,{"json":true})
    .expectStatus(409)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();

/* POST */
//6
frisby.create("POST - No Statement")
  .post(API_DOMAIN+"/statements/")
    .expectStatus(400)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
//7	
frisby.create("POST - Valid statement and return id in array")
  .post(API_DOMAIN+"/statements/",
	stmt4,{"json":true})
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength(1)
	.expectJSONTypes("?", Array)
	.afterJSON(function(ids) {
		guid4 = ids[0];
		
		//cleanup
		if(CLEAN){
			frisby.create("delete - Statement guid4")
				.delete(API_DOMAIN+"/statements/?statementId="+guid4)
				.toss();
		}
	})
	.toss();
//8
var multi = [stmt5,stmt6,stmt7];
frisby.create("POST - Valid multiple statements return id in array")
  .post(API_DOMAIN+"/statements/",
	multi,{"json":true})
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength(3)
	.expectJSONTypes("?", Array)
	.afterJSON(function(ids) {		
		guid5 = ids[0];
		guid6 = ids[1];
		guid7 = ids[2];
				
	//19
	frisby.create("GET - Existing Statement by POST statementId")
	    .get(API_DOMAIN+"/statements/?statementId="+guid5)
		.expectStatus(200)
		.expectHeaderContains("X-Experience-API-Version", API_VER)
		.expectJSON(stmt5)
		.afterJSON(function(result){
			//cleanup
			if(CLEAN){
				frisby.create("delete - Statement guid5")
				  .delete(API_DOMAIN+"/statements/?statementId="+guid5)
					.toss();
				frisby.create("delete - Statement guid6")
				  .delete(API_DOMAIN+"/statements/?statementId="+guid6)
					.toss();
				frisby.create("delete - Statement guid7")
				  .delete(API_DOMAIN+"/statements/?statementId="+guid7)
					.toss();
			}
		})
		.toss();
	})
	.toss();	
//9
frisby.create("POST - Valid Statement w/ id")
  .post(API_DOMAIN+"/statements/?statementId="+guid10,
	stmt10,{"json":true})
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
//10	
frisby.create("POST - Valid Statement w/ id in statement")
  .post(API_DOMAIN+"/statements/",
	stmt3,{"json":true})
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)	
	.expectJSONLength(1)
	.expectJSONTypes("?", Array)
	.toss();
	
//11	
//get query stmt8 & stmt9 to confirm didn"t save due to conflict
var multi = [stmt8,err_stmt1,stmt9];
frisby.create("POST - Invalid statement in mulitiple don't save all")
  .post(API_DOMAIN+"/statements/",
	multi,{"json":true})
    .expectStatus(409)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
//12
//get query voided_guid1 to confirm void
frisby.create("PUT - Statement to be Voided")
  .put(API_DOMAIN+"/statements/?statementId="+voided_guid1,
	voided_stmt1,{"json":true})
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
//13	
frisby.create("POST - Void statment")
  .post(API_DOMAIN+"/statements/",
	void_stmt1,{"json":true})
	.expectStatus(200)
	.expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength(1)
	.expectJSONTypes("?", Array)
	.toss();	

/* GET */
//14
//get query stmt8 & stmt9 to confirm didn"t save
frisby.create("GET - Statement that shouldn't have been saved guid8")
  .get(API_DOMAIN+"/statements/?statementId="+guid8)
    .expectStatus(404)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
	
frisby.create("GET - Statement that shouldn't have been saved guid1")
  .get(API_DOMAIN+"/statements/?statementId="+guid1)
    .expectStatus(200)
	.expectJSON(stmt1)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
	
frisby.create("GET - Statement that shouldn't have been saved guid3")
  .get(API_DOMAIN+"/statements/?statementId="+guid3)
    .expectStatus(200)
	.expectJSON(stmt3)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
	
//15	
//get query voided_guid1 to confirm void
frisby.create("GET - Voided Statement by statementId")
  .get(API_DOMAIN+"/statements/?statementId="+voided_guid1)
    .expectStatus(404)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();
//16	
frisby.create("GET - Voided Statement by voidedStatementId")
  .get(API_DOMAIN+"/statements/?voidedStatementId="+voided_guid1)
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSON(voided_stmt1)	
	.toss();
//17
frisby.create("GET - Existing Statement by PUT statementId")
  .get(API_DOMAIN+"/statements/?statementId="+guid1)
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSON(stmt1)
	.toss();
	
//18 //not yet supported
/*frisby.create("GET - Existing Sub Statement")
  .get(API_DOMAIN+"/statements/?statementId="+ssguid2)
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSON(stmt2a)
	.toss();
*/	
// single query all fields returned accuratly 204 (many)

/* GET Complex query */

// no params return all with default limit of 10 (statement count will be less)
// no params return all with default limit of 10 (statement count will be more)
// Since
// Until
// Since and Until

// Verb
frisby.create("Get - Valid Verb in statements")
  .get(API_DOMAIN+"/statements/?verb=http://adlnet.gov/expapi/verbs/created")
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)	
	.expectJSONLength(6)
	.toss();
	
// No Verb
frisby.create("Get - Verb not found")
  .get(API_DOMAIN+"/statements/?verb=http://adlnet.gov/expapi/verbs/nothing")
    .expectStatus(404)
	.toss();
	
// Agent as actor
var actor ='{"objectType": "Agent", "name": "Lou Wolford", "account": { "homePage": "http://example.com", "name": "uniqueName"}}';
frisby.create("Get - Agent as actor")
  .get(API_DOMAIN+"/statements/?agent="+actor)
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)	
	.expectJSONLength(1)
	.toss();

// No Actor	
var actor ='{"objectType": "Agent", "name": "Tobias Contreras", "account": { "homePage": "http://example.com", "name": "uniqueName"}}';
frisby.create("Get - Agent not found")
  .get(API_DOMAIN+"/statements/?agent="+actor)
    .expectStatus(404)
    .expectHeaderContains("X-Experience-API-Version", API_VER)	
	.toss();
	
// Agent as group member
var actor ='{"name": "Andrew Downes","account": {"homePage": "http://www.example.com","name": "13936749"},"objectType": "Agent"}';
frisby.create("Get - Agent as group member")
  .get(API_DOMAIN+"/statements/?agent="+actor)
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength(1)
	.toss();

// related_agents - object.actor
var actor ='{"objectType": "Agent","name": "jon","mbox": "mailto:jon@jon.com"}';
frisby.create("Get - related_agents as object.actor")
  .get(API_DOMAIN+"/statements/?agent="+actor+"&related_agents=true")
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength(2)
	.toss();

// related_agents - context.instructor
var actor ='{"objectType": "Agent","name": "bob","mbox": "mailto:bob@bob.com"}';
frisby.create("Get - related_agents as context.instructor")
  .get(API_DOMAIN+"/statements/?agent="+actor+"&related_agents=true")
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength(1)
	.toss();
	
// related_agents - object.context.instructor
// related_agents - object.context.team

// Registration
var registration ='6';
frisby.create("Get - context.registration")
  .get(API_DOMAIN+"/statements/?registration="+registration)
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength(1)
	.toss();
	
// Activity
//object.id  http:adlnet.gov/my/Activity/URL
var activity ='http:adlnet.gov/my/Activity/URL';
frisby.create("Get - activity object.id")
  .get(API_DOMAIN+"/statements/?activity="+activity)
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength(1)
	.toss();
	
//related_activities object.id  http:adlnet.gov/my/Activity/URL
var activity ='http:adlnet.gov/my/Activity/URL';
frisby.create("Get - activity object.id related_activities")
  .get(API_DOMAIN+"/statements/?activity="+activity+'&related_activities=true')
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength(2)
	.toss();
	
//related_activities context.contextActivities http://groupingID
var activity ='http://groupingID';
frisby.create("Get - activity context.contextActivities related_activities")
  .get(API_DOMAIN+"/statements/?activity="+activity+'&related_activities=true')
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength(1)
	.toss();
	
//related_activities context.contextActivities other in array and substatement
var activity ='http://www.example.com/meetings/occurances/3425567';
frisby.create("Get - activity context.contextActivities related_activities in array")
  .get(API_DOMAIN+"/statements/?activity="+activity+'&related_activities=true')
    .expectStatus(200)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.expectJSONLength(2)
	.toss();
	
//related_activities object.context.contextActivities

//test the conversion from a single object in contextActivities "Other" to array
frisby.create("PUT - Valid Statement w/ contextActivities 'Other' as single object")
  .put(API_DOMAIN+"/statements/?statementId="+guid11,
	stmt11,{"json":true})
    .expectStatus(204)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();

frisby.create("GET - Statement that has object converted to array guid11")
  .get(API_DOMAIN+"/statements/?statementId="+guid11)
    .expectStatus(200)
	.expectJSON(stmt11a)
    .expectHeaderContains("X-Experience-API-Version", API_VER)
	.toss();

// Sort Ascending
// format?
// Attachment?
// Find items with refrence to
// Find items with refrence to with same since/until
// Find iems with refrence to refrences to items
// Combo of Verb, Actor, Since

//Cleanup
//must support delete by statementId
if(CLEAN){
	frisby.create("delete - Statement guid1")
	  .delete(API_DOMAIN+"/statements/?statementId="+guid1)
		.toss();
	frisby.create("delete - Statement guid2")
	  .delete(API_DOMAIN+"/statements/?statementId="+guid2)
		.toss();
	frisby.create("delete - Statement guid3")
	  .delete(API_DOMAIN+"/statements/?statementId="+guid3)
		.toss();
	frisby.create("delete - Statement guid8")
	  .delete(API_DOMAIN+"/statements/?statementId="+guid8)
		.toss();
	frisby.create("delete - Statement voided_guid1")
	  .delete(API_DOMAIN+"/statements/?statementId="+voided_guid1)
		.toss();
	frisby.create("delete - Statement guid10")
	  .delete(API_DOMAIN+"/statements/?statementId="+guid10)
		.toss();
	frisby.create("delete - Statement guid11")
	  .delete(API_DOMAIN+"/statements/?statementId="+guid11)
		.toss();
}