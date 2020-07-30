import React from 'react';
import bruflix from '../../assets/img/bruflix.png';
import './menu.css';
import Button from '../button/index';

function Menu() {
    return (
        <nav className="Menu">
            <a href="/">
                <img className="Logo" src={bruflix} alt="BruFlix" />
            </a>
            <Button as="a" href="/" className="Button">
                Novo Video
            </Button>
        </nav>
    )
}

export default Menu;