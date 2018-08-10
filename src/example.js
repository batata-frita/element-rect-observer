import React, { Component } from 'react'
import { render } from 'react-dom'
import resizeObserver from './resizeObserver'

class Demo extends Component {
  constructor(props) {
    super(props)

    this.onRef = this.onRef.bind(this)

    this.state = {
      content: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at enim a lorem sagittis rhoncus a ac ante. Praesent luctus magna velit, vel finibus elit ullamcorper at. Donec dolor lectus, feugiat sit amet semper non, sagittis at tortor. Nam sagittis vel lectus et hendrerit. Vivamus eget mi commodo, sollicitudin mi a, faucibus quam. Suspendisse blandit risus in nibh sagittis bibendum. Praesent faucibus ultricies gravida. Nulla auctor eros varius ligula sagittis porttitor. Praesent congue ex enim, eget volutpat magna mollis ac. Nulla consectetur quam eget orci laoreet, vel malesuada leo elementum. Aliquam in congue libero. Curabitur vitae lorem fringilla, ornare mauris id, rutrum erat.',
      ],
    }
  }

  componentDidMount() {
    this.stopObserving = resizeObserver(
      this.domElement,
      ({ width, height, top, bottom, left, right, x, y }) => {
        this.setState({ width, height, top, bottom, left, right, x, y })
      }
    )

    setTimeout(
      () =>
        this.setState({
          content: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at enim a lorem sagittis rhoncus a ac ante. Praesent luctus magna velit, vel finibus elit ullamcorper at. Donec dolor lectus, feugiat sit amet semper non, sagittis at tortor. Nam sagittis vel lectus et hendrerit. Vivamus eget mi commodo, sollicitudin mi a, faucibus quam. Suspendisse blandit risus in nibh sagittis bibendum. Praesent faucibus ultricies gravida. Nulla auctor eros varius ligula sagittis porttitor. Praesent congue ex enim, eget volutpat magna mollis ac. Nulla consectetur quam eget orci laoreet, vel malesuada leo elementum. Aliquam in congue libero. Curabitur vitae lorem fringilla, ornare mauris id, rutrum erat.',
            'Cras eleifend auctor tincidunt. In venenatis luctus metus, id semper mi euismod suscipit. Maecenas vulputate, lectus vel venenatis imperdiet, eros est molestie felis, ac accumsan orci justo id orci. Cras et efficitur lacus. Duis maximus commodo nisl, vitae feugiat neque eleifend non. Sed mauris risus, sollicitudin sed nulla eu, finibus pretium lectus. Suspendisse tempor nulla a erat convallis facilisis. Praesent at mi et erat consequat egestas quis sed lectus. Quisque nec tempor felis. In pharetra purus eget orci auctor tristique. Suspendisse volutpat porta risus, a accumsan nisi rutrum et. Donec facilisis dolor eu congue bibendum. Aenean magna arcu, ultrices faucibus pretium vitae, dignissim eu lorem. Vestibulum nec mauris tellus. Nulla at dictum elit, id maximus libero. Integer maximus ullamcorper ipsum.',
          ],
        }),
      1000
    )
  }

  componentWillUnmount() {
    this.stopObserving()
  }

  onRef(ref) {
    this.domElement = ref
  }

  render() {
    const { width, height, top, left, right, bottom, x, y, content } = this.state

    return (
      <div
        ref={this.onRef}
        style={{
          backgroundColor: 'red',
        }}
      >
        <p>width: {width}</p>
        <p>height: {height}</p>
        <p>top: {top}</p>
        <p>bottom: {bottom}</p>
        <p>left: {left}</p>
        <p>right: {right}</p>
        <p>x: {x}</p>
        <p>y: {y}</p>
        <button onClick={this.stopObserving}>Stop Observing</button>
        {content.map((x, id) => <p key={id}>{x}</p>)}
      </div>
    )
  }
}

render(<Demo />, document.getElementById('root'))
