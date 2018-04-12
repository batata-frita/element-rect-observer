export default (domElement, callback) => {
  if (
    global.MutationObserver == null &&
    global.ResizeObserver == null
  ) {
    return () => {}
  }

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
        callback(recordedSize)
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

    callback(domElement.getBoundingClientRect())

    return () => {
      observer.disconnect()
      global.removeEventListener('resize', onChange)
    }
  }

  const observer = new global.ResizeObserver(() => callback(domElement.getBoundingClientRect()))

  observer.observe(domElement)

  return () => observer.disconnect()
}
