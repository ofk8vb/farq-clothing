import React from 'react';
import {Link} from 'react-router-dom';
import './header.styles.scss'
import {HeaderContainer, LogoContainer, OptionsContainer,OptionDiv, OptionLink} from './header.styles'
import {ReactComponent as Logo} from '../../assets/farqIcon.svg'
import {auth} from '../../firebase/firebase.utils'
import {connect} from 'react-redux'
import CartIcon from'../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selector'
import {selectCurrentUser} from '../../redux/user/user.selectors'


const Header =({currentUser,hidden}) =>(
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <span className='company-name'>farq's store</span>
     <OptionsContainer>
        <OptionLink to='/shop'>
            SHOP
        </OptionLink>
        <OptionLink to='/shop'>
            Contact
        </OptionLink>
        { currentUser ? (
            <OptionDiv onClick={()=>auth.signOut()}>
                SIGN OUT
            </OptionDiv>
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

export default connect(mapStateToProps)(Header);