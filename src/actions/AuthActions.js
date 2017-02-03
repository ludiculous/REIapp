import {CHANGE_AUTH,AUTH_USER,UNAUTH_USER,AUTH_ERROR,CREATE_USER} from './types';
import axios from 'axios';
import {hashHistory} from 'react-router';

export const authenticate = (isLoggedIn)=>{
    return {
        type:CHANGE_AUTH,
        payload:isLoggedIn
    }
}

export const signinUser = (UserData)=>{
    console.log(UserData);
    return (dispatch)=>{
        axios.post('/signin',UserData)
            .then((res)=>{
                console.log(res.data.token);
                dispatch({type:AUTH_USER});

                //Save JWT Token
                //Redirect to secured route
                localStorage.setItem('token',res.data.token);
                hashHistory.push('/')
            })

           .catch(err=>{
             console.log(err)
             dispatch(authError('Bad Login Info'))
           });

    };
};

export const signoutUser = ()=>{
  localStorage.removeItem('token');

  return{
    type:UNAUTH_USER,
    payload:false
  }
}

export const signupUser = (Userdata)=>{
  return (dispatch)=>{
    axios.post('/signup',Userdata)
      .then(res=>{
      dispatch({type:AUTH_USER})
      localStorage.setItem('token', res.data.token)
      hashHistory.push('/')
      })
      .catch(err=>{
        dispatch(
          {type:AUTH_ERROR,
            payload:'Email is already in use or incorrect signup'}
        )
      })
  }
}


export const authError = (err)=>{
  return{
    type:AUTH_ERROR,
    payload:err
  }
}
