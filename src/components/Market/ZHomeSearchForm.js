import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {fetchZillowHome,createZHS} from '../../actions';
import StatesData from './states.json';
import  _ from 'lodash'
import { FETCH_ZILLOW_HOME, CREATE_ZILLOW_HOME_SEARCH} from '../../actions/types';


class ZHomeSearchForm extends Component {
  handleFormSubmit({address, state}){
    console.log(address + state)
  }

componentWillUpdate(){
  console.log(this.props)
}

          render(){
              const {handleSubmit,errors,touched} = this.props;

              return(
                  <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="ZhomeSearchForm">
                      <fieldset>
                          <Field label="Address" name="address"  type="text" component={renderField} placeholder="1234 Street"/>
                      </fieldset>

                      <fieldset>

                      <label>State</label>
                      <Field name="state" component="select">
                        <option key="0"></option>
                          {renderStateOptions()}
                    </Field>

                      </fieldset>

                      <input type="submit" value="Search" className="submitBtn" />
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

  const renderStateOptions = ()=>{
    const Initials = []
    for(var prop in StatesData){
          Initials.push(prop)
      }

  return  _.map(Initials,state=>{
    return  <option value={state} key={state}>{state}</option>
    })

  }


const renderStateError = (err)=>{
  return (<span>err</span>)
}


  const validate = values => {
  const errors = {}
console.log(values)
  if(!values.address||!values.state){
  errors.address = 'Please Enter a Valid Address & State';
  }


  return errors
  }



const selector = formValueSelector('ZHomeSearchForm')

  const mapStateToProps = (state)=>{
    return {
      stateData: selector(state,'state')
    }
  }



ZHomeSearchForm = reduxForm({
  form: 'ZHomeSearch',
  validate,
  })(ZHomeSearchForm);

ZHomeSearchForm = connect(mapStateToProps, {} )(ZHomeSearchForm);


export default  ZHomeSearchForm ;
