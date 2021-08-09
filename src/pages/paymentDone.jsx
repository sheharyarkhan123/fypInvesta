import { Footer } from "../components/Footer"
import Header from "../components/Header"
import React from 'react';
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const PaymentDonePage = () =>{
    const history = useHistory();
    return(
        <React.Fragment>
        <Header/>
        <div style={{
            width: "100%",
            height: "100vh", 
            display:"grid",
            placeContent: 'center'
        }}>
        <h1>Payment Has been Done</h1>
        <Button onClick={() =>{
            history.push('/')
        }}>
        Go Back To Home
        </Button>
        </div>
        <Footer/>
        </React.Fragment>
    )
}

export default PaymentDonePage