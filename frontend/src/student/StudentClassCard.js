import React from 'react'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/card.css';
import '../styles/style.css';

const StudentClassCard = ({ props, classFunc }) => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();
    var today = d.getDay(), dayNum, index = 0, day="", time="";

    const[classroom, setClassroom] = useState({});
    const[timing, setTiming] = useState({});
    var url = 'http://127.0.0.1:8000/classes/timings/' + props;
    
    useEffect(async () => {
        console.log(url);
        var result = await axios.get(url);
        setClassroom(result.data);
        if(result.data.time.length != 0){
            dayNum = (result.data.time[0]).split(',')[0] - 1;
            for(let i = 0; i < result.data.time.length; i++){
                if(result.data.time[i].split(',')[0] - 1 == today){
                    dayNum = result.data.time[i].split(',')[0] - 1;
                    index = i;
                    break;
                }
                if(result.data.time[i].split(',')[0] > today){
                    dayNum = (result.data.time[i]).split(',')[0] - 1;
                    index = i;
                }
            }
            if(dayNum == today){
                day = "Today"
            }
            else{
                day = days[dayNum];
            }
            time = (result.data.time[index]).split(',')[1];
        }
        setTiming({day:day, time:time})
    }, [url]);

    return(
        <div className="classes" onClick={() => {classFunc(classroom.id)}}>
            <NavLink Link to='/sclasses/class' style={{textDecoration:'none'}}>
                <div className="class-card">
                    <div className="colour"></div>
                    <div className="inner-card">
                        <h3>{classroom.name}</h3>
                        <p>Robert Lee</p>
                        <div className="class-details">
                            <p>Department: {classroom.department}</p>
                            <p>Timing - {timing.day} {timing.time}</p>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    );
}

export default StudentClassCard;