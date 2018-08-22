import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.8
}

class BurgerBuilder extends Component {
    state = {
        ingrediens:{
            salad: 0,
            bacon: 0,
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        purchasable:false,
        purchasing:false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingrediens[type];
        const updatedCount = oldCount +1;
        const updatedIngredient ={
            ...this.state.ingrediens
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingrediens: updatedIngredient});
        this.updatePurchaseState(updatedIngredient);
    }

    purchaseHandler= () => {
        this.setState({purchasing:true})
    }
    
    purchaseCancelHandler= () => {
        this.setState({purchasing:false})
    }
    purchaseContinueHandler= () => {
        alert('You continue!');
    }

     removeIngredientHadnler = (type) => {
        const oldCount = this.state.ingrediens[type];
        if (oldCount <1) {
            return;
        }
        const updatedCount = oldCount -1;
        const updatedIngredient ={
            ...this.state.ingrediens
        };
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingrediens: updatedIngredient});
        this.updatePurchaseState(updatedIngredient);
    }

    updatePurchaseState (updatedIngredient) {
  
       const sum = Object.keys(updatedIngredient)
                    .map(igKey => {
                        return updatedIngredient[igKey]
                    }).reduce((sum,el) => {
                    return sum+el},0);

       this.setState({purchasable: sum >0})                  
    }

    render() {
       const disabledInfo= {
           ...this.state.ingrediens
       };
       for (let key in disabledInfo) {
           disabledInfo[key] = disabledInfo[key] <= 0
       }     

        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingrediens}
                    price={this.state.totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingrediens}/>
                
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHadnler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder
