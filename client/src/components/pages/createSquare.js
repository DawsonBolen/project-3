import React, { useState } from 'react';
import '../styles/createSquare.css';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_SQUARE } from '../../utils/mutation';
import Auth from '../../utils/auth';

const CreateSquare = () => {
    const profile = Auth.getProfile();
    const userId = profile.data._id

    const navigate = useNavigate();

    const [formData, setData] = useState({ name: '', shortDescription: '', longDescription: '', image: '' })

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
                    image: formData.image,
                },
            });

            navigate('/Home');
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <main className='create-square-body'>
            <h1>Create A New Square</h1>
            <form onSubmit={handleFormSubmit} id='create-square'>
                <input onChange={handleChange} value={formData.name} className='create-input' type='text' placeholder='Name' name='name'></input>
                <input onChange={handleChange} value={formData.shortDescription} className='create-input' type='text' placeholder='Short Description' name='shortDescription'></input>
                <h5 id='Summary-label'>Summary</h5>
                <input onChange={handleChange} value={formData.image} className='create-input' type='text' placeholder='Image Url' name='image'></input>
                <input onChange={handleChange} value={formData.longDescription} id='summary' type='text' name='longDescription'></input>
                <button onClick={handleFormSubmit} type='submit' className='create-square'>Create Square</button>

            </form>
        </main>
    )
}

export default CreateSquare