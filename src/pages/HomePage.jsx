import React from 'react';
import Header from '../components/Header'
import {HeroSection} from '../components/HeroSection'
import TopStartUps from '../components/TopStartUps'
import {Footer} from '../components/Footer'
import {Leader} from '../components/Leader'
import {connect } from 'react-redux';
import {getAuthState} from '../actions';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firebaseAuth } from '../firebase';
function HomePage () {

    if (firebaseAuth.currentUser){
        console.log(firebaseAuth.currentUser.uid)
      return <Redirect to={'/loading'} />
    }
    return(
        <div >
        <Header/>
        <HeroSection/>
        <TopStartUps/>
        <Leader/>
        <Footer/>
        </div>
    )

}
HomePage.propTypes = {
    getAuthState: PropTypes.func.isRequired,
    auth: PropTypes.bool.isRequired,
  }
  
  const mapStateToProps = state =>({
    auth: state.auth,
    userType: state.userType
  })

  export default compose(connect(mapStateToProps, {getAuthState})(HomePage));
