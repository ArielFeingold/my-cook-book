import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import { Container, Row, Col, Button } from 'mdbreact';
import { Alert } from 'reactstrap';
import Spinner from '../../components/UI/Spinner'

class Signup extends Component {

      state = {
        email: '',
        password: '',
        username: ''
      }

      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      submitHandler = ( event ) => {
        event.preventDefault();
        event.target.className += ' was-validated';
        this.props.onSignup( this.state.email, this.state.password, this.state.username);
      }

    render(){

      let spinner = null;
      if ( this.props.loading ) {spinner = <Spinner />}

      let errorMessagesEmail = null;

      let usernameError =  '';
      let emailError = '';
      let passwordError = ''
      if ( this.props.errors ) {
        if(this.props.errors.username){usernameError = this.props.errors.username[0]};
        if(this.props.errors.email){emailError = this.props.errors.email[0]};
        if(this.props.errors.password){passwordError = this.props.errors.password[0]};

      }

      let authRedirect = null;
      if ( this.props.isNewSignup ) {
          authRedirect = <Redirect to="/login" />
      }


      return(
        <Container className="mt-5 mx-auto">
          {authRedirect}
          <Row>
            <Col md="3"/>
            <Col md="6">
              {spinner}
              <form  className='needs-validation example z-depth-5 p-3' onSubmit={this.submitHandler} noValidate>
                <p className="h4 text-center mb-4">Sign up</p>
                <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Choose Username</label>
                <input onChange={this.handleChange} type="text" name="username" value={this.state.username} className="form-control" required/>
                <div className="invalid-feedback">Username {usernameError}</div>
                <br/>
                <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">Your Email</label>
                <input onChange={this.handleChange} type="email" name="email" value={this.state.email} className="form-control" required/>
                <div className="invalid-feedback">Email {emailError}</div>
                <br/>
                <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Choose Password</label>
                <input onChange={this.handleChange} type="password" name="password" value={this.state.password} pattern="{8,}" className="form-control" required/>
                <small className="form-text text-muted">Password should be at least 8 characters</small>
                <div className="invalid-feedback">Password {passwordError}</div>
                <br/>
                <div className="text-center mt-4">
                  <Button className="btn btn-indigo" type="submit">Register</Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        errors: state.auth.signupError,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        isNewSignup: state.auth.isNewSignup
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: ( email, password, username ) => dispatch( actions.signup( email, password, username) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Signup );
