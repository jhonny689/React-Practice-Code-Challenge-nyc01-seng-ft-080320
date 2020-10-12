import React, { Component, Fragment, useState } from 'react'

class Sushi extends Component{
  state = {
    sushi: {...this.props.sushi, eaten: false},
    budget: this.props.sushiBudget
  }

  sushiClickHandler = e => {
    console.log("budget=", this.state.bugdet);
    let newBudget = this.state.budget - this.state.sushi.price;
    console.log("budget after buying the sushi=", newBudget);
    if(this.state.budget - this.state.sushi.price >= 0){
      debugger;
      this.setState({
        sushi: {
          ...this.state.sushi,
          eaten: true,
        },
        budget: newBudget
      }, () => this.props.handleEatenSushi(this.state));
    }
    
  };

  render(){
    return (
      <div className="sushi">
        <div className="plate" 
            onClick={this.sushiClickHandler}>
          { 
            /* Tell me if this sushi has been eaten! */ 
            this.state.sushi.eaten ?
              null
            :
              <img src={this.state.sushi.img_url } width="100%" />
          }
        </div>
        <h4 className="sushi-details">
          {this.state.sushi.name} - ${this.state.sushi.price}
        </h4>
      </div>
    
    )
  }
}


export default Sushi