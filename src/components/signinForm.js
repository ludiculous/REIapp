import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {signinUser} from '../actions';

class SignInForm extends Component {

    handleFormSubmit({email,password}){
      const Userdata = {email,password};
      this.props.signinUser(Userdata)
    }
    componentWillUpdate(){
      console.log(this.props.errorMessage)
    }
renderError(){
    if(this.props.errorMessage!=""){
        return (
            <fieldset> <div className="errorField"> {this.props.errorMessage}</div></fieldset>
          )
  }
}


    render(){
        const {handleSubmit, email, password } = this.props;

        return(
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="SigninForm">
                <fieldset>
                    <Field label="Email" name="email" {...email} type="email" component="input" placeholder="youremail@email.com"/>

                </fieldset>

                <fieldset>
                    <Field label="Password" name="password" {...password} type="password" component="input" placeholder="yourpassword" />

                </fieldset>
                {this.renderError()}


                <input type="submit" value="Sign In" className="submitBtn" />
            </form>
        )
    }
}

const mapStateToProps = (state)=>{
  return {
      errorMessage: state.Authenticate.error
  }
}


SignInForm = reduxForm({form: 'signin'})(SignInForm);
SignInForm = connect(mapStateToProps,{signinUser})(SignInForm);


export default SignInForm;
