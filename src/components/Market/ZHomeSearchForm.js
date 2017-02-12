import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {fetchZillowHome,createZHS} from '../../actions';
import StatesData from './states.json';
import  _ from 'lodash'
import PropertyGrid from '../Investing/DataTable';
import { FETCH_ZILLOW_HOME, CREATE_ZILLOW_HOME_SEARCH} from '../../actions/types';


class ZHomeSearchForm extends Component {

  handleFormSubmit({address, city, state}){
    console.log({address, city, state})
  this.props.createZHS({address, city, state});
  }
  componentWillUpdate(){
    console.log(this.props.Market)

  }


          render(){
              const {handleSubmit,errors,touched,Market} = this.props;
              console.log(Market)
              return(
                <div className="ZSearchContainer">
                  <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="ZhomeSearchForm">
                      <fieldset>
                          <Field label="Address" name="address"  type="text" component={renderField} placeholder="1234 Street"/>
                      </fieldset>

                      <fieldset>
                          <Field label="City" name="city"  type="text" component={renderField} placeholder="City"/>
                      </fieldset>

                      <fieldset>
                      <label>State</label>
                      <Field name="state" component="select">
                        <option key="0"></option>
                          {renderStateOptions()}
                    </Field>
                      <span>{Market.zillowSearchError}</span>
                      </fieldset>

                      <input type="submit" value="Search" className="submitBtn" />

                  </form>

                  <PropertyGrid />

                    </div>
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

  if(!values.address||!values.state||!values.city){
  errors.city = 'Please Enter a Valid Address, City & State';
  }


  return errors
  }




  const mapStateToProps = (state)=>{
    return {
        Market: state.Market
    }
  }



ZHomeSearchForm = reduxForm({
  form: 'ZHomeSearch',
  validate,
  })(ZHomeSearchForm);

ZHomeSearchForm = connect(mapStateToProps, {createZHS} )(ZHomeSearchForm);


export default  ZHomeSearchForm ;
