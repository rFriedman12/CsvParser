import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Home() {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function getPeople() {
            const { data } = await axios.get('/api/people/getall');
            setPeople(data);
        }

        getPeople();
    }, []);

    async function onDeleteAllClick() {
        await axios.post('/api/people/deleteall');
        setPeople([]);
    }

    return <div className='container'>
        <button className='btn btn-block btn-danger' onClick={onDeleteAllClick}>Delete All</button>
        <table className='table table-hover table-bordered mt-3'>
            <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Email</th>
            </tr>
            {people.map(p => {
                return <tr>
                    <td>{p.id}</td>
                    <td>{p.firstName}</td>
                    <td>{p.lastName}</td>
                    <td>{p.age}</td>
                    <td>{p.address}</td>
                    <td>{p.email}</td>
                </tr>
            })}
        </table>
    </div>
}

export default Home;