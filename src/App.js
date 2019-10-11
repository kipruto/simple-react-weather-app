import React, { Component } from "react";
import Titles from "./components/titles";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "6c62bedc8ed0a32af9ec3178cd96e4c7";

class App extends Component {
  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };
  getWeather = async e => {
    e.preventDefault();
    const city = e.target.city.value;
    const country = e.target.country.value;
    const api_call = await fetch(
      `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();
    if (city && country) {
      this.setState({
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please provide valid city and country!"
      });
    }
  };
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 title-container">
                <Titles />
              </div>
              <div className="col-sm-7 form-container">
                <Form getWeather={this.getWeather} />
                <Weather
                  city={this.state.city}
                  country={this.state.country}
                  temperature={this.state.temperature}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

{
  /* <React.Fragment>
  <Titles />
  
</React.Fragment>; */
}

export default App;
