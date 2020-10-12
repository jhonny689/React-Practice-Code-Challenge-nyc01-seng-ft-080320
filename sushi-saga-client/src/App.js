import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    allSushi: [],
    sushiBelt: [],
    clicked: 0,
    remainingBudget: 100,
  }

  handleMoreSushi = e => {
    console.log("should load some sushi");
    let click = this.state.clicked;
    let belt = [...this.state.allSushi.slice(click*4, click*4 +4)];
    //debugger;
    this.setState(state => ({
      sushiBelt: belt,
      clicked: ++click
    }));
    console.log(belt);
    console.log(this.state);
  }
  sum = (a,b) => {
    return a.price? a.price + b.price : a + b.price;
  }

  getRemainingBudget = (array) => {
    let total = 100;
    if (array.length > 1) 
      total = 100 - array.reduce(this.sum,0);
    else if(array.length === 1)
      total = 100 - array[0].price;
    return total;
  }

  handleEatenSushi = sushiState => {
    if(this.state.remainingBudget - sushiState.sushi.price >= 0){
      console.log("Eating sushi, get rid of empty plate with remaining budget:", sushiState.budget);
      let currentState = {...this.state};
      let sushiId = currentState.allSushi.findIndex(x => x.id === sushiState.sushi.id);
      currentState.allSushi[sushiId] = sushiState.sushi;
      currentState.remainingBudget = this.getRemainingBudget(this.state.allSushi.filter(sushi => sushi.eaten));
      this.setState({...currentState});
      //this.setState({remainingBudget: sushiState.budget});
      //this.getRemainingBudget(this.state.allSushi.filter(sushi => sushi.eaten));
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer handleEatenSushi={this.handleEatenSushi} handleMoreSushi={this.handleMoreSushi} sushiBelt={this.state.sushiBelt} sushiBudget={this.state.remainingBudget} />
        <Table eatenSushi={this.state.allSushi.filter(sushi => sushi.eaten)} remainingBudget={this.state.remainingBudget}/>
      </div>
    );
  }
  componentDidMount(){
    fetch(API)
    .then(resp => resp.json())
    .then(sushis => this.setState({allSushi: sushis}));
  }
}

export default App;