import React,{useEffect, lazy, Suspense} from 'react';
import {GlobalStyle } from './global.styles';
import Spinner from './components/spinner/spinner.component'
import {Route, Switch,Redirect} from 'react-router-dom'
import Header from './components/header/header.component.jsx'

import {checkUserSession} from './redux/user/user.actions';
import {connect} from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selectors'
import {createStructuredSelector} from 'reselect';

import ErrorBoundary from './components/error-boundary/error-boundary.component'

const HomePage = lazy(()=>import('./pages/homepage/homepage.component'));
const ShopPage =lazy(()=> import('./pages/shop/shop.component.jsx'))
const SignInAndSignUpPage =lazy(()=> import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'))
const CheckoutPage =lazy(()=> import('./pages/checkout/checkout.component'))

const App = ({checkUserSession,currentUser}) => {

  useEffect(()=>{
    checkUserSession()
  },[checkUserSession])

    return (
      <div>
        <GlobalStyle/>
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner/>}>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              <Route path='/checkout' component={CheckoutPage} />
              <Route exact path='/signin' 
              render={()=>currentUser?(<Redirect to='/'/>):(<SignInAndSignUpPage/>)}/>
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  
  
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch =>({
  checkUserSession:()=>dispatch(checkUserSession())
})


export default connect(mapStateToProps,mapDispatchToProps)(App);
