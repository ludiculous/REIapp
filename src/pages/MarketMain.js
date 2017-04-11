import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createMarket, fetchMarket,fetchZillowHome} from '../actions/'

class MarketMain extends Component {

componentWillMount(){
  this.props.fetchMarket();
}


handleCreateMarket(){
  const marketData = {
    location:'Sacramento',
    value:250000
  }
  this.props.createMarket(marketData);
}

handleFetchZillowHome(){
  this.props.fetchZillowHome()
}


  render(){
    return(
      <div>
      <p className="detail-paragraph">
      <strong>Zillow</strong> is an ever expanding platform for real estate.
      If you ever wanted to perform market research for a specific neighborhood,
      then this webapp will get the job done. Go on Zillow.com and find the address of a property
      you are interested in. Enter the Address into the market analysis form, and data will populate neatly in a table.
      After having entered a few properties you will begin to get a feel for the market. Save the data in CSV format for use
      in Excel.
      </p>
      <button><a href="/market/analysis">Market Analysis</a></button>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
        marketData:state.Market
  }
}

export default connect(mapStateToProps,{createMarket,fetchMarket,fetchZillowHome})(MarketMain);
