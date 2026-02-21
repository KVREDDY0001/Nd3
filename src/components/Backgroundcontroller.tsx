'use client'
import { motion, AnimatePresence } from 'framer-motion'

interface BackgroundControllerProps {
  active: 'exterior' | 'interior' | null
}

export default function BackgroundController({ active }: BackgroundControllerProps) {
  const image =
    active === 'exterior'
      ? '/bg/exterior.jpg'
      : active === 'interior'
      ? '/bg/interior.jpg'
      : null

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            filter: 'brightness(0.6) contrast(1.1)',
          }}
        />
      )}
    </AnimatePresence>
  )
}