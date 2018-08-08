import rafDebounce from 'raf-debounce'

export default (domElement, callback) => {
  if (global.MutationObserver == null && global.ResizeObserver == null) {
    return () => {}
  }

  const debouncedCallback = rafDebounce(callback).fn

  if (global.ResizeObserver == null) {
    let recordedSize = {}

    const onChange = () => {
      const boundingClientRect = domElement.getBoundingClientRect()

      if (
        boundingClientRect.width !== recordedSize.width ||
        boundingClientRect.height !== recordedSize.height ||
        boundingClientRect.top !== recordedSize.top ||
        boundingClientRect.left !== recordedSize.left ||
        boundingClientRect.right !== recordedSize.right ||
        boundingClientRect.bottom !== recordedSize.bottom ||
        boundingClientRect.x !== recordedSize.x ||
        boundingClientRect.y !== recordedSize.y
      ) {
        recordedSize = boundingClientRect
        debouncedCallback(recordedSize)
      }
    }

    const observer = new global.MutationObserver(onChange)

    global.addEventListener('resize', onChange)

    observer.observe(domElement, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    })

    debouncedCallback(domElement.getBoundingClientRect())

    return () => {
      observer.disconnect()
      global.removeEventListener('resize', onChange)
    }
  }

  const observer = new global.ResizeObserver(() =>
    debouncedCallback(domElement.getBoundingClientRect())
  )

  observer.observe(domElement)

  return () => observer.disconnect()
}
