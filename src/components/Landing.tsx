import { motion } from 'framer-motion'

interface Props {
  isZooming: boolean
  onEnter: () => void
}

export default function Landing({ isZooming, onEnter }: Props) {
  return (
    <div className="fixed inset-0 z-30 overflow-hidden">
      {/* Mountain photo — zooms in when entering */}
      <motion.div
        className="absolute inset-0"
        animate={isZooming ? { scale: 5, y: '-30%' } : { scale: 1, y: 0 }}
        transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
      >
        <img
          src="/mountain.jpg"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.7) saturate(1.1)' }}
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

      {/* Content overlay — fades out during zoom */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        animate={isZooming ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center tracking-tight mb-3"
        >
          Ameen Harandi
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-sm md:text-base text-white/50 text-center mb-10 tracking-wide"
        >
          Computer Science · Virginia Tech · Full-Stack & AI
        </motion.p>

        {/* Enter button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          onClick={onEnter}
          className="group relative px-8 py-3 rounded-full border border-white/20 text-white/80 text-sm font-medium hover:border-white/40 hover:text-white transition-all cursor-pointer overflow-hidden"
        >
          <span className="relative z-10">Explore my work</span>
          <span className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1"
          >
            <div className="w-1 h-1.5 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
