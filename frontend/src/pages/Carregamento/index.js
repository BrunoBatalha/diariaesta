import React from 'react';
import logo from '../../img/logo-500.png'
import './style.css';

export default function Index({ carregamento }) {
    return (
        <>
            {carregamento ?
                <div className='carregamento-container d-flex align-items-center justify-content-center'>
                    <img src={logo} width='250' alt='logo' />
                </div>
                :
                <div className='carregamento-container d-none'>
                    <img src={logo} width='250' alt='logo' />
                </div>
            }
        </>
    )
}