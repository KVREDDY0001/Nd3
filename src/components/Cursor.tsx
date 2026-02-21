'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/cursor.module.css'

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleInteractiveElement = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target?.tagName === 'BUTTON' ||
        target?.tagName === 'A' ||
        target?.closest('button') !== null ||
        target?.closest('a') !== null ||
        target?.closest('[role="button"]') !== null ||
        target?.closest('canvas') !== null

      setIsHovering(isInteractive)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousemove', handleInteractiveElement)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', handleInteractiveElement)
    }
  }, [])

  return (
    <>
      <motion.div
        className={styles.cursorDot}
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      />
      <motion.div
        className={styles.cursorRing}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
        }}
      />
    </>
  )
}