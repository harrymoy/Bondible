import React from "react";
import './Hero.scss';

interface Props {
    text?: string
}


const Hero: React.FC<Props> = () => {

    return(
        <div>
        <h1>I am the hero!!!!</h1>
        <h4>I am the hero text for some reason</h4>
            <div>
                <button>Do something</button>
                <button>Do something</button>
            </div>
        </div>
    )
}

export default Hero;