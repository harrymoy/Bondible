import React, { createRef, Component } from "react";

class BondForm extends Component {

    private maxSubscriptionRef: React.RefObject<HTMLInputElement>;
    private rateRef: React.RefObject<HTMLInputElement>;
    private descriptionRef: React.RefObject<HTMLInputElement>;

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.maxSubscriptionRef = createRef();
        this.rateRef = createRef();
        this.descriptionRef = createRef();
    }

    issueBond(): void {
        //Call the smart contract method here and add data to Arweave
    }

    render() {
        return(
            <form onSubmit={this.issueBond}>
                <input type="number" ref={this.maxSubscriptionRef} required />
                <input type="number" ref={this.rateRef} required />
                <input ref={this.descriptionRef} required />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default BondForm;