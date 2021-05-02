import React from 'react'
import { NavLink } from 'react-router-dom';

import '../styles/welcome.css';
import '../styles/footer.css';
import '../styles/style.css';

import Teacher from "../res/TeacherSVG.svg";
import Student from "../res/StudentSVG.svg"

const Welcome = () => {
    return(
        <div>
            <header>
                <NavLink Link to='/'>
                    <h1>Classroom</h1>
                </NavLink>
            </header>
            <div className="content">
                <div className="welcome">
                    <h1>Welcome!</h1>
                    <p>Pick an option to proceed to<br/>login/signup</p>
                </div>

                <div className="options">
                    <div className="option-card-container">
                        <NavLink Link to='/login/teacher'>
                            <div className="option-card">
                                <img src={Teacher} alt="Teacher Illustration"/>
                                <p>Teacher</p>
                            </div>
                        </NavLink>
                    </div>

                    <div className="option-card-container">
                        <NavLink Link to='/login/student'>
                            <div className="option-card">
                                <img src={Student} alt="Student Illustration"/>
                                <p>Student</p>
                            </div>
                        </NavLink>
                    </div>
                </div>

                <div className="footer-main">
                    <ul className="footer-main-links">
                        <li><NavLink Link to='#'>Terms of Use</NavLink></li>
                        <li><NavLink Link to='#'>Classroom - Saajan</NavLink></li>
                        <li><NavLink Link to='#'>Privacy policy</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Welcome