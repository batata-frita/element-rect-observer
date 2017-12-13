if (typeof global.ResizeObserver !== 'function') {
  class ResizeObserver {
    constructor (callback) {
      this.onChange = this.onChange.bind(this)

      this.callback = callback
      this.observer = new MutationObserver(this.onChange)
    }

    observe (domElement) {
      this.observer.observe(this.domElement, {
        attributes: true,
        attributeFilter: ['style'],
      })
    }

    onChange (mutations) {
      const newSize = mutations.reduce((result, mutation) => {
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
    }

    unobserve (domElement) {
      // this.observer.observe(this.domElement, {
      //   attributes: true,
      //   attributeFilter: ['style'],
      // })
    }

    disconnect () {
      this.observer.disconnect()
    }
  }

  global.ResizeObserver = ResizeObserver
}
