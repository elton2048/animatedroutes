import React, { Component } from 'react'
import AnimatedWrapper from './AnimatedWrapper'

class SubpageComponent extends Component {
  render() {
    return (
      <div className="page">
        <h1>Subpage</h1>
        <p>Hello from a sub page.</p>
      </div>
    )
  }
}

const Subpage = (SubpageComponent)
export default Subpage