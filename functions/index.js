const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
const vision = require('@google-cloud/vision');
const visionClient =  new vision.ImageAnnotatorClient();
let Promise = require('promise');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.analyzeImage = functions.firestore.document('photos/{document}').onCreate((snap, context) => {

	console.log('SNAP', snap)
	console.log('CONTEXT', context)

	const data = snap.data();
	console.log('DATA IN IS', data)
	const photoUrl = "gs://" + data.bucket + "/" + data.fullPath;
	console.log('url is', photoUrl);

	return Promise.resolve()
	.then(() => {
		return visionClient.objectLocalization(photoUrl);
	})
	.then(results => {
		
		const [result] = results;

		//console.log('VISION data all is: ', result)
		
		/*
		const labels = result.labelAnnotations;
		console.log('Labels: ');
		labels.forEach(label => console.log(label.description));
		*/

		const objects = result.localizedObjectAnnotations;

		objects.forEach(object => {
		  console.log(`Name: ${object.name}`);
		  console.log(`Confidence: ${object.score}`);
		  const veritices = object.boundingPoly.normalizedVertices;
		  veritices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
		});
		
	})
	.catch(err => console.log(err));

	/*
	const [result] = await client.objectLocalization(gcsUri);
	const objects = result.localizedObjectAnnotations;

	objects.forEach(object => {
	  console.log(`Name: ${object.name}`);
	  console.log(`Confidence: ${object.score}`);
	  const veritices = object.boundingPoly.normalizedVertices;
	  veritices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
	});
	*/
	
	/*
	  // Performs label detection on the image file
	  const [result] = await client.labelDetection('./resources/wakeupcat.jpg');
	  const labels = result.labelAnnotations;
	  console.log('Labels:');
	  labels.forEach(label => console.log(label.description));
	*/

})
