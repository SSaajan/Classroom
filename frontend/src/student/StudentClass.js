import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import userimg from '../res/User Image.png';
import joinClass from '../res/JoinClass.svg';

import '../styles/card.css';
import '../styles/style.css';
import '../styles/Popup.css';

import StudentClassCard from '../student/StudentClassCard';
import ProfileDropDown from '../components/ProfileDropDown';

const Classes = ({ user, func, classFunc }) => {

    const[IDs, setIDs] = useState([]);
    const[DropDown, SetDropDown] = useState(0);
    const[Popup, SetPopup] = useState(0);
    const[newClass, setNewClass] = useState('');

    var url = 'http://127.0.0.1:8000/students/enrolled/' + user + '/';
    useEffect(async () => {
        console.log(url);
        var result = await axios.get(url);
        let temp = []
        for(let i = 0;i < result.data.classes.length; i++){
            temp.push(result.data.classes[i].split(',')[0])
        }
        setIDs(temp);
    }, [url]);

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

    const changePopup = () => {
        if(Popup == 1){
            SetPopup(0);
        }
        else {
            SetPopup(1);
        }
    }

    var menu, popupScreen;

    if(DropDown == 1){
        menu = <ProfileDropDown prop={func}/>
    }

    if(Popup == 1){
        popupScreen = <div className="PopupContainer">
                            <div className="JoinPopup">
                                <p className="JoinHeading">Enter Class code</p>
                                <form action="submit" onSubmit={(e) => {submitClass(e)}}>
                                    <input value={newClass} type="text" placeholder="Class Code" onChange={(e)=>setClassCode(e.target.value)}/>
                                    <button>Join</button>
                                </form>
                                <p onClick={changePopup} className="cancel">Cancel</p>
                            </div>
                        </div>
    }

    const updateIDs = (val) => {
        let temp = IDs;
        temp.push(val);
        setIDs(temp);
    }

    const submitClass = (e) => {
        e.preventDefault();
        const ClassURL = 'http://127.0.0.1:8000/class/exists/' + newClass;
        console.log(ClassURL);
        axios.get(ClassURL)
        .then(function(data) {
        const items = data;
        console.log(items.data)
        if(items.data === 'false'){
            setNewClass('');
        }
        else{
            changePopup();
            axios({
                method:'POST',
                url:'http://127.0.0.1:8000/class/enroll/',
                data: {
                    "classroom":items.data.id,
                    "student":user
                }
            })
            updateIDs(items.data.code);
            setNewClass('');
        }
        })
    }

    const setClassCode = (code) => {
        setNewClass(code)
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
                </div>
                {menu}
            </header>
            <ul className="ClassList">
                {IDs.map((values) => {
                    return(
                        <li><StudentClassCard props={values} classFunc={classFunc}/></li>
                    );
                })}
            </ul>
            {popupScreen}
        </div>
    );
}

export default Classes;