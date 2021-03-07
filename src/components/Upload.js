import React from "react";
import "../config/constants";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class Upload extends React.Component {

    constructor(props) {
        super(props);
    }

    async handleUploadSuccess(filename) {
        
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

            // TODO - Set the result to the items using add items
            console.log("ALL THE NAMES");
            postData.forEach(data => {
                
                console.log(data.name);
                //this.props.addItem(data.name);
            })
        })
    }

    componentDidMount() {
        this.getResults();
    }

    render() {
        return (
            <div>
                <h1>Upload</h1>
                <label>
                <a className = "btn btn-primary"> Upload a file here </a>
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
            </div>
        );
    }
}

export default Upload;