import React, { Component } from 'react';
import LoginCard from './lib/components/login_card';
import './App.css';

/*
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), isLoggedIn: false };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>revN</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginCard />
      </div>
    );
  }
}

export default App;
