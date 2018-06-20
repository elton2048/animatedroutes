import React, { Component } from 'react'
import AnimatedWrapper from './AnimatedWrapper'

class HomeComponent extends Component {
  render() {
    return (
      <div className="page">
        <h1>Home</h1>
        <p>Hello from home page.</p>
      </div>
    )
  }
}

const Home = (HomeComponent)
export default Home