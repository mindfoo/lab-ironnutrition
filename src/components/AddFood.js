import React, { Component } from "react";

class AddFood extends Component {
    state = {
        foodName: "",
        foodImg: "",
        calories: 0
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { foodName, foodImg, calories} = this.state;

        // push the food to the state form the parent
        this.props.pushFood({
            name: foodName,
            image: foodImg,
            calories: calories
        });

        this.setState({
            foodName: "",
            image: "",
            calories: 0
        });
    };

    render() {
        const { foodName, calories, foodImg } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <input
                className="input"
                onChange={this.handleChange}
                name="foodName"
                type="text"
                value={foodName}
                placeholder="tomato"
                />
                <input
                className="input"
                onChange={this.handleChange}
                type="number"
                name="calories"
                value={calories}
                />
                <input
                className="input"
                onChange={this.handleChange}
                name="foodImg"
                type="text"
                value={foodImg}
                placeholder="https://i.imgur.com/5ktcSzF.jpg"
                />
                <button className="button">Add</button>
            </form>
        );
    }
}

export default AddFood;