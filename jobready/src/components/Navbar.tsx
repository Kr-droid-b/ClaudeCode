'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-navy-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xl font-bold">JobReady.bg</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/#services" className="hover:text-blue-300 transition-colors">Услуги</a>
            <a href="/#pricing" className="hover:text-blue-300 transition-colors">Цени</a>
            <a href="/#how-it-works" className="hover:text-blue-300 transition-colors">Как работи</a>
            <a href="/#faq" className="hover:text-blue-300 transition-colors">FAQ</a>
            <Link
              href="/services/cv-optimizer"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Започни сега
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="/#services" className="block py-2 hover:text-blue-300" onClick={() => setMobileOpen(false)}>Услуги</a>
            <a href="/#pricing" className="block py-2 hover:text-blue-300" onClick={() => setMobileOpen(false)}>Цени</a>
            <a href="/#how-it-works" className="block py-2 hover:text-blue-300" onClick={() => setMobileOpen(false)}>Как работи</a>
            <a href="/#faq" className="block py-2 hover:text-blue-300" onClick={() => setMobileOpen(false)}>FAQ</a>
            <Link
              href="/services/cv-optimizer"
              className="block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold text-center transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Започни сега
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
