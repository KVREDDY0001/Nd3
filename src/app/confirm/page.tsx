'use client'
import { useSearchParams } from 'next/navigation'

export default function Confirm() {
  const url = useSearchParams().get('url')

  return (
    <main style={{
      height:'100vh',
      background:'#000',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'column',
      gap:30
    }}>
      <p style={{ fontFamily:'GTPressura', opacity:.7 }}>
        You are being redirected to an external immersive experience.
      </p>

      <a
        href={url!}
        target="_blank"
        style={{ border:'1px solid #555', padding:'14px 32px', color:'#fff' }}
      >
        Continue
      </a>
    </main>
  )
}
