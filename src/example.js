import React, { Component } from 'react'
import { render } from 'react-dom'

class Demo extends Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onRef = this.onRef.bind(this)
    this.state = {}
  }

  componentDidMount() {
    this.observer = new MutationObserver(this.onChange)

    this.observer.observe(this.domElement, {
      attributes: true,
      attributeFilter: ['style'],
    })
  }

  componentWillUnmount() {
    this.observer.disconnect()
  }

  onChange(mutations) {
    this.setState(
      mutations.reduce((result, mutation) => {
        if (mutation.target === this.domElement) {
          const domElementWidth = parseFloat(this.domElement.style.width)
          const domElementHeight = parseFloat(this.domElement.style.height)

          if (this.state.width !== domElementWidth) {
            result.width = domElementWidth
          }

          if (this.state.height !== domElementHeight) {
            result.height = domElementHeight
          }
        }

        return result
      }, {})
    )
  }

  onRef(ref) {
    this.domElement = ref
  }

  render() {
    return (
      <div
        ref={this.onRef}
        style={{
          backgroundColor: 'red',
          width: 400,
          resize: 'both',
          overflow: 'hidden',
        }}
      >
        hello {this.state.width} x {this.state.height}
      </div>
    )
  }
}

render(<Demo />, document.getElementById('root'))
