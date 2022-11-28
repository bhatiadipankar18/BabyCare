import React, { useState } from 'react';

const UploadFile = ({poemId}) => {
    const [files, setFiles] = useState('');
    //state for checking file size
    const [fileSize, setFileSize] = useState(true);
    // for file upload progress message
    const [fileUploadProgress, setFileUploadProgress] = useState(false);
    //for displaying response message
    const [fileUploadResponse, setFileUploadResponse] = useState(null);
    //base end point url
    const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8888";


    const uploadFileHandler = (event) => {
        setFiles(event.target.files);
    };


    const fileSubmitHandler = (event) => {
        event.preventDefault();
        setFileSize(true);
        setFileUploadProgress(true);
        setFileUploadResponse(null);

        const formData = new FormData();




        for (let i = 0; i < files.length; i++) {
            formData.append(`files`, files[i])
        }
        // let obj1={childId:9,poemName:"hehe",fileName:"xixi"}
        console.log("poemId",poemId)
        formData.append(`poemId`, poemId)
        const requestOptions = {
            method: 'POST',
            body: formData
        };

        //独立写一个请求 请求2和1
        console.log(formData)
        fetch(FILE_UPLOAD_BASE_ENDPOINT + '/upload', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message
                    const error = (data && data.message) || response.status;
                    setFileUploadResponse(data.message);
                    return Promise.reject(error);
                }

                console.log(data.message);
                setFileUploadResponse(data.message);
            })
            .catch(error => {
                console.error('Error while uploading file!', error);
            });
        setFileUploadProgress(false);
    };

    return (

        <form onSubmit={fileSubmitHandler}>
            <input type="file"  onChange={uploadFileHandler} />
            <button type='submit'>Upload</button>
            {!fileSize && <p style={{ color: 'red' }}>File size exceeded!!</p>}
            {fileUploadProgress && <p style={{ color: 'red' }}>Uploading File(s)</p>}
            {fileUploadResponse != null && <p style={{ color: 'green' }}>{fileUploadResponse}</p>}
        </form>

    );
}
export default UploadFile;