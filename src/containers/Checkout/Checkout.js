import React , {Component} from 'react'
import {Route} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummanry/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
class Checkout extends Component {

    onCheckoutCanceledHandler= () => {
    this.props.history.goBack();
    }
    onCheckoutEnteredHandler= () => {
        this.props.history.replace('/checkout/contact-data');
    }
render(){
    return(
        <div>
            <CheckoutSummary
                onCheckoutCanceled={this.onCheckoutCanceledHandler}
                onCheckoutEntered={this.onCheckoutEnteredHandler}
                ingredients={this.props.ings}/>
            <Route path={this.props.match.path + '/contact-data'}
                   component={ContactData}/>
        </div>
    )
}
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients

    }
}
export default connect(mapStateToProps)(Checkout);