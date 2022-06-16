import React, { useState } from 'react';

function Generate() {

    const [amount, setAmount] = useState('');

    function onGenerateClick() {
        window.location.href = `/api/people/generate?amount=${amount}`;
    }

    return <div className='container'>
        <div className='row'>
            <input type='text' className='form-control col-md-4' placeholder='Amount' onChange={e => setAmount(e.target.value)} />
            <button className='btn btn-primary col-md-4' onClick={onGenerateClick}>Generate</button>
        </div>
    </div>
}

export default Generate;