import axios from 'axios';
import React, { useRef } from 'react';

function Upload() {

    const fileInputRef = useRef(null);

    async function onUploadClick() {
        const file = fileInputRef.current.files[0];
        const base64 = await toBase64(file);
        await axios.post('/api/people/upload', { base64 });
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    // const fileInputRef = useRef(null);

    // const onButtonClick = async () => {
    //     const file = fileInputRef.current.files[0];
    //     const base64 = await toBase64(file);
    //     const name = file.name;
    //     await axios.post('/api/imageupload/upload', { base64Image: base64, name });
    //     //window.location.href = `/images/index?imagename=${name}`;
    //     window.location.href = '/images/GenerateCsv';
    // }

    return <div className='container'>
        <div className='row'>
            <input type='file' ref={fileInputRef} className='form-control col-md-4' />
            <button className='btn btn-primary col-md-4' onClick={onUploadClick}>Upload</button>
        </div>
    </div>
}

export default Upload;