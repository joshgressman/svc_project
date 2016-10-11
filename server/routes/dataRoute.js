var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = '';

if (process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + '?ssl=true';
} else {
    // running locally, use our local database instead (local db create for development process);
    connectionString = 'postgres://localhost:5432/svc';
}

router.get("/presentation_victim", function(req, res) {
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        console.log("SELECT * FROM victim ORDER BY id ASC");
        client.query("SELECT * FROM victim ORDER BY id ASC",
            function(err, result) {
                done();
                console.log("Result", result);
                if (err) {
                    console.log("select error: ", err);
                    res.sendStatus(500);
                }
                res.send(result.rows);
            });
    });
});
router.get("/presentation_nonvictim", function(req, res) {
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        console.log("SELECT * FROM nonvictim");
        client.query("SELECT * FROM nonvictim",
            function(err, result) {
                done();
                console.log("Result", result);
                if (err) {
                    console.log("select error: ", err);
                    res.sendStatus(500);
                }
                res.send(result.rows);
            });

    });
});

// POST requests to victim and nonvictim tables;
router.post('/victim', function(req, res) {
    var newVictim = req.body;
    console.log('new victim added:', newVictim);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG', err);
            res.sendStatus(500);
        }

        client.query('INSERT INTO victim (date_entered, advocate_name, contact_date, start_time, end_time, service_location, service_county, victim_number, victim_zipcode, victim_type, victim_referral_source, victim_prior_contact, victim_prior_oct, crisis_counseling_individual, crisis_counseling_group, legal_law_enforcement_interview, legal_prosecution_related, legal_court_advocacy, legal_oft_hro, legal_immigration, legal_intervention, medical_exam_support, medical_accompaniment_medical, medical_accompaniment_dental, transportation, crisis_counseling, information_referral, information_criminal_justice, other_emergency_justice, safe_at_home, emergency_financial, reparations_claims, referral_svc, referral_agency, referral_other, violence_adult_sexual, violence_adult_child_family, violence_adult_child_other, violence_bullying, violence_child_pornography, violence_domestic, violence_elder, violence_exposing, violence_internet, violence_minor_family, violence_minor_other, violence_phone, violence_exploitation, violence_harassment, violence_stalking, violence_teen_dating, violence_other, violence_other_specify, violence_unknown, victim_age, victim_gender, victim_trans, victim_sexual_orientation, disability_blind, disability_physical, disability_mental, disability_deaf, disability_developmental, disability_other, disability_other_specify, disability_unknown, disability_none, victim_ethnicity, victim_immigrant, homeless, limited_english, veteran, supported_on_call, contact_type, victim_multiple, form_number, victim_ethnicity_other_specify, victim_immigrant_other_specify) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78) RETURNING id', [newVictim.date_entered, newVictim.counselor, newVictim.date, newVictim.sTime, newVictim.eTime, newVictim.location, newVictim.county, newVictim.clientNumber, newVictim.zipCode, newVictim.victimType, newVictim.svcPrompt, newVictim.previousContact, newVictim.previousVisit, newVictim.counseling, newVictim.supportGroup, newVictim.lawEnforcementInterview, newVictim.prosecutionRelatedAdvocacy, newVictim.courtAdvocacy, newVictim.assistOFP_HRO, newVictim.immigrationSupport, newVictim.interventionWithOthers, newVictim.forensicExamSupport, newVictim.accompanyMedicalAppt, newVictim.accompanyDentalAppt, newVictim.transportation, newVictim.crisis_counseling, newVictim.infoAndReferral,
                newVictim.info_crimjustice, newVictim.other_emergency_justice, newVictim.safeAtHome, newVictim.emergencyFinancialAsst, newVictim.reparationsClaimAsst, newVictim.svcServices, newVictim.otherAgencyReferral, newVictim.otherServicesReferral, newVictim.adultSexAssault, newVictim.adultAbusedAsChild_family, newVictim.adultAbusedAsChild_other, newVictim.bullying, newVictim.childPorn, newVictim.domesticViolence, newVictim.elderAbuse, newVictim.exposing, newVictim.internetRelated, newVictim.minorCSA_family, newVictim.minorCSA_other, newVictim.obscenePhoneCall, newVictim.exploitation_trafficking, newVictim.sexualHarassment, newVictim.stalking, newVictim.teenDating, newVictim.sexualViolenceOther, newVictim.sexualViolenceOther_specify, newVictim.unknownViolence, newVictim.age,
                newVictim.gender, newVictim.trans, newVictim.orientation, newVictim.blind_visImpair, newVictim.physDisabled, newVictim.mentDisabled, newVictim.deafHardHearing, newVictim.devDisabled, newVictim.otherDisabled, newVictim.otherDisabled_specify, newVictim.unknownDisabled, newVictim.notDisabled, newVictim.ethnicBackground, newVictim.immigrantStatus, newVictim.homeless, newVictim.limitedEnglish, newVictim.veteran, newVictim.supported, newVictim.advocacyType, newVictim.multiple, newVictim.formId, newVictim.other_ethnicBackground, newVictim.other_immigrantStatus
            ],

            function(err, result) {
                done();

                if (err) {
                    console.log('POST ERROR, victim:', err);
                    res.sendStatus(500);
                } else {
                    // res.sendStatus(201);
                    res.send(result.rows);
                    console.log(result.rows);

                }

            });
    });
});


router.post('/nonvictim', function(req, res) {
    var newNonVictim = req.body;
    console.log('new non victim added:', newNonVictim);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG:', err);
            res.sendStatus(500);
        }

        client.query('INSERT INTO nonvictim (date_entered, advocate_name, contact_date, start_time, end_time, caller_name, caller_phone, caller_zip, caller_county, call_type, svc_source, type_medical, type_school, type_govt_social, type_community_member, type_law_enforcer, type_legal_system, type_city_social, type_other_organization, referral_medical, referral_school, referral_govt_social, referral_community_member, referral_law_enforcer, referral_legal_system, referral_city_social, referral_other_organization, advocacy_location, advocacy_request, advocacy_dispatched, advocacy_med_responder, dispatched_notes, medical_request) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33)', [newNonVictim.date_entered, newNonVictim.counselor, newNonVictim.date, newNonVictim.sTime, newNonVictim.eTime, newNonVictim.callerName, newNonVictim.callerPhone, newNonVictim.callerZip, newNonVictim.county, newNonVictim.callerType, newNonVictim.svcSource, newNonVictim.medical, newNonVictim.school, newNonVictim.govtSocial, newNonVictim.communityMember, newNonVictim.lawEnforcer, newNonVictim.legalSystem,
                newNonVictim.citySocial, newNonVictim.otherOraganization, newNonVictim.medicalReferral, newNonVictim.schoolReferral, newNonVictim.govtSocialReferral, newNonVictim.communityMemberReferral, newNonVictim.lawEnforcerReferral, newNonVictim.legalSystemReferral, newNonVictim.citySocialReferral, newNonVictim.otherOraganizationReferral, newNonVictim.advacacyLocation, newNonVictim.request, newNonVictim.dispatched,
                newNonVictim.responded, newNonVictim.reason, newNonVictim.medicalAdvocacyRequest
            ],
            function(err, result) {
                done();

                if (err) {
                    console.log('POST ERROR, nonvictim', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
    });
});

//PUT request to victim and nonvictim tables;
router.put('/victim/:id', function(req, res) {
    var id = req.params.id;
    var victim = req.body;
    console.log('Victim ID to change:', id);
    console.log('Modified info:', victim);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG', err);
            res.sendStatus(500);
        }
        client.query('UPDATE victim ' +
            'SET date_entered = $1, ' +
            'advocate_name = $2, ' +
            'contact_date = $3, ' +
            'start_time = $4, ' +
            'end_time = $5, ' +
            'service_location = $6, ' +
            'service_county = $7, ' +
            'victim_multiple = $8, ' +
            'victim_number = $9, ' +
            'victim_zipcode = $10, ' +
            'victim_type = $11, ' +
            'victim_referral_source = $12, ' +
            'victim_prior_contact = $13, ' +
            'victim_prior_oct = $14, ' +
            'crisis_counseling_individual = $15, ' +
            'crisis_counseling_group = $16, ' +
            'legal_law_enforcement_interview = $17, ' +
            'legal_prosecution_related = $18, ' +
            'legal_court_advocacy = $19, ' +
            'legal_oft_hro = $20, ' +
            'legal_immigration = $21, ' +
            'legal_intervention = $22, ' +
            'medical_exam_support = $23, ' +
            'medical_accompaniment_medical = $24, ' +
            'medical_accompaniment_dental = $25, ' +
            'transportation = $26, ' +
            'crisis_counseling = $27, ' +
            'information_referral = $28, ' +
            'information_criminal_justice = $29, ' +
            'other_emergency_justice = $30, ' +
            'safe_at_home = $31, ' +
            'emergency_financial = $32, ' +
            'reparations_claims = $33, ' +
            'referral_svc = $34, ' +
            'referral_agency = $35, ' +
            'referral_other = $36, ' +
            'violence_adult_sexual = $37, ' +
            'violence_adult_child_family = $38, ' +
            'violence_adult_child_other = $39, ' +
            'violence_bullying = $40, ' +
            'violence_child_pornography = $41, ' +
            'violence_domestic = $42, ' +
            'violence_elder = $43, ' +
            'violence_exposing = $44, ' +
            'violence_internet = $45, ' +
            'violence_minor_family = $46, ' +
            'violence_minor_other = $47, ' +
            'violence_phone = $48, ' +
            'violence_exploitation = $49, ' +
            'violence_harassment = $50, ' +
            'violence_stalking = $51, ' +
            'violence_teen_dating = $52, ' +
            'violence_other = $53, ' +
            'violence_other_specify = $54, ' +
            'violence_unknown = $55, ' +
            'victim_age = $56, ' +
            'victim_gender = $57, ' +
            'victim_trans = $58, ' +
            'victim_sexual_orientation = $59, ' +
            'disability_blind = $60, ' +
            'disability_physical = $61, ' +
            'disability_mental = $62, ' +
            'disability_deaf = $63, ' +
            'disability_developmental = $64, ' +
            'disability_other = $65, ' +
            'disability_other_specify = $66, ' +
            'disability_unknown = $67, ' +
            'disability_none = $68, ' +
            'victim_ethnicity = $69, ' +
            'victim_immigrant = $70, ' +
            'homeless = $71, ' +
            'limited_english = $72, ' +
            'veteran = $73, ' +
            'supported_on_call = $74, ' +
            'contact_type = $75, ' +
            'victim_ethnicity_other_specify = $76, ' +
            'victim_immigrant_other_specify = $77 ' +
            'WHERE id = $78', [victim.date_entered, victim.advocate_name, victim.contact_date, victim.start_time, victim.end_time, victim.service_location, victim.service_county, victim.victim_multiple, victim.victim_number, victim.victim_zipcode, victim.victim_type, victim.victim_referral_source, victim.victim_prior_contact, victim.victim_prior_oct, victim.crisis_counseling_individual, victim.crisis_counseling_group, victim.legal_law_enforcement_interview, victim.legal_prosecution_related, victim.legal_court_advocacy, victim.egal_oft_hro, victim.legal_immigration, victim.legal_intervention, victim.medical_exam_support, victim.medical_accompaniment_medical, victim.medical_accompaniment_dental, victim.transportation, victim.crisis_counseling, victim.information_referral, victim.info_crimjustice, victim.other_emergency_justice, victim.safe_at_home, victim.emergency_financial, victim.reparations_claims, victim.referral_svc, victim.referral_agency, victim.referral_other, victim.violence_adult_sexual, victim.violence_adult_child_family, victim.violence_adult_child_other, victim.violence_bullying, victim.violence_child_pornography, victim.violence_domestic, victim.violence_elder, victim.violence_exposing, victim.violence_internet, victim.violence_minor_family, victim.violence_minor_other, victim.violence_phone, victim.violence_exploitation, victim.violence_harassment, victim.violence_stalking, victim.violence_teen_dating, victim.violence_other, victim.violence_other_specify, victim.violence_unknown, victim.victim_age, victim.victim_gender, victim.ictim_trans, victim.victim_sexual_orientation, victim.disability_blind, victim.disability_physical, victim.disability_mental, victim.disability_deaf, victim.disability_developmental, victim.disability_other, victim.disability_other_specify, victim.disability_unknown, victim.disability_none, victim.victim_ethnicity, victim.victim_immigrant, victim.homeless, victim.limited_english,
                victim.veteran, victim.supported_on_call, victim.contact_type, victim.victim_ethnicity_other_specify, victim.victim_immigrant_other_specify, id
            ],
            function(err, result) {
                done();

                if (err) {
                    console.log('PUT ERROR, victim:', err);
                    res.sendStatus(500);
                } else {
                    console.log('PUT SUCCESS')
                    res.sendStatus(200);
                }
            });
    });
});

router.put('/nonvictim/:id', function(req, res) {
    var id = req.params.id;
    var nonVictim = req.body;
    console.log('NonVictim ID to change:', id);
    console.log('Modified info:', nonVictim);
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG', err);
            res.sendStatus(500);
        }
        client.query('UPDATE nonvictim ' +
            'SET date_entered = $1, ' +
            'advocate_name = $2, ' +
            'contact_date = $3, ' +
            'start_time = $4, ' +
            'end_time = $5, ' +
            'caller_name = $6, ' +
            'caller_phone = $7, ' +
            'caller_zip = $8, ' +
            'caller_county = $9, ' +
            'call_type = $10, ' +
            'svc_source = $11, ' +
            'type_medical = $12, ' +
            'type_school = $13, ' +
            'type_govt_social = $14, ' +
            'type_community_member = $15, ' +
            'type_law_enforcer = $16, ' +
            'type_legal_system = $17, ' +
            'type_city_social = $18, ' +
            'type_other_organization = $19, ' +
            'referral_medical = $20, ' +
            'referral_school = $21, ' +
            'referral_govt_social = $22, ' +
            'referral_community_member = $23, ' +
            'referral_law_enforcer = $24, ' +
            'referral_legal_system = $25, ' +
            'referral_city_social = $26, ' +
            'referral_other_organization = $27, ' +
            'advocacy_location = $28, ' +
            'advocacy_dispatched = $29, ' +
            'advocacy_med_responder = $30, ' +
            'dispatched_notes = $31, ' +
            'advocacy_request = $32, ' +
            'medical_request = $33 ' +
            'WHERE id = $34', [nonVictim.date_entered, nonVictim.advocate_name, nonVictim.contact_date, nonVictim.start_time, nonVictim.end_time, nonVictim.caller_name, nonVictim.caller_phone, nonVictim.caller_zip, nonVictim.caller_county, nonVictim.call_type, nonVictim.svc_source, nonVictim.type_medical, nonVictim.type_school, nonVictim.type_govt_social, nonVictim.type_community_member, nonVictim.type_law_enforcer, nonVictim.type_legal_system,
                nonVictim.type_city_social, nonVictim.type_other_organization, nonVictim.referral_medical, nonVictim.referral_school, nonVictim.referral_govt_social, nonVictim.referral_community_member, nonVictim.referral_law_enforcer, nonVictim.referral_legal_system, nonVictim.referral_city_social, nonVictim.referral_other_organization, nonVictim.advocacy_location, nonVictim.advocacy_dispatched, nonVictim.advocacy_med_responder, nonVictim.dispatched_notes, nonVictim.advocacy_request, nonVictim.medical_request, id
            ],
            function(err, result) {
                done();
                if (err) {
                    console.log('PUT ERROR, nonvictim:', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
    });
});

//DELETE request to vicitm and nonvictim tables;
router.delete('/victim/:id', function(req, res) {
    var id = req.params.id;
    console.log('VICTIM record to delete:', id);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG', err);
            res.sendStatus(500);
        }

        client.query('DELETE FROM victim ' +
            'WHERE id = $1', [id],
            function(err, result) {
                done();

                if (err) {
                    console.log('DELETE ERROR, victim:', err);
                    res.sendStatus(500);
                    return;
                }

                res.sendStatus(200);
            });
    });
});

router.delete('/nonvictim/:id', function(req, res) {
    var id = req.params.id;
    console.log('NONVICTIM record to delete:', id);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG', err);
            res.sendStatus(500);
        }

        client.query('DELETE FROM nonvictim ' +
            'WHERE id = $1', [id],
            function(err, result) {
                done();

                if (err) {
                    console.log('DELETE ERROR, nonvictim:', err);
                    res.sendStatus(500);
                    return;
                }

                res.sendStatus(200);
            });
    });
});

module.exports = router;
