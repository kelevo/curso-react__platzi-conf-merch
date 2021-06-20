import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

import '../styles/components/Payment.css';

const Payment = () => {

    const { state, addNewOrder } = useContext(AppContext);
    const { cart, buyer } = state;
    const history = useHistory();

    const paypalOptions = {
        clientId: 'access_token$sandbox$d9x56tt7ptwk48nx$e76158287429478f21b0a1256325fb94',
        intent: 'capture',
        currency: 'USD'
    }

    const buttonStyles = {
        layout: 'vertical',
        shape: 'rect',
    }

    const handlePaymentSuccess = (data) => {
        if(data.status === 'COMPLETED') {
            const newOrder = {
                buyer,
                product: cart,
                payment: data
            }
            addNewOrder(newOrder);
            history.push('/checkout/success');
        }
    }

    const handleSumTotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
        const sum = cart.reduce(reducer, 0);
        return sum;
    }

    return (
        <div className="Payment">
            <div className="Payment-content">
                <h3>Resumen del pedido:</h3>
                { cart.map((item) => (
                    <div className="Payment-item" key={ item.title }>
                        <div className="Payment-element">
                            <h4>{ item.title }</h4>
                            <span>$ {' '} { item.price }</span>
                        </div>
                    </div>
                )) }
                <div className="Payment-button">
                    <PayPalButton
                        PaypalOptions={paypalOptions}
                        buttonStyles={buttonStyles}
                        amount={handleSumTotal()}
                        onStart={() => console.log('Start Payment')}
                        onSuccess={data => handlePaymentSuccess(data)}
                        onError={error => console.log(error)}
                        onCancel={data => console.log(data)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Payment;