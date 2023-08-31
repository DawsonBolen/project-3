import React, { useState } from 'react';
import '../styles/createSquare.css';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_SQUARE } from '../../utils/mutation';
import Auth from '../../utils/auth';
import { GET_SQUARES } from '../../utils/queries';
import axios from 'axios'

const CreateSquare = () => {
    const profile = Auth.getProfile();
    const userId = profile.data._id

    const navigate = useNavigate();

    const [formData, setData] = useState({ name: '', shortDescription: '', longDescription: '' })

    const [postImage, setPostImage] = useState({ image: '' })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...formData, [name]: value });
    };

    const [createSquare] = useMutation(CREATE_SQUARE);

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();

            const response = await createSquare({
                variables: {
                    name: formData.name,
                    shortDescription: formData.shortDescription,
                    longDescription: formData.longDescription,
                    image: postImage.image,
                },
                refetchQueries: [{ query: GET_SQUARES }],
            });

            navigate('/Home');
        } catch (e) {
            console.log(e)
        }
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, image: base64 })
    }

    return (
        <main className='create-square-body'>
            <h1>Create A New Square</h1>
            <div id='create-square-line'></div>
            <form onSubmit={handleFormSubmit} id='create-square'>
                <input onChange={handleChange} value={formData.name} className='create-input' type='text' placeholder='Name' name='name'></input>
                <input onChange={handleChange} value={formData.shortDescription} className='create-input' type='text' placeholder='Short Description' name='shortDescription'></input>
                <div className='image-upload-input'>
                    <h3>Upload Image</h3>

                    <input onChange={(e) => handleFileUpload(e)} type='file' accept='.jpeg, .png, .jpg' placeholder='Image Url' name='image'></input>
                </div>
                <h5 id='Summary-label'>Summary</h5>
                <textarea onChange={handleChange} value={formData.longDescription} id='summary' type='text' name='longDescription'></textarea>
                <button onClick={handleFormSubmit} type='submit' className='create-square'>Create Square</button>

            </form>
        </main>
    )
}

export default CreateSquare

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        };
    })
}