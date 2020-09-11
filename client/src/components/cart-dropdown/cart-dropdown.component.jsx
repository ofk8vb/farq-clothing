import React from 'react'
import {connect} from 'react-redux';
import { selectCartItems} from '../../redux/cart/cart.selector';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component'
import './cart-dropdown.styles.scss'
import {createStructuredSelector} from 'reselect'
import {withRouter} from 'react-router-dom'
import {toggleCartHidden} from '../../redux/cart/cart.actions'
import {CartDropdownContainer,CartItemsContainer,EmptyMessageSpan} from './cart-dropdown.styles'

const CartDropdown = ({cartItems,history,dispatch}) => (
    <CartDropdownContainer>
        <CartItemsContainer>
        {
            cartItems.length?(
            cartItems.map(cartItem=>(<CartItem key={cartItem.id} item={cartItem}/>
            ))
            ):(
                <EmptyMessageSpan>Your cart is Empty</EmptyMessageSpan>
            )}
    </CartItemsContainer>
    <CustomButton className='cart-button' onClick={()=>
    {
        history.push('/checkout')
        dispatch(toggleCartHidden());


     }}>GO TO CHECKOUT</CustomButton>
    </CartDropdownContainer>
)


const mapStateToProps = createStructuredSelector({
    cartItems:selectCartItems,
});




export default withRouter(connect(mapStateToProps)(CartDropdown))