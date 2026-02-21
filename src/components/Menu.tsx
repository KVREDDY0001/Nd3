'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/menu.module.css'

interface MenuProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function Menu({ isOpen, setIsOpen }: MenuProps) {
  const menuItems = ['WORKS', 'SERVICES', 'ABOUT', 'CONTACT']

  const menuVariants = {
    closed: {
      opacity: 0,
      pointerEvents: 'none' as const,
    },
    open: {
      opacity: 1,
      pointerEvents: 'auto' as const,
    },
  }

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        className={styles.hamburger}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        <motion.svg
          width="28"
          height="20"
          viewBox="0 0 28 20"
          fill="none"
          animate={isOpen ? 'open' : 'closed'}
        >
          <motion.line
            x1="0"
            y1="2"
            x2="28"
            y2="2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 9 },
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.line
            x1="0"
            y1="10"
            x2="28"
            y2="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.line
            x1="0"
            y1="18"
            x2="28"
            y2="18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -9 },
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.svg>
      </motion.button>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.menuOverlay}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.4 }}
          >
            <div className={styles.menuContent}>
              <nav className={styles.navList}>
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={styles.navItem}
                    custom={i}
                    initial="closed"
                    animate="open"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={styles.navText}>{item}</span>
                    <motion.span
                      className={styles.navUnderline}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className={styles.menuFooter}>
              <p>© 2026 InteractiveDesignStudio. All rights reserved.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}