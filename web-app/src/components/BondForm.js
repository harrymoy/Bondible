import React from 'react';
import { createRef } from 'react';
import { ethers } from 'ethers';

class BondForm extends React.Component {

    maxSubscriptionRef = createRef();
    rateRef = createRef();
    descriptionRef = createRef();

    loadMetamask = async () => {
        await window.ethereum.enable();
        console.log(window.ethereum);
        let provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    issueBond = async event => {
        event.preventDefault();
        this.loadMetamask();
    }

    render() {
        return(
            <form onSubmit={this.issueBond}> 
                <input ref={this.maxSubscriptionRef} type="number" required placeholder="Enter max subscription" />
                <input ref={this.rateRef} type="number" required placeholder="Enter rate for the bond" />
                <input ref={this.descriptionRef} type="text" required placeholder="Describe this bond"/>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default BondForm;