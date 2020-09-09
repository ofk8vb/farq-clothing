import React from 'react';
import './header.styles.scss'
import {HeaderContainer, LogoContainer, OptionsContainer,OptionLink} from './header.styles'
import {ReactComponent as Logo} from '../../assets/farqIcon.svg'
import {connect} from 'react-redux'
import CartIcon from'../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selector'
import {selectCurrentUser} from '../../redux/user/user.selectors'
import {signOutStart} from '../../redux/user/user.actions'


const Header =({currentUser,hidden,signOutStart}) =>(
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <span className='company-name'>farq's store</span>
     <OptionsContainer>
        <OptionLink to='/shop'> SHOP</OptionLink>
        <OptionLink to='/shop'>Contact</OptionLink>
        { currentUser ? (
            <OptionLink as='div' onClick={signOutStart}>
                SIGN OUT
            </OptionLink>
        ):(
            <OptionLink className='option' to='/signin'>
                SIGN IN
            </OptionLink>
        )}
        <CartIcon/>


    </OptionsContainer>
         {
            hidden? null: <CartDropdown/>   
        }
   
    </HeaderContainer>


)

const mapStateToProps = createStructuredSelector({
        currentUser:selectCurrentUser,
        hidden:selectCartHidden
})

const mapDispatchToProps = dispatch =>({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);