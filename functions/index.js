let Promise = require('promise');
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const vision = require('@google-cloud/vision');

const visionClient =  new vision.ImageAnnotatorClient();
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.analyzeImage = functions.firestore.document('photos/{document}').onCreate((snap, context) => {
	const data = snap.data();
	const photoUrl = "gs://" + data.bucket + "/" + data.fullPath;

	return Promise.resolve()
	.then(() => {
		return visionClient.objectLocalization(photoUrl);
	})
	.then(results => {
		const [result] = results;
		const objects = result.localizedObjectAnnotations;
		const object_data = {data: []};
		
		objects.forEach(object => {
			console.log(`Name: ${object.name}`);
			console.log(`Confidence: ${object.score}`);
			
		  	object_data.data.push({
		  		name: object.name, 
		  		score: object.score
		  	});

		});
		
		db.collection('results').doc('result').set(object_data);

	})
	.catch(err => console.log(err));
})
