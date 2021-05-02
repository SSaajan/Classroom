import React from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/style.css';

const Header = () => {
    return(
        <header>
            <NavLink Link to='/'>
                <h1>Classroom</h1>
            </NavLink>
            <div class="Signup">
                <p>New user? Sign up to<br/>create an account</p>
                <button>SignUp</button>
            </div>
        </header>
    );
}

export default Header;