import { useState, useCallback } from 'react'
import Landing from './components/Landing'
import CloudTransition from './components/CloudTransition'
import Portfolio from './components/Portfolio'

export default function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [isZooming, setIsZooming] = useState(false)
  const [showClouds, setShowClouds] = useState(false)
  const [showPortfolio, setShowPortfolio] = useState(false)

  const handleEnter = useCallback(() => {
    setIsZooming(true)
    setShowClouds(true)

    // At 700ms: clouds have fully covered the screen → reveal portfolio, hide landing
    setTimeout(() => {
      setShowPortfolio(true)
      setShowLanding(false)
      setIsZooming(false)
    }, 700)

    // At 1800ms: cloud animation is fully done → unmount cloud layer
    setTimeout(() => {
      setShowClouds(false)
    }, 1800)
  }, [])

  const handleBackToLanding = useCallback(() => {
    setShowLanding(true)
    setShowPortfolio(false)
    setIsZooming(false)
    setShowClouds(false)
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-dark-950">
      {/* Portfolio is ALWAYS pre-rendered (hidden until revealed) */}
      <div className={showPortfolio ? '' : 'invisible fixed inset-0'}>
        <Portfolio onBackToMountain={handleBackToLanding} />
      </div>

      {/* Landing on top */}
      {showLanding && (
        <Landing isZooming={isZooming} onEnter={handleEnter} />
      )}

      {/* Clouds — independent lifecycle, stays until animation finishes */}
      {showClouds && <CloudTransition />}
    </div>
  )
}
