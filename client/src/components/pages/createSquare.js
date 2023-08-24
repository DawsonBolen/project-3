import React from 'react'
import '../styles/createSquare.css';

const CreateSquare = () => {
    return (
        <div className='create-square-body'>
            <h1>Create A New Square</h1>
            <form id='create-square'>
                <input className='create-input' type='text' placeholder='Name'></input>
                <input className='create-input' type='text' placeholder='Short Description'></input>
                <h5 id='Summary-label'>Summary</h5>
                <input id='summary' type='text'></input>
                <button className='create-square'>Create Square</button>

            </form>
        </div>
    )
}

export default CreateSquare