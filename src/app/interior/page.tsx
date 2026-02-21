'use client'
import { interior } from '@/data/projects'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Interior() {
  const router = useRouter()
  const [bg, setBg] = useState<string | null>(null)

  return (
    <main style={{ padding:80 }}>
      {interior.map(p => (
        <div 
          key={p.name} 
          style={{ marginBottom:80 }}
          onPointerEnter={() => setBg('interior')}
          onPointerLeave={() => setBg(null)}
        >
          <div style={{ overflow:'hidden' }}>
            <img
              src={p.img}
              style={{
                width:'75%',
                transition:'transform .6s ease',
              }}
              onMouseOver={e => e.currentTarget.style.transform='scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform='scale(1)'}
            />
          </div>

          <h2 style={{ fontFamily:'GTPressura', letterSpacing:'0.15em' }}>{p.name}</h2>

          <button
            onClick={() => router.push(`/confirm?url=${encodeURIComponent(p.url)}`)}
          >
            Enter Virtual Tour
          </button>
        </div>
      ))}
    </main>
  )
}