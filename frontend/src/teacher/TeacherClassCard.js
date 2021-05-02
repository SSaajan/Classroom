import React from 'react'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/card.css';
import '../styles/style.css';

const TeacherClassCard = ({ props, classFunc, codefunc }) => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();
    var today = d.getDay(), dayNum, index = 0, day="", time="";

    const[classroom, setClassroom] = useState({});
    const[timing, setTiming] = useState({});
    const[num, setNum] = useState(0);
    var url = 'http://127.0.0.1:8000/classes/timings/' + props;

    useEffect(async () => {
        console.log(url);
        var result = await axios.get(url);
        setClassroom(result.data);
        //To find number of students in class
        var url2 = 'http://127.0.0.1:8000/classes/students/' + result.data.code;
        var result2 = await axios.get(url2)
        setNum(result2.data.students.length)
        //To display class timings based on if its after current day or on current day
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
        <div className="classes" onClick={() => {classFunc(classroom.id);codefunc(classroom.code)}}>
            <NavLink Link to='/tclasses/class' style={{textDecoration:'none'}}>
                <div className="class-card">
                    <div className="colour"></div>
                    <div className="inner-card">
                        <h3>{classroom.name}</h3>
                        <p style={{color:'#ADA5FF'}}>{classroom.code}</p>
                        <div className="class-details" style={{marginTop:'6%'}}>
                            <p>{num} students</p>
                            <p>Department: {classroom.department}</p>
                            <p>Timing - {timing.day} {timing.time}</p>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    );
}

export default TeacherClassCard;