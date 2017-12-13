export default (domElement, callback) => {
  let recordedSize = {}

  if (typeof global.ResizeObserver !== 'function') {
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

    const observer = new MutationObserver(onChange)

    window.addEventListener('resize', onChange)

    observer.observe(domElement, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    })

    callback(domElement.getBoundingClientRect())

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onChange)
    }
  }

  const observer = new ResizeObserver(() => callback(domElement.getBoundingClientRect()))

  observer.observe(domElement)

  return () => observer.disconnect()
}
