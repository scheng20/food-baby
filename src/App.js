import './App.css';
import './config/constants';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

function App() {

	const appTokenKey = "appToken";

	async function handleUploadSuccess(filename) {

		console.log("going into handleUploadSuccess");
		
	    try {
	    	
	        let { bucket, fullPath } = await firebase.storage().ref('images').child(filename).getMetadata();

	        console.log('bucket', bucket);
	        console.log('fullPath', fullPath);

	        let downloadURL = await firebase.storage().ref('images').child(filename).getDownloadURL();
	        console.log('downloadURL', downloadURL);

	        //let { uid, email, displayName } = await firebase.auth().currentUser;

	        /*
	        let newPhoto = {
	            url: downloadURL,
	            userName: displayName,
	            userId: uid,
	            email,
	            bucket,
	            fullPath
	        }*/

	       	let newPhoto = {
	            url: downloadURL,
	            bucket,
	            fullPath
	        }

	        console.log('newPhoto', newPhoto);

	        await firebase.firestore().collection('photos').add(newPhoto);
	    }

	    catch(err) {
	        console.error(err);
	    }
	}

	function handleUploadStart() {
		console.log("UPLOAD IS STARTING!");
	}

	function handleUploadError() {
		console.log("UPLOAD GOT AN ERROR!");
	}

	function handleProgress() {
		console.log("UPLOAD IN PROGRESS!");
	}
	
	return (
	    <div className="App">
	      <header className="App-header">
	       	<label>
			   <p> Upload a file here </p>
			   <FileUploader
					hidden
					accept="image/*"
					storageRef={firebase.storage().ref('images')}
					onUploadStart={handleUploadStart}
					onUploadError={handleUploadError}
					onUploadSuccess={handleUploadSuccess}
					onProgress={handleProgress}
			   />
			</label>
	      </header>
	    </div>
	);
}

export default App;
