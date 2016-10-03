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

//POST requests to victim and nonvictim tables;
router.post('/victim', function(req, res) {
    var newVictim = req.body;
    console.log('new victim added:', newVictim);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG', err);
            res.sendStatus(500);
        }

        client.query('INSERT INTO victim (date_entered, advocate_name, contact_date, start_time, end_time, service_location, service_county, service_county_other_specify, victim_number, victim_zipcode, victim_type, victim_referral_source, victim_prior_contact, victim_prior_oct, crisis_counseling_individual, crisis_counseling_group, legal_law_enforcement_interview, legal_prosecution_related, legal_court_advocacy, legal_oft_hro, legal_immigration, legal_intervention, medical_exam_support, medical_accompaniment_medical, medical_accompaniment_dental, transportation, crisis_counseling, information_referral, information_criminal_justice, other_emergency_justice, safe_at_home, emergency_financial, reparations_claims, referral_svc, referral_agency, referral_other, violence_adult_sexual, violence_adult_child_family, violence_adult_child_other, violence_bullying, violence_child_pornography, violence_domestic, violence_elder, violence_exposing, violence_internet, violence_minor_family, violence_minor_other, violence_phone, violence_exploitation, violence_harassment, violence_stalking, violence_teen_dating, violence_other, violence_other_specify, violence_unknown, victim_age, victim_gender, victim_trans, victim_sexual_orientation, disability_blind, disability_physical, disability_mental,disability_deaf, disability_developmental, disability_other, disability_other_specify, disability_unknown, disability_none, victim_ethnicity, victim_immigrant, homeless, limited_english, veteran, supported_on_call) ' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73)',
        [newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something,
        newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something,
        newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something],

        function(err, result) {
          done();

            if (err) {
                console.log('POST ERROR, victim:', err);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
            });
    });
});

router.post('/nonvictim', function(req, res) {
    var newNonVictim = req.body;
    console.log('new nonvictim added:', newNonVictim);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG:', err);
            res.sendStatus(500);
        }

        client.query('INSERT INTO nonvictim (date_entered, advocate_name, contact_date, start_time, end_time, caller_name, caller_phone, caller_zip, caller_county, caller_org_type, caller_org_name, call_type, call_referral_type, call_referral_name, referral_source, advocacy_request, advocacy_location, advocacy_med, advocacy_med_responder, advocate_dispatched, dispatched_notes) ' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)',
        [newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something],

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

<<<<<<< HEAD
    client.query('UPDATE victim ' +
                'date_entered = $1, ' +
                'advocate_name = $2, ' +
                'contact_date = $3, ' +
                'start_time = $4, ' +
                'end_time = $5, ' +
                'service_location = $6, ' +
                'service_county = $7, ' +
                'victim_zipcode = $8, ' +
                'victim_type = $9, ' +
                'victim_referral_source = $10, ' +
                'victim_new = $11, ' +
                'victim_prior_oct = $12, ' +
                'crisis_counseling_individual = $13, ' +
                'crisis_counseling_group = $14, ' +
                'legal_law_enforcement_interview = $15, ' +
                'legal_prosecution_related = $16, ' +
                'legal_court_advocacy = $17, ' +
                'legal_oft_hro = $18, ' +
                'legal_immigration = $19, ' +
                'legal_intervention = $20, ' +
                'medical_exam_support = $21, ' +
                'medical_accompaniment_medical = $22, ' +
                'medical_accompaniment_dental = $23, ' +
                'transportation = $24, ' +
                'crisis_counseling = $25, ' +
                'information_referral = $26, ' +
                'information_criminal_justice = $27, ' +
                'other_emergency_justice = $28, ' +
                'safe_at_home = $29, ' +
                'emergency_financial = $30, ' +
                'reparations_claim = $31, ' +
                'referral_svc = $32, ' +
                'referral_agenc = $33, ' +
                'referral_other = $34, ' +
                'violence_adult_sexual = $35, ' +
                'violence_adult_child_family = $36, ' +
                'violence_adult_child_other = $37, ' +
                'violence_bullying = $38, ' +
                'violence_child_pornography = $39, ' +
                'violence_domestic = $40, ' +
                'violence_elder = $41, ' +
                'violence_exposing = $42, ' +
                'violence_internet = $43, ' +
                'violence_minor_family = $44, ' +
                'violence_minor_other = $45, ' +
                'violence_phone = $46, ' +
                'violence_exploitation = $47, ' +
                'violence_harassment = $48, ' +
                'violence_stalking = $49, ' +
                'violence_teen_dating = $50, ' +
                'violence_other = $51, ' +
                'violence_other_specify = $52, ' +
                'violence_unknown = $53, ' +
                'victim_age = $54, ' +
                'victim_gender = $55, ' +
                'victim_trans = $56, ' +
                'victim_pronoun = $57, ' +
                'victim_sexual_orientation = $58, ' +
                'disability_blind = $59, ' +
                'disability_physical = $60, ' +
                'disability_mental = $61, ' +
                'disability_deaf = $62, ' +
                'disability_developmental = $63, ' +
                'disability_other = $64, ' +
                'disability_other_specify = $65, ' +
                'disability_unknown = $66, ' +
                'disability_none = $67, ' +
                'victim_ethnicity = $68, ' +
                'victim_immigrant = $69' +
                'homeless = $70, ' +
                'limited_english = $71, ' +
                'veteran = $72, ' +
                'supported_on_call = $73 ' +
                'WHERE id = $74',
                [newVictim.something, newVictim.something, newVictim.something, newVictim.something,  newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something,
                newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something,

                newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, id],

=======
        client.query('UPDATE victim ' +
            'date_entered = $1, ' +
            'advocate_name = $2, ' +
            'contact_date = $3, ' +
            'start_time = $4, ' +
            'end_time = $5, ' +
            'service_location = $6, ' +
            'service_county = $7, ' +
            'service_county_other_specify = $8, ' +
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
            'reparations_claim = $33, ' +
            'referral_svc = $34, ' +
            'referral_agenc = $35, ' +
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
            'victim_immigrant = $70' +
            'homeless = $71, ' +
            'limited_english = $72, ' +
            'veteran = $73, ' +
            'supported_on_call = $74 ' +
            'WHERE id = $75',
            [newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something,
            newVictim.something, newVictim.something, id],
>>>>>>> master
                function (err, result) {
                  done();
                if (err) {
                    console.log('PUT ERROR, victim:', err);
                    res.sendStatus(500);
                } else {
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
            'date_entered = $1, ' +
            'advocate_name = $2, ' +
            'contact_date = $3, ' +
            'start_time = $4, ' +
            'end_time = $5, ' +
            'caller_name = $6, ' +
            'caller_phone = $7, ' +
            'caller_zip = $8, ' +
            'caller_county = $9, ' +
            'caller_org_type = $10, ' +
            'caller_org_name = $11, ' +
            'call_type = $12, ' +
            'call_referral_type = $13, ' +
            'call_referral_name = $14, ' +
            'referral_source = $15, ' +
            'advocacy_request = $16, ' +
            'advocacy_location = $17, ' +
            'advocacy_med = $18, ' +
            'advocacy_med_responder = $19, ' +
            'advocate_dispatched = $20, ' +
            'dispatched_notes = $21 ' +
            'WHERE id = $22',
            [nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, id],

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
