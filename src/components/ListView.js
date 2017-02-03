import React, {Component} from 'react'
import connect from 'react-redux';




class ListView  extends Component {
componentWillMount(){
  console.log(this.props.componentData);
}

  return(
    <div className="ListView-Container">
      <ul className="ListView-UL">
          {this.props.children}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) =>{
  return {
    ListData: state.Market.Anaylsis
  }
}

export const connect(null,...this.props.parentActionsl)(ListView);
