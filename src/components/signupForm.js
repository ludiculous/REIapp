import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {signupUser} from '../actions';

class SignUpForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pwMatch:true
      };
    }

    handleFormSubmit({email,password}){

        const Userdata = {email,password};
        this.props.signupUser(Userdata)

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

renderPwError(errors){
        return (
            <div className="errorField">{errors}</div>
        )

}


    render(){
        const {handleSubmit} = this.props;

        return(
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="SignupForm">
                <fieldset>
                    <Field label="Email" name="email"  type="email" component={renderField} placeholder="youremail@email.com"/>

                </fieldset>

                <fieldset>
                    <Field label="Password" name="password" type="password" component={renderField} placeholder="yourpassword"/>
                    <Field label="Confirm Password" name="confirmPassword" type="password" component={renderField} placeholder="confirm password"  />
                      <span>{this.props.errorMessage}</span>
                </fieldset>


                <input type="submit" value="Sign Up" className="submitBtn" />
            </form>
        )
    }
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


const validate = values => {
  const errors = {}

if(values.password!==values.confirmPassword){
  errors.password = 'Passwords Must Match';
}

if(!values.email){
  errors.email = 'Please enter a valid email'
}

if(!values.password){
  errors.password = 'Please enter a password';
}

if(!values.confirmPassword){
  errors.password = 'Please confirm password';
}

  return errors
}




const mapStateToProps = (state)=>{
  return {
      errorMessage: state.Authenticate.error
  }
}


SignUpForm = reduxForm({
  form: 'signup',
  validate,
})(SignUpForm);

SignUpForm = connect(mapStateToProps,{signupUser})(SignUpForm);


export default SignUpForm;
