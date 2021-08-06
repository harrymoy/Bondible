import React, { createRef, Component } from "react";
import { useState } from "react";
import CreateBond from "../helpers/CreateBond";
import { ConnectMetaMask } from "./ConnectMetaMask";

interface bondData {
    contractAddress?: string
    walletAddress?: string
}

function BondForm(props: bondData) {

    const [subscriptionValue, setSubscriptionValue] = useState<string>("");
    const [rateValue, setRateValue] = useState<string>("");
    const [descriptionValue, setDescriptionValue] = useState<string>("");

    async function issueBond() {
        console.log("Creating bond");
        console.log("The max subscription is: ", subscriptionValue);
        console.log("The rate is: ", rateValue)
        console.log("The description is: ", descriptionValue);
        await ConnectMetaMask();
        CreateBond(parseInt(rateValue!), parseInt(subscriptionValue!), props.contractAddress!);
    }

    return(
        <form onSubmit={issueBond}>
            <input name='subscription' id='subscription' type="number" value={subscriptionValue} onChange={(ev: React.ChangeEvent<HTMLInputElement>,): void => setSubscriptionValue(ev.target.value)} required />
            <input name='rate' id='rate' type="number" value={rateValue} onChange={(ev: React.ChangeEvent<HTMLInputElement>,): void => setRateValue(ev.target.value)} required />
            <input name='description' id='description' type="text" value={descriptionValue} onChange={(ev: React.ChangeEvent<HTMLInputElement>,): void => setDescriptionValue(ev.target.value)} required placeholder="Enter a description about this bond" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default BondForm;