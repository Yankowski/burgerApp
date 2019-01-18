import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password,isSignIn) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAw9OW4yW0KfWADVwGqkntJ5MjN8q0V1rI'
        if (!isSignIn) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAw9OW4yW0KfWADVwGqkntJ5MjN8q0V1rI'
        }
        axios.post(url,authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data).idToken, response.data.userId)
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err))
            })
    };
};