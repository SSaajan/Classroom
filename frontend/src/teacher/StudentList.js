import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';

import userimg from '../res/User Image.png';

import '../styles/style.css';
import '../styles/info.css';
import '../styles/assignment.css';

import ProfileDropDown from '../components/ProfileDropDown';

const StudentList = ({ classCode , func }) => {

    const[DropDown, SetDropDown] = useState(0);
    const[list, setList] = useState();

    var url = 'http://127.0.0.1:8000/classes/students/' + classCode
    useEffect(async () => {
        console.log(url)
        var result = await axios.get(url)
        console.log(result)
        var temp = [];
        for(let i = 0; i < result.data.students.length; i++){
            let details = result.data.students[i].split(',')
            temp.push({name:details[2], RollNumber:details[1]})
        }
        setList(temp)
    }, [url])
    console.log(list)

    const changeDropDown = () => {
        if(DropDown == 1){
            SetDropDown(0);
        }
        else {
            SetDropDown(1);
        }
    }
    var menu;
    if(DropDown == 1){
        menu = <ProfileDropDown prop={func}/>
    }

    return(
        <div>
            <header>
                <NavLink Link to='/'>
                    <h1>Classroom</h1>
                </NavLink>
                <div className="header-actions">
                    <img className="user" style={{width:'45%'}} src={userimg} alt="User DP" onClick={changeDropDown}/>
                </div>
                {menu}
            </header>
            <div className="outer-container">
                <div className="main">
                    <div>
                        <h2 style={{marginBottom:'5%'}}>Students joined</h2>  
                    </div> 
                    <div className="container">
                        <div className="assignments">
                            <ul>
                            {
                                (typeof(list) === "undefined")
                                ? <p>No students</p>
                                :list.map((item) => {
                                    return(
                                    <li>
                                        <div className="line"></div>
                                        <div className="card">
                                            <h3 style={{marginTop:'1%'}}>{item.name}</h3>
                                            <p className="deadline">Roll number: {item.RollNumber}</p>
                                            <p className="text">{item.description}</p>
                                        </div>
                                    </li>
                                    );
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentList;