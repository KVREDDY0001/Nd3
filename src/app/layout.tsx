import './globals.css'

export const metadata = {
  title: 'Studio',
  description: 'Architecture & Interior Design'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
