import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess =(id, orderData) => {
    return {
        type: actionTypes.PUCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFaile =(error) => {
    return {
        type: actionTypes.PUCHASE_BURGER_FAIL,
        error:error
    };
};

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data));
            })
            .catch(error => {
                dispatch(purchaseBurgerFaile(error))
            });
    }
}