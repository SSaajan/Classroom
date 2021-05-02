import React from 'react';
import { Redirect } from 'react-router-dom'

import '../styles/ProfileDropDown.css';

const ProfileDropDown = ({prop}) => {

    const logout = () => {
        prop('none');
        return <Redirect to = '/login'/>;
    }

    console.log(prop);
    return(
        <div className="Menu">
            <ul className="MenuList">
                <li className="MenuItem">View Profile</li>
                <li className="MenuItem" onClick={logout}>Logout</li>
            </ul>
        </div>
    );
}

export default ProfileDropDown;
