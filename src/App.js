import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import foods from './foods.json';
import FoodBox from './components/FoodBox';
import AddFood from './components/AddFood';
import Search from './components/Search';
import trashIcon from './trash.svg'

class App extends Component {
  state = {
    displayForm: false,
    foods: foods,
    filtered: foods,
    today: []
  }

  handleClick = () => {
    this.setState({
      displayForm: !this.state.displayForm
    })
  };

  pushFoodHandler = (food) => {
    const foods = [...this.state.foods];
    foods.unshift(food);
    this.setState({ foods: foods, filtered: foods, displayForm: false});
  };

  filterFoodHandler = (input) => {
    const filtered = this.state.foods.filter(el => {
      return el.name.toLowerCase().includes(input.toLowerCase());
    });

    this.setState({ filtered: filtered});
  };

  addTodaysFoodHandler = (food) => {
    const today = [...this.state.today];
    let foundFood = today.find(el => el.name === food.name);


    if (foundFood) {
      //update quantity and calories
      foundFood.quantity += food.quantity;
      foundFood.calories += food.calories * food.quantity;
    } else {
      food.calories *= food.quantity;
      today.push(food);
    }

    this.setState({
      today: today
    })
  };

  removeTodayFoodHandler(ingredient) {
    let today = [...this.state.today];
    today.splice(today.findIndex(el => el.name === ingredient.name), 1);

    this.setState({
      today: today
    })
  };

  render() {
    const { displayForm, filtered, today } = this.state;
    const buttonText = displayForm ? "Click to hide" : "Click to show";

    return (
      <div className="App">
        <div className="container">
          <h1 className="Title">IronNutrition</h1>
            <div>
              <Search filterFood={this.filterFoodHandler} />
              <button className="button" onClick={this.handleClick}>
                {buttonText}
              </button>
              <div>
                {displayForm && <AddFood pushFood={this.pushFoodHandler} />}
                <div style={{ width: "70%", float: "left"}}>
                  {filtered.map((oneFood, i) => {
                    return <FoodBox key={i} food={oneFood} addFood={this.addTodaysFoodHandler} />
                  })}
                </div>
                <div style={{ width: "30%", float: "right"}}>
                    <h2>Today's food</h2>
                    <ul>
                        {today.map((ingredient, i) => {
                          return (
                            <li key={i}>
                                {ingredient.quantity} {ingredient.name} = {ingredient.calories} cal
                                <button onClick={() => this.removeTodayFoodHandler(ingredient)}>
                                  <img src={trashIcon} />
                                </button>
                            </li>
                          )
                        })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
