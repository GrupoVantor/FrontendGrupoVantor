type RevealHandler = (entry: IntersectionObserverEntry) => void

const handlers = new WeakMap<Element, RevealHandler>()
let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) handlers.get(entry.target)?.(entry)
      },
      // Several steps so tall elements (whose ratio never gets high) still report progress.
      { threshold: [0, 0.05, 0.1, 0.15, 0.25, 0.5] },
    )
  }
  return observer
}

/** Client-only: call from onMounted. Returns a cleanup function. */
export function observeReveal(el: Element, handler: RevealHandler): () => void {
  handlers.set(el, handler)
  getObserver().observe(el)
  return () => {
    observer?.unobserve(el)
    handlers.delete(el)
  }
}
