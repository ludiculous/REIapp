import React from 'react';
import ReactToastr  from "react-toastr";
import {ToastContainer} from 'ReactToastr';
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

  // In a react component:
  render () {
    return (
      <div>
        <ToastContainer ref="container"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right" />
        <button onClick={this.addAlert}>GGininder</button>
      </div>
    );
  }
