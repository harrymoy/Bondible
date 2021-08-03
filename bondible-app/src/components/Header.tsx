import React from "react";
import './Header.scss';

interface Props {
    text?: string
}


const Header: React.FC<Props> = () => {

    return(
        <nav>
            <div className="container">
                    <h1 className="logo">Bondible</h1>
                    <button className="nav-btn">Button</button>
            </div>
        </nav>
    )
}

export default Header;