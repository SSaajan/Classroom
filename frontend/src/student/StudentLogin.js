import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


import Header from '../containers/header';

import image from '../res/LoginSVG.svg';
import '../styles/style.css';
import '../styles/login.css';

const StudentLogin = ({ props }) => {

    useEffect(() => {
        props('');
    }, []);

    const[loggedIn, setLoggedIn] = useState(false);
    const[signup, setSignup] = useState("false");

    const[mail, setmail] = useState('');
    const[password, setpassword] = useState('');
    const[roll, setRoll] = useState('');
    const[name, setName] = useState('');
    const[dept, setDept] = useState('');    
    const[sec, setSec] = useState('');
    const[phone, setPhone] = useState('');

    const setMail = (mail) => {
        setmail(mail);
    }
    const setPassword = (password) => {
        setpassword(password);
    }
    const setname = (name) => {
        setName(name);
    }
    const setDepartment = (dept) => {
        setDept(dept);
    }
    const setphone = (phone) => {
        setPhone(phone);
    }
    const setSection = (sec) => {
        setSec(sec);
    }
    const setRollNumber = (roll) => {
        setRoll(roll);
    }

    if(loggedIn){
        return <Redirect to = '/sClasses'/> ;
    }

    const changeSignup = () => {
        if(signup == 'false'){
            setSignup('true');
        }
        else {
            setSignup('false');
        }
    }
    
    const submit = (e) => {
        e.preventDefault();
        const url = 'http://127.0.0.1:8000/authenticate/' + mail + '/' + password;
        axios.get(url)
        .then((res) => {
            if(res.data !== 'false'){
                props(res.data.RollNumber);
                setLoggedIn(true);
            }
        });
    }

    const handleSignup = (e) => {
        e.preventDefault();
        let temp = {
            "RollNumber": roll,
            "Name": name,
            "phone": phone,
            "mail": mail,
            "department": dept,
            "section": sec,
            "password": password
        }
        //console.log(temp)
        axios({
            method:'POST',
            url:'http://127.0.0.1:8000/students/',
            data: {
                "RollNumber": roll,
                "Name": name,
                "phone": phone,
                "mail": mail,
                "department": dept,
                "section": sec,
                "password": password
            }
        })
        changeSignup();
    }

    return(
        <div>
            <header>
                <NavLink Link to='/'>
                    <h1>Classroom</h1>
                </NavLink>
                {
                    (signup === "false")
                    ?
                    <div class="Signup">
                        <p>New user? Sign up to<br/>create an account</p>
                        <button onClick={changeSignup}>SignUp</button>
                    </div>
                    :<div class="Signup">
                        <p>Already have an account?<br/>Click to login</p>
                        <button onClick={changeSignup}>Login</button>
                    </div>
                }
            </header>
            <div className="login">
                <img src={image} alt=""/>
                {
                    (signup === "false")
                    ?<div className="login-section">
                        <h1>Student Login</h1>
                        <div className="login-card">
                            <form action="submit" onSubmit={(e) => {submit(e)}}>
                                <input type="text" placeholder="Maid-ID" 
                                onChange={
                                    e => setMail(e.target.value)
                                }
                                required/>
                                <input type="password" placeholder="Password"
                                onChange={
                                    e => setPassword(e.target.value)
                                }
                                required/>
                                <button className="loginButton" type='submit'>Login</button>
                            </form>
                        </div>
                    </div>
                    :<div className="signup-section">
                        <h1>Student Signup</h1>
                        <div className="signup-card">
                            <form action="submit" onSubmit={(e) => {handleSignup(e)}}>
                                <input type="text" placeholder="Name" 
                                onChange={
                                    e => setname(e.target.value)
                                }
                                required/>
                                <input type="text" placeholder="Maid-ID" 
                                onChange={
                                    e => setMail(e.target.value)
                                }
                                required/>
                                <input type="password" placeholder="Password"
                                onChange={
                                    e => setPassword(e.target.value)
                                }
                                required/>
                                <input type="text" placeholder="Roll number" 
                                onChange={
                                    e => setRollNumber(e.target.value)
                                }
                                required/>
                                <input type="text" placeholder="Phone" 
                                onChange={
                                    e => setphone(e.target.value)
                                }
                                required/>
                                <input type="text" placeholder="Department" 
                                onChange={
                                    e => setDepartment(e.target.value)
                                }
                                required/>
                                <input type="text" placeholder="Section" 
                                onChange={
                                    e => setSection(e.target.value)
                                }
                                required/>
                                <button className="signupButton" type='submit'>Signup</button>
                            </form>
                        </div>
                    </div>
                }
    
            </div>
            <div className="footer">
                <ul className="footer-links">
                    <li><NavLink Link to=''>Terms of Use</NavLink></li>
                    <li><NavLink Link to=''>Classroom - Saajan</NavLink></li>
                    <li><NavLink Link to=''>Privacy policy</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default StudentLogin;
