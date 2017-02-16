import React, {Component} from 'react';
import {connect} from 'react-redux';
//import ReactDataGrid from 'react-data-grid';
import {removeZHSrow} from '../../actions';
import _ from 'lodash';
//import ReactGridLayout from 'react-grid-layout'
//import { render } from 'react-dom';
//import { Grid } from 'react-redux-grid';




//import propData from './property.js'


const columns =  [
  {width:'10%', dataIndex:'Address', name:'Address'},
  {width:'10%', dataIndex:'City' ,name:'City'},
  {width:'5%', dataIndex:'State', name:'State'},
  {width:'7%', dataIndex:'ZipCode' ,name:'ZipCode'},
  {width:'5%', dataIndex:'Room' ,name:'Room'},
  {width:'5%', dataIndex:'Bath', name:'Bath'},
  {width:'7%', dataIndex:'AskingPrice' ,name:'AskingPrice'},
  {width:'7%', dataIndex:'MarketValue' ,name:'MarketValue'},
  {width:'7%', dataIndex:'LastSoldDate', name:'LastSoldDate'},
  {width:'7%', dataIndex:'LastSoldAmount', name:'LastSoldAmount'},
  {width:'7%', dataIndex:'YearBuild', name:'YearBuilt'},
  {width:'7%', dataIndex:'SqFootage', name:'SqFootage'},
  {width:'7%', dataIndex:'UseCode', name:'UseCode'},
  { width:'2%', dataIndex:'propertyID', name:'ID'}
]
const plugins = {
    EDITOR: {
        type: 'inline',
        enabled: true,
        focusOnEdit: true
    }
}

const zData = {
  columns,
  data: [{
    Address :"6839 Concert Way",
    AskingPrice:"236,300",
   Bath:"2.0",
   City:"Sacramento",
   LastSoldAmount:"",
   LastSoldDate:"09/27/1999",
   MarketValue:"306964",
   Room:"4",
   SqFootage:"5585",
   State:"CA",
   UseCode:"MultiFamily2To4",
   YearBuilt:"1978",
   ZipCode:"95842",
   propertyID:"26004832"
  }],
  plugins:{},
  emptyDataMessage:"No Data Available",
  stateKey: 'zTable',
  reducerKeys:{}
};
//     <Grid { ...zData } className="zData-table" />


class DataTable extends Component {
    componentWillReceiveProps(){
      console.log(this.props.Market.zillowHomes)
    }
    renderColumns(){
      const myFields = [

        "propertyID",
        "Address",
        "City",
        "State",
        "ZipCode",
        "Room",
        "Bath",
        "AskingPrice",
        "MarketValue",
        "LastSoldDate",
        "LastSoldAmount",
        "YearBuilt",
        "SqFootage",
        "UseCode",
        "",
      ]

    return   _.map(myFields,(fields,index)=>{
        return   (
              <th className="DataTableHeaderItem">{fields}</th>
            )
      })

    }

  handleDeleteZHSRow(index){
    console.log(this.props.Market.zillowHomes.propertyID);

    const ZHSindex = index;
    console.log(index);
    this.props.removeZHSrow(index);
  }

    renderTableData(){
      return _.map(this.props.Market.zillowHomes,(zData,index)=>{

      return (


        <tr key={index} className="DataTableRow">
          <td className="DataTableItem">{zData.propertyID}</td>
          <td className="DataTableItem">{zData.Address}</td>
          <td className="DataTableItem">{zData.City}</td>
          <td className="DataTableItem">{zData.State}</td>
          <td className="DataTableItem">{zData.ZipCode}</td>
          <td className="DataTableItem">{zData.Room}</td>
          <td className="DataTableItem">{zData.Bath}</td>
          <td className="DataTableItem">{zData.AskingPrice}</td>
          <td className="DataTableItem">{zData.MarketValue}</td>
          <td className="DataTableItem">{zData.LastSoldDate}</td>
          <td className="DataTableItem">{zData.LastSoldAmount}</td>
          <td className="DataTableItem">{zData.YearBuilt}</td>
          <td className="DataTableItem">{zData.SqFootage}</td>
          <td className="DataTableItem">{zData.UseCode}</td>
            <td className="delete-row-btn"  key={zData.propertyID} onClick={this.handleDeleteZHSRow.bind(this,index)}>Delete Row</td>
        </tr>

      )

      })
    }


       render() {
            console.log(this.props.Market.zillowHomes);



             return  (
                  <table  className="DataTable" style={{width:"100%"}}>
                      <thead className="DataTableHeader">
                          <tr>
                                {this.renderColumns()}
                          </tr>
                      </thead>
                      <tbody className="DataTableBody">
                            {this.renderTableData()}
                      </tbody>
                  </table>
               )
       }
}

const mapStateToProps = (state)=>{
  return {
      Market: state.Market
  }
}


export default  connect(mapStateToProps,{removeZHSrow})(DataTable);
