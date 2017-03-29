import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {fetchZillowHome,createZHS,zhs_to_csv,zhs_add_median} from '../../actions';
import StatesData from './states.json';
import  _ from 'lodash'
import PropertyGrid from '../Investing/DataTable';
import { FETCH_ZILLOW_HOME, CREATE_ZILLOW_HOME_SEARCH,ZHS_TO_CSV,ADD_MEDIAN_DATA} from '../../actions/types';

const ZData = {
  medianMValue:'',
  medianSold:'',
  medianSqFootage:'',
  medianYOC:''
};


class ZHomeSearchForm extends Component {

  handleFormSubmit({address, city, state}){
    console.log({address, city, state})
  this.props.createZHS({address, city, state});



  }

  componentWillReceiveProps(nextProps){
        if(typeof nextProps.Market.zillowHomes != 'undefined'){
          const ZHSdata = nextProps.Market.zillowHomes
          const ZHSL = ZHSdata.length
          console.log(ZHSdata);
          console.log(ZHSL);

            const MarketValue = ()=>{
            const mvmSum = _.reduce(ZHSdata, (zhs1,zhs2)=>{

            return parseInt(zhs1.MarketValue)+ parseInt(zhs2.MarketValue);
                })

                  console.log(mvmSum)
                  const mvm =  mvmSum/ZHSL;
                  console.log(mvm);
                  ZData.medianMValue = mvm

              }
              MarketValue();

            const SoldPrice = ()=>{
              const spSum = _.reduce(ZHSdata, (zhs1,zhs2)=>{
                return parseInt(zhs1.LastSoldAmount) + parseInt(zhs2.LastSoldAmount);
              })

              console.log(spSum)
              const spm =  spSum/ZHSL;
              console.log(spm);
              ZData.medianSold = spm;


            }
          SoldPrice();

            const SqFootage = ()=>{
              const sfsum  = _.reduce(ZHSdata, (zhs1,zhs2)=>{
                return parseInt(zhs1.SqFootage)+ parseInt(zhs2.SqFootage);
              })

              console.log(sfsum)
              const sfm =  sfsum/ZHSL;
              console.log(sfm);
              ZData.medianYOC = sfm;

            }
          SqFootage();


            const YOC = ()=>{
              const YOCSum = _.reduce(ZHSdata, (zhs1,zhs2)=>{
                return parseInt(zhs1.YearBuilt)+ parseInt(zhs2.YearBuilt);
              })

              console.log(YOCSum)
              const yocm =  YOCSum/ZHSL;
              console.log(yocm);

            ZData.medianYOC = yocm;

            }

          YOC();

          console.log(this.props.Market.zillowMedian);

          }




  }





  handleSaveCSV(){
    const zhData = {
      median: this.props.Market.zillowMedian,
      zhs: this.props.Market.zillowHomes
    }
    this.props.zhs_to_csv(zhData);

  }
  renderCSVBtn(){
    if(typeof this.props.Market.zillowHomes !== 'undefined'){
        if(this.props.Market.zillowHomes.length>0){
            return (  <div className="save-csv-btn" onClick={this.handleSaveCSV.bind(this)}>Save To CSV</div>)
        }
    }


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
                  {this.renderCSVBtn()}

                  <PropertyGrid  />

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

ZHomeSearchForm = connect(mapStateToProps, {createZHS,zhs_to_csv,zhs_add_median} )(ZHomeSearchForm);


export default  ZHomeSearchForm ;
