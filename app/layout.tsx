import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navbar from '@/components/Navbar'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'greatReads',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <body className={`${inter.className}`}>
        
        
          <main>
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>

        
        </body> */}
        <body className='flex flex-col h-screen justify-between'>
          <Navbar/>
          <main className='flex flex-row h-screen justify-around items-center'>
            <LeftSidebar />
              <section className="main-container">
                <h1>Main</h1>
                <div className="w-full max-w-4xl">
                  {children}
                </div>
              </section>
              <RightSidebar />
          </main>
          <Footer/>
        </body>
    </html>
  )
}
