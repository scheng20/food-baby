import "./App.css";
import "./config/constants";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import React, { Component } from "react";

class App extends Component {
	constructor() {
		super();

		this.handleUploadSuccess = this.handleUploadSuccess.bind(this)
		this.handleUploadStart = this.handleUploadStart.bind(this)
		this.handleUploadError = this.handleUploadError.bind(this)
		this.handleProgress = this.handleProgress.bind(this)
		this.getResults = this.getResults.bind(this);
	}

	async handleUploadSuccess(filename) {

		console.log("going into handleUploadSuccess");
		
	    try {
	        let { bucket, fullPath } = await firebase.storage().ref("images").child(filename).getMetadata();
	        console.log("bucket", bucket);
	        console.log("fullPath", fullPath);

	        let downloadURL = await firebase.storage().ref("images").child(filename).getDownloadURL();
	        console.log("downloadURL", downloadURL);

	       	let newPhoto = {
	            url: downloadURL,
	            bucket,
	            fullPath
	        }
	        console.log("newPhoto", newPhoto);

	        await firebase.firestore().collection("photos").add(newPhoto);
	    }

	    catch(err) {
	        console.error(err);
	    }
	}
	
	handleUploadStart() {
		console.log("UPLOAD IS STARTING!");
	}

	handleUploadError() {
		console.log("UPLOAD GOT AN ERROR!");
	}

	handleProgress() {
		console.log("UPLOAD IN PROGRESS!");
	}

	getResults() {
		firebase.firestore().collection("results").onSnapshot((snapshot) => {
			const postData = [];
			snapshot.forEach(doc => {
				let result = doc.data();
				postData.push(result);
			})
			console.log("RETURNING DATA");
			console.log(postData);
		})
	}

	componentDidMount() {
		this.getResults();
	}

	render() {
		return (
			<div className="App">
			<header className="App-header">
				<label>
				<p> Upload a file here </p>
				<FileUploader
						hidden
						accept="image/*"
						storageRef={firebase.storage().ref("images")}
						onUploadStart={this.handleUploadStart}
						onUploadError={this.handleUploadError}
						onUploadSuccess={this.handleUploadSuccess}
						onProgress={this.handleProgress}
				/>
				</label>
			</header>
			</div>
		);
	}
}

export default App;
