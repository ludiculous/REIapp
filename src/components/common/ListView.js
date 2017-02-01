import React from 'react'



export const ListView = (props)=>{
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
