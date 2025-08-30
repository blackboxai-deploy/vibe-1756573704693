import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FreshMart - Smart Grocery Reorder Assistant',
  description: 'Never Run Out Again - AI-powered grocery reorder assistant that predicts when you need essentials and enables one-click reordering.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        {children}
      </body>
    </html>
  )
}