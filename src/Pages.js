import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';


class App extends Component {
  render() {
    const { children } = this.props
    return (
      <Router><div>{
        React.Children.map(children, (child, i) => {
          console.log(child.props.exact, child.props.path)
          return (
            <Route exact={ child.props.exact } path={ child.props.path } render={ () => child } />
          )
        })
      }</div></Router>
    );
  }
}

export default App;
