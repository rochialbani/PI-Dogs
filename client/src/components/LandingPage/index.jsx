import React from "react";
import {Link} from 'react-router-dom'
import s from '../../styles/LandingPage.module.css'

const LandingPage = () =>{
    return(
        <div className={s.img}>
            <div className={s.conteiner}>
            <h1>Welcome to the Dog Api</h1>
            <Link to='/home'>
                <button className={s.cta}><span>Enter</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
                </svg></button>
            </Link>
        </div>
        </div>
    )
}

export default LandingPage;