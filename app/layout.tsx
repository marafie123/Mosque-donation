import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { MoonIcon as CrescentMoon, User, Building } from 'lucide-react'
import { MosqueProvider } from '@/contexts/MosqueContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mosque Support Platform',
  description: 'Support mosques with one-off donations and monthly subscriptions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-beige-50`}>
        <MosqueProvider>
          <header className="bg-black text-white py-4">
            <nav className="container mx-auto px-4 flex justify-between items-center">
              <Link href="/" className="flex items-center space-x-2">
                <CrescentMoon className="w-8 h-8" />
                <span className="text-xl font-bold">Mosque Support</span>
              </Link>
              <ul className="flex space-x-4 items-center">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><Link href="#" className="hover:text-gray-300">About</Link></li>
                <li><Link href="#" className="hover:text-gray-300">Contact</Link></li>
                <li>
                  <Link href="/profile" className="flex items-center space-x-1 hover:text-gray-300">
                    <User className="w-5 h-5" />
                    <span>Donor Profile</span>
                  </Link>
                </li>
                <li>
                  <Link href="/mosque-account/1" className="flex items-center space-x-1 hover:text-gray-300">
                    <Building className="w-5 h-5" />
                    <span>Mosque Account</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-sand-100 py-6">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2024 Mosque Support Platform. All rights reserved.</p>
            </div>
          </footer>
        </MosqueProvider>
      </body>
    </html>
  )
}

