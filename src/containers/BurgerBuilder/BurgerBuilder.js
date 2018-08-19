import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 4
    }

    addIngredientHadnler = (type) => {
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
    }

     removeIngredientHadnler = (type) => {
         const oldCount = this.state.ingrediens[type];
        const updatedCount = oldCount -1;
        const updatedIngredient ={
            ...this.state.ingrediens
        };
        updatedIngredient[type] = updatedCount;
        const priceSubtraction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({totalPrice: newPrice, ingrediens: updatedIngredient});
    }


    render() {
        return(
            <Auxiliary>
                <Burger ingredients={this.state.ingrediens}/>
                <p  > Price: {this.state.totalPrice} US Dollars</p>
                <BuildControls
                    ingredientAdded={this.addIngredientHadnler}
                    ingredientRemoved={this.removeIngredientHadnler}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder
