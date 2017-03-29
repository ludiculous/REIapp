import React, {Component} from 'react';
import {connect} from 'react-redux';
//import ReactDataGrid from 'react-data-grid';
import {removeZHSrow,zhs_add_median} from '../../actions';
import _ from 'lodash';

//import ReactGridLayout from 'react-grid-layout'
//import { render } from 'react-dom';
//import { Grid } from 'react-redux-grid';

//import propData from './property.js'
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


  renderZHSavg(){
      return(
                  <table  className="DataTable" style={{width:"100%"}}>
                    <tbody className="DataTableBodyA">
                          <tr>
                            <td>Median Market Value: {}</td>
                            <td>Median Sold Price:{}  </td>
                            <td>Median SqFootage:{}  </td>
                            <td>Median Year of Construction:{}  </td>
                          </tr>
                    </tbody>
                  </table>
                )
      }



  componentWillUpdate(nextProps){
    if(!nextProps.Market.zillowMedian){
      console.log(nextProps.Market.zillowMedian)
    }

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
               <div className="data-table-container">
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


                  </div>
               )
       }
}

const mapStateToProps = (state)=>{
  return {
      Market: state.Market
  }
}


export default  connect(mapStateToProps,{removeZHSrow})(DataTable);
