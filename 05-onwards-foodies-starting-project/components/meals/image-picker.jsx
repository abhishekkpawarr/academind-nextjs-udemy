'use client';

import classes from './image-picker.module.css';
import {useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker({label, name}) {
    const [pickedImage, setPickedImage] = useState()
    const imageInput = useRef();

    function handlePickImage() {
        imageInput.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setPickedImage(reader.result);
        }

        reader.readAsDataURL(file);

    }

    return <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {pickedImage && <Image src={pickedImage} alt={'User selected image'} fill/>}
                {!pickedImage && <p>No image picked.</p>}
            </div>
            <input required onChange={handleImageChange} ref={imageInput} className={classes.input} type={'file'}
                   id={name}
                   accept={'image/jpeg, image/png'}
                   name={name}/>
            <button className={classes.button} type={'button'} onClick={handlePickImage}>Pick an Image</button>
        </div>
    </div>
}