export function throttle(fn: (...args: any[]) => void, delay: number) {
  let lastTime = 0
  return function (this: unknown, ...args: any[]) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}