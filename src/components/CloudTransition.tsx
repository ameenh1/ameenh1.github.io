/**
 * Cloud layers that sweep across the screen during the zoom transition.
 * The clouds fully cover the screen by ~600ms, which is when we swap
 * from landing to portfolio underneath. Then they clear to reveal it.
 */
export default function CloudTransition() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Full white cover that peaks mid-transition */}
      <div
        className="absolute inset-0"
        style={{
          background: 'white',
          animation: 'white-cover 1.6s ease-in-out forwards',
        }}
      />

      {/* Cloud layer 1 — sweeps left */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 35%, transparent 65%)',
          animation: 'cloud-sweep-left 1.6s cubic-bezier(0.4,0,0.2,1) forwards',
        }}
      />

      {/* Cloud layer 2 — sweeps right */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 55%, rgba(245,240,235,0.9) 0%, rgba(245,240,235,0.4) 40%, transparent 65%)',
          animation: 'cloud-sweep-right 1.6s cubic-bezier(0.4,0,0.2,1) 0.05s forwards',
        }}
      />

      {/* Cloud layer 3 — sweeps up from bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 45%, transparent 70%)',
          animation: 'cloud-sweep-up 1.4s cubic-bezier(0.4,0,0.2,1) 0.1s forwards',
        }}
      />
    </div>
  )
}
