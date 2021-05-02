import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import userimg from '../res/User Image.png';
import joinClass from '../res/JoinClass.svg';

import '../styles/card.css';
import '../styles/style.css';

import TeacherClassCard from '../teacher/TeacherClassCard';
import ProfileDropDown from '../components/ProfileDropDown';

const Classes = ({ user, func, classFunc, codefunc }) => {

    const[IDs, setIDs] = useState([]);
    const[DropDown, SetDropDown] = useState(0);
    const[CreatePopup, setPopup] = useState('false');

    const[className, setClassName] = useState('')
    const[subjectCode, setSubCode] = useState('')
    const[dept, setDept] = useState('')

    const updateName = (name) => {
        setClassName(name);
    }
    const updateCode = (code) => {
        setSubCode(code);
    }
    const updateDept= (dept) => {
        setDept(dept);
    }

    var url = 'http://127.0.0.1:8000/teacher/classes/' + user;
    useEffect(async () => {
        console.log(url);
        var result = await axios.get(url);
        let temp = []
        console.log(result.data.createdBy)
        for(let i = 0;i < result.data.createdBy.length; i++){
            temp.push(result.data.createdBy[i].split(',')[0])
        }
        setIDs(temp);
    }, [url]);

    console.log(IDs);
    if(user == 'none'){
        return(<Redirect to = ''/>);
    }

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

    const changePopup = () => {
        if(CreatePopup === 'false'){
            setPopup('true');
        }
        else{
            setPopup('false');
        }
    }
    const createClass = (e) => {
        e.preventDefault();     
        axios({
            method:'POST',
            url:'http://127.0.0.1:8000/classes/',
            data: {
                "name": className,
                "subject_code": subjectCode,
                "department":dept,
                "teacher":user
            }
        })
        setPopup('false')
    }
    var CreateClassPopup;
    if(CreatePopup == 'true'){
        CreateClassPopup = <div className="PopupContainer">
                                <div className="JoinPopup">
                                    <p className="JoinHeading">Create Class</p>
                                    <form action="submit" onSubmit={(e) => {createClass(e)}}>
                                        <input value={className} type="text" placeholder="Enter Class name" onChange={(e)=>updateName(e.target.value)}/>
                                        <input value={subjectCode} type="text" placeholder="Enter subject code" onChange={(e)=>updateCode(e.target.value)}/>
                                        <input value={dept} type="text" placeholder="Enter department" onChange={(e)=>updateDept(e.target.value)}/>
                                        <button>Create</button>
                                    </form>
                                    <p onClick={changePopup} className="cancel">Cancel</p>
                                </div>
                            </div>
    }

    return(
        <div>
            <header>
                <NavLink Link to='/'>
                    <h1>Classroom</h1>
                </NavLink>
                <div className="header-actions">
                    <button className="join"><img src={joinClass} alt="Join Class Button" onClick={changePopup}/></button>
                    <img className="user" src={userimg} alt="User DP" onClick={changeDropDown}/>
                    {menu}
                </div>
            </header>
            <ul className="ClassList">
                {IDs.map((values) => {
                    return(
                        <li><TeacherClassCard props={values} classFunc={classFunc} codefunc={codefunc}/></li>
                    );
                })}
            </ul>
            {CreateClassPopup}
        </div>
    );
}

export default Classes;