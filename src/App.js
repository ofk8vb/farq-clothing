import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx'
import CheckoutPage from './pages/checkout/checkout.component'
import {Route, Switch,Redirect} from 'react-router-dom'
import Header from './components/header/header.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'
import {auth,createUserProfileDocument,addCollectionAndDocuments} from './firebase/firebase.utils'
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selectors'
import {createStructuredSelector} from 'reselect';
import styled from 'styled-components';
import {selectCollectionsForPreview} from './redux/shop/shop.selectors'
class App extends React.Component {


  unsubscribeFromAuth=null;

  componentDidMount(){

    const {setCurrentUser} = this.props;



    //store'dan action propstan cekip destructure edilecek
  //   const {setCurrentUser} = this.props
  //   this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth =>{
  //     if(userAuth){
  //       const userRef=await createUserProfileDocument(userAuth);

  //       userRef.onSnapshot(snapShot =>{
  //         setCurrentUser({
  //             id:snapShot.id,
  //             ...snapShot.data()
  //           })
  //         })
  //     }
  //     setCurrentUser(userAuth);
  //   })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={()=>this.props.currentUser?(<Redirect to='/'/>):(<SignInAndSignUpPage/>)}/>
          </Switch>
      </div>
    );
  }
  
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch =>({
    setCurrentUser : user =>dispatch(setCurrentUser(user))
 })
export default connect(mapStateToProps, mapDispatchToProps)(App);
