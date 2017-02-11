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
      <button onClick={this.handleCreateMarket.bind(this)}>Create Market On Mongo</button>
      <button onClick={this.handleFetchZillowHome.bind(this)}>Get Zillow Info</button>

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
