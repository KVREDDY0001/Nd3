'use client'
import { useSearchParams } from 'react-router-dom'

export default function Confirm() {
  const [searchParams] = useSearchParams()
  const url = searchParams.get('url')

  return (
    <main style={{ padding: 80 }}>
      <h1>Confirm</h1>
      <p>Tour URL: {url}</p>
    </main>
  )
}