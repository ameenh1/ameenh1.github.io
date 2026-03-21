/**
 * A minimal, zero-dependency pub/sub store for the active zone name.
 *
 * We cannot use React state inside useFrame (it would cause per-frame
 * re-renders of the whole tree). Instead, the 3D scene writes the active
 * zone name here at most once per activation change, and the DOM overlay
 * component subscribes to updates via a callback.
 */

type Subscriber = (zoneName: string | null) => void

let current: string | null = null
const subscribers = new Set<Subscriber>()

export const activeZoneStore = {
  get(): string | null {
    return current
  },

  /** Called from inside useFrame – must NOT trigger React re-renders itself. */
  set(zoneName: string | null) {
    if (zoneName === current) return
    current = zoneName
    subscribers.forEach(fn => fn(zoneName))
  },

  subscribe(fn: Subscriber): () => void {
    subscribers.add(fn)
    return () => subscribers.delete(fn)
  },
}
