import React, { Component } from 'react'
import * as Animated from 'animated/lib/targets/react-dom'

import { Transition } from 'react-transition-group'

const AnimatedWrapper = WrappedComponent => class AnimatedWrapper
  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animate: new Animated.Value(0)
    }
  }

  componentWillAppear(cb) {
    Animated.spring(this.state.animate, { toValue: 1 }).start()
    cb()
  }
  componentWillEnter() {
    setTimeout(
      () => Animated.spring(this.state.animate, { toValue: 1 }).start(),
      250
    )
  }
  componentWillLeave(cb) {
    Animated.spring(this.state.animate, { toValue: 0 }).start()
    setTimeout(() => cb(), 175)
  }


  render() {
    const style = {
      opacity: Animated.template`${this.state.animate}`,
      transform: Animated.template`
      translate3d(0 ,${this.state.animate.interpolate({ inputRange: [0, 1], outputRange: ['12px', '0px']})}, 0)`
    }
    return (
      <Transition
        onEnter={this.componentWillEnter}
        onExit={this.componentWillLeave}
        appear
      >
        <Animated.div style={style} className="animated-page-wrapper">
          <WrappedComponent {...this.props} />
        </Animated.div>
      </Transition>
    )
  }
}

export default AnimatedWrapper