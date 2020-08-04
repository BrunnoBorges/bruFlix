import React from 'react';
import { Link } from 'react-router-dom';
import comedyFlix from '../../assets/img/comedyFlix.png';
import './menu.css';
import Button from '../Button/index';

function Menu() {
    return (
        <nav className="Menu">
            <Button style={{ border: "none" }} as={Link} to="/">
                <img className="Logo" src={comedyFlix} alt="comedyFlix" />
            </Button>
            <Button as={Link} to="/cadastro/video" className="Button">
                Novo Video
            </Button>
        </nav>
    )
}

export default Menu;