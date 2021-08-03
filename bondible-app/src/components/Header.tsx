import React from "react";
import './Header.scss';
import { ConnectMetaMask } from './ConnectMetaMask';

interface Props {
    text?: string
}

const Header: React.FC<Props> = () => {
    //console.log(window.Infinity)
    
    return(
        <nav>
            <div className="container">
                    <h1 className="logo">Bondible</h1>
                    <button className="nav-btn" onClick={ConnectMetaMask}>Button</button>
            </div>
        </nav>
    )
}

export default Header;