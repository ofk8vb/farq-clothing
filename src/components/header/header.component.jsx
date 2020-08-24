import React from 'react';
import {Link} from 'react-router-dom';
import './header.styles.scss'
import {ReactComponent as Logo} from '../../assets/farqIcon.svg'
import {auth} from '../../firebase/firebase.utils'
import {connect} from 'react-redux'
import CartIcon from'../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selector'
import {selectCurrentUser} from '../../redux/user/user.selectors'
const Header =({currentUser,hidden}) =>(
    <div className ='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
           
        </Link>
        <span className='company-name'>farq's store</span>
     <div className='options'>
        <Link className='option' to='/shop'>
            SHOP
        </Link>
        <Link className='option' to='/shop'>
            Contact
        </Link>
        { currentUser ? (
            <div className='option' onClick={()=>auth.signOut()}>
                SIGN OUT
            </div>
        ):(
            <Link className='option' to='/signin'>
                SIGN IN
            </Link>
        )}
        <CartIcon/>


    </div>
         {
            hidden? null: <CartDropdown/>   
        }
   
    </div>


)

const mapStateToProps = createStructuredSelector({
        currentUser:selectCurrentUser,
        hidden:selectCartHidden
})

export default connect(mapStateToProps)(Header);