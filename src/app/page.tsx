'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Scene from '@/components/Scene'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  const heroLabelRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3 }
    )
      .fromTo(
        heroLabelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        heroTitleRef.current?.children ? Array.from(heroTitleRef.current.children) : [],
        { y: 80, opacity: 0, rotationX: -15 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.12 },
        '-=0.5'
      )
      .fromTo(
        heroSubRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        labelsRef.current?.children ? Array.from(labelsRef.current.children) : [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
        '-=0.3'
      )
      .fromTo(
        footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      )
  }, [])

  return (
    <>
      <CustomCursor />

      {/* 3D Canvas — fixed background */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Overlay */}
      <div className="overlay">
        {/* Navigation */}
        <nav className="nav" ref={navRef} style={{ opacity: 0 }}>
          <a href="/" className="nav-logo">Studio</a>
          <ul className="nav-links">
            <li><a href="/exterior">Exterior</a></li>
            <li><a href="/interior">Interior</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>

        {/* Hero Content */}
        <div className="hero">
          <div className="hero-label" ref={heroLabelRef}>
            Architecture & Interior Design
          </div>
          <h1 className="hero-title" ref={heroTitleRef}>
            <span className="highlight">Interactive</span>
            <br />
            <span>Design Studio</span>
          </h1>
          <p className="hero-subtitle" ref={heroSubRef}>
            Exploring the boundaries between architecture, technology, and immersive digital experiences.
          </p>
        </div>

        {/* Sphere Labels */}
        <div className="sphere-labels" ref={labelsRef}>
          <motion.a
            href="/exterior"
            className="sphere-label"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ textDecoration: 'none' }}
          >
            <div className="sphere-label-title">Exterior</div>
            <div className="sphere-label-line" />
            <div className="sphere-label-desc">Explore Outside</div>
          </motion.a>

          <motion.a
            href="/interior"
            className="sphere-label"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ textDecoration: 'none' }}
          >
            <div className="sphere-label-title">Interior</div>
            <div className="sphere-label-line" />
            <div className="sphere-label-desc">Explore Inside</div>
          </motion.a>
        </div>

        {/* Footer */}
        <div className="footer-bar" ref={footerRef} style={{ opacity: 0 }}>
          <div className="footer-tagline">
            Crafted with <span>passion</span> for design
          </div>
          <div className="footer-scroll">
            <span className="scroll-dot" />
            Click a sphere to explore
          </div>
        </div>
      </div>
    </>
  )
}