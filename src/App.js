import React, { Component } from 'react'
import { withRouter, Route, Link, Switch } from 'react-router-dom'

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
    clicked: false
  }

  constructor(props) {
    super(props)

    this.props.history.listen((location, action) => {
      console.log(location)
      this.setState(state => {
        return this.state.clicked = !this.state.clicked
      })
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
    const { clicked } = this.state
    console.log(this.props)
    
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
            <CSSTransition key="test" in={clicked} classNames="custom" timeout={3000}
                >
              <div className={['custom', location.pathname === '/subpage' && 'custom-enter-done'].filter(e => !!e).join(' ')}>
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
