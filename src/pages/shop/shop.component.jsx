import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import {fetchCollectionsStart} from '../../redux/shop/shop.actions';
import {createStructuredSelector} from 'reselect';
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import {selectIsCollectionFetching,selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors'
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.component'
import CollectionPageContainer from '../collection/collection.container'

class ShopPage extends React.Component{

  componentDidMount(){
    const {fetchCollectionsStart} = this.props;
    fetchCollectionsStart();
  }
  
  render(){
    const {match,isFetchingCollections,isCollectionsLoaded} = this.props;
    return(
        <div className='shop-page'>
          <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
          <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
        </div>
    )
  }
} 
const mapStateToProps=createStructuredSelector({
  isFetchingCollections:selectIsCollectionFetching,
  isCollectionsLoaded:selectIsCollectionsLoaded
})
const mapDispatchToProps = dispatch=>({
  fetchCollectionsStart:()=>dispatch(fetchCollectionsStart())
  
})

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);