import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state ={
        showSideDrawer:false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }
    sideDrawerToggleHandler = () => {
        this.setState({showSideDrawer:!this.state.showSideDrawer})
    }

    render(){
        return(
    <Auxiliary >
    <Toolbar open={this.sideDrawerToggleHandler} />
    <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
    <SideDrawer/>
    <main className={classes.Content}>
        {this.props.children}
    </main>
    </Auxiliary>     
        )
    }
    

}

export default Layout;