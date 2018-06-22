import React, { Component } from 'react'
import { withRouter, Route, Link, Switch } from 'react-router-dom'
import ClassNames from 'classnames'

import Home from './Home'
import Subpage from './Subpage'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import logo from './logo.svg'
import './App.css'

import './Animation.css'

const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children)
  return childrenArray[0] || null
}

class App extends Component {
  state = {
    clicked: false,
    customClass: ""
  }

  customClass = {}

  constructor(props) {
    super(props)

    const { location } = this.props
    console.log(location)
    

    this.props.history.listen((location, action) => {
      console.log(location)
      this.setState(state => {
        return this.state.clicked = !this.state.clicked
      })
    })

    this.state.customClass = ClassNames({
      'custom-enter-done': location.pathname === '/subpage' ? true : false,
      'test': location.pathname === '/subpage' ? false : true
    })
    
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.setState(state => {
      return this.state.clicked = !this.state.clicked
    })

    console.log(this.state)
  }

  render() {

    const { location } = this.props
    const { clicked, customClass } = this.state
    console.log(customClass)
    
    return (
      <div className="App">
        {/* <button onClick={this.handleClick}>Test</button> */}
        <div className="TopBar">
          <Link to="/">Home</Link>
          <Link to="/subpage">Subpage</Link>
        </div>
        <Route render={({ location }) => (
          <div className="render">
            <TransitionGroup exit={false}>
              <CSSTransition key={location.key} classNames="anim" timeout={1000}>
                <Switch key={location.key} location={location}>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/subpage" component={Subpage} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
            <CSSTransition key="custom" in={clicked} classNames="custom" timeout={1000}
                >
              {/* <div className={['custom'].filter(e => !!e).join(' ')}> */}
              <div className={`custom ${customClass}`}>
                test
              </div>
            </CSSTransition>
        
          </div>
          
        )} />
      </div>
    )
  }
}

export default withRouter(App)
