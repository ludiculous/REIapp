import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createMarket} from '../actions/'

class MarketMain extends Component {
handleCreateMarket(){
  const marketData = {
    location:'Sacramento',
    value:250000
  }
  this.props.createMarket(marketData);
}


  render(){
    return(
      <div>
      <button onClick={this.handleCreateMarket.bind(this)}>Create Market On Mongo</button>
      </div>
    )
  }
}

export default connect(null,{createMarket})(MarketMain);
