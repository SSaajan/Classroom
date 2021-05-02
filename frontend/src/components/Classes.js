import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import userimg from '../res/User Image.png';
import joinClass from '../res/JoinClass.svg';

import '../styles/card.css';
import '../styles/style.css';

import StudentClassCard from '../student/StudentClassCard';

const Classes = ({ props }) => {

    const[IDs, setIDs] = useState([]);
    var url = 'http://127.0.0.1:8000/students/enrolled/' + props + '/';
    useEffect(async () => {
        console.log(url);
        var result = await axios.get(url);
        let temp = []
        for(let i = 0;i < result.data.classes.length; i++){
            temp.push(result.data.classes[i].split(',')[0])
        }
        setIDs(temp);
    }, [url]);

    console.log(IDs)

    return(
        <div>
            <header>
                <NavLink Link to='/'>
                    <h1>Classroom</h1>
                </NavLink>
                <div className="header-actions">
                    <button className="join"><img src={joinClass} alt="Join Class Button"/></button>
                    <img className="user" src={userimg} alt="User DP"/>
                </div>
            </header>
            <ul>
                {IDs.map((values) => {
                    return(
                        <li><StudentClassCard props={values}/></li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Classes;