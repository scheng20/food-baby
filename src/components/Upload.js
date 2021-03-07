import React from "react";
import "../config/constants";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import "./component.css";
import Navbar from "./Navbar"
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

class Upload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            photoURL: ""
        }

        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async handleUploadSuccess(filename) {

        try {
            let { bucket, fullPath } = await firebase.storage().ref("images").child(filename).getMetadata();
            console.log("bucket", bucket);
            console.log("fullPath", fullPath);

            let downloadURL = await firebase.storage().ref("images").child(filename).getDownloadURL();
            console.log("downloadURL", downloadURL);
            this.setState({ photoURL: downloadURL });

            let newPhoto = {
                url: downloadURL,
                bucket,
                fullPath
            }
            console.log("newPhoto", newPhoto);

            await firebase.firestore().collection("photos").add(newPhoto);
        }

        catch (err) {
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

    handleClose() {
        this.setState({ photoURL: "" });
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

            console.log("ALL THE NAMES");
            postData[0].data.forEach(data => {
                if(data && data.name !== null) {
                    console.log("data", data.name)
                    const newItemList = this.props.itemList;
                    newItemList.push(data.name.toLowerCase());
                    this.props.addItem(newItemList);
                }
            })
        })
    }

    componentDidMount() {
        this.getResults();
    }

    render() {
        return (
            <div className = "container container-full-page">
                <div className = "row top-bar">
                    <div className = "col">
                        <h1 className = "h1-not-abs">Upload</h1>
                    </div>
                    <div className = "col">
                        <a href="/">
                        <i class="fas fa-home fas-brown fa-lg"></i>
                        </a>
                    </div>
                </div>
                <div className = "upload-area">
                    <label>
                        <a className="btn btn-primary"> Upload Photo </a>
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
                    &nbsp;
                    <Link className="btn btn-primary" to="/list" onClick={this.handleClose}> Confirm </Link>
                </div>
                <Image style={{ width: '100%' }} src={this.state.photoURL} responsive />
                <Navbar/>
            </div>
        );
    }
}

export default Upload;