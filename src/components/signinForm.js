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
        const {handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="SigninForm">
                <fieldset>
                    <Field label="Email" name="email" type="email" component={renderField} placeholder="youremail@email.com"/>
                </fieldset>

                <fieldset>
                    <Field label="Password" name="password" type="password" component={renderField} placeholder="yourpassword" />

                </fieldset>
                {this.renderError()}


                <input type="submit" value="Sign In" className="submitBtn" />
            </form>
        )
    }
}




const validate = values => {
  const errors = {}

if(!values.email){
  errors.email = 'Please enter a valid email'
}

if(!values.password){
  errors.password = 'Please enter a password';
}

  return errors
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)



const mapStateToProps = (state)=>{
  return {
      errorMessage: state.Authenticate.error
  }
}


SignInForm = reduxForm({
  form: 'signin',
  validate
})(SignInForm);
SignInForm = connect(mapStateToProps,{signinUser})(SignInForm);


export default SignInForm;
