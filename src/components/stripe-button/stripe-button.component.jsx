import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price*100;
    const publishableKey='pk_test_51HJd0RJQaltNnOgd18Fe0zqYj8kXlWtdruOLUusF47D1625UyN3OWtXflmp9QuJ5UkLYEpxwblZjW9M8IR4lSbWj007Ddryubg'

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }

    return(
        <StripeCheckout
        label='Pay Now'
        name='Farq Store'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/Ny6.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;
