import React, { useEffect, useState } from 'react';
import Plus from './Plus_button.png';
import './Photos.css';
import fetch from 'node-fetch';

const Photos = (props) => {
    const [photos, setphoto] = useState([]);
    // const [upString, setupString] = useState('');

    useEffect(() => {
        getPhotos();
    }, [props.uid])

    // useEffect(() => {
    //     postPhoto();
    // }, [photos]);

    // fetch photos
    const getPhotos = () => {
        fetch(`/db/photos/fetch/${props.uid}`)
        .then(response => response.json())
        .then(info => setphoto(info));
    };

    // upload
    // prep string
    const prepFile = () => {
        let file = document.getElementById('inputPhoto').files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            let img = new Image();
            img.src = e.target.result;
            img.onload = (ev) => {
                let canvas = document.createElement('canvas');
                canvas.width = 280;
                canvas.height = 280;
                let ctx = canvas.getContext('2d');
                // rescale photo while retaining aspect ratio
                if (img.width > img.height || img.width == img.height) {
                    let ratio = img.width / 280;
                    let newWidth = 280;
                    let newHeight = img.height / ratio
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
                } else if (img.width < img.height) {
                    let ratio = img.height / 280;
                    let newWidth = img.width / ratio;
                    let newHeight = 280;
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
                };
                // convert image to base64
                let data = canvas.toDataURL()
                // setupString(data);
                postPhoto(data);
            };
        };
    };

    // post to db
    const postPhoto = (imgString) => {
        let img = imgString;
        let uid = props.uid;
        if (img.length > 0) {
            fetch('/db/photos/upload', {
                mode: 'cors',
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "uid": uid,
                    "img": img
                })
            })
            .then(response => {
                if (response.status === 200) {
                    // document.querySelector('input[type=file]').reset();
                    getPhotos();
                    // setupString('');
                } else {
                    console.log(`error: ${response.status}`)
                };
            });
        } else {
            console.log('nothing to upload');
        }
    };

    // delete photo
    const delPhoto = (e) => {
        let btnid = e.target.id;
        let pid = btnid.slice(3);
        console.log(pid);
        fetch(`/db/photos/del/${pid}`)
        .then(response => {
            if (response.status === 200) {
                document.getElementById(pid).remove();
            } else if (response.status === 500) {
                console.log(response.body.error);
            };
        });
    };



    return (
        <div id='photoComp' >
            <h1 id='photosTitle'>Photos</h1>
            <button onClick={props.dashPage} id='toDashBtn'>Dashboard</button>
            <div id='photoBoard' >
                <div id='fileDiv'>
                    <label htmlFor='inputPhoto' id='customUpload'>
                        <img id='plusPreview' src={Plus} ></img>
                    </label>
                    <input type='file' id='inputPhoto' onChange={prepFile}></input>
                </div>
                {photos.length > 0 ? [
                    photos.map(photo => (
                        <div key={`p${photo.p_id}`} id={photo.p_id} className='imgDiv'>
                            <img src={`${photo.p_img}`} alt='photo' className='imgStyle'/>
                            <p id={`btn${photo.p_id}`} onClick={delPhoto} class='photoDelBtn' >X</p>
                        </div>
                    ))
                ] : null}
            </div> 
        </div>
    );
};

export default Photos;