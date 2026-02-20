'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CVOptimizerPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!file) {
      setError('Моля, качете вашето CV.')
      setLoading(false)
      return
    }

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (!allowedTypes.includes(file.type)) {
      setError('Моля, качете PDF или Word (.docx) файл.')
      setLoading(false)
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Файлът е твърде голям. Максимум 10 MB.')
      setLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('service', 'cv-optimizer')
      formData.append('file', file)

      const res = await fetch('/api/checkout', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (data.url) {
        router.push(data.url)
      } else {
        setError(data.error || 'Възникна грешка. Моля, опитайте отново.')
      }
    } catch {
      setError('Възникна грешка. Моля, опитайте отново.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-navy-900">CV ATS Оптимизатор</h1>
              <p className="text-gray-500 mt-2">
                Качете вашето CV и получете ATS-оптимизирана версия
              </p>
              <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mt-3">
                10 лв.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Имейл адрес
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                  placeholder="vashemail@example.com"
                />
                <p className="text-xs text-gray-400 mt-1">
                  На този адрес ще получите готовия документ
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Качете CV (PDF или Word)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {file ? (
                      <p className="text-blue-600 font-medium">{file.name}</p>
                    ) : (
                      <>
                        <p className="text-gray-600">Кликнете тук или плъзнете файла</p>
                        <p className="text-gray-400 text-sm mt-1">PDF или DOCX, макс. 10 MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Обработва се...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Продължи към плащане — 10 лв.
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                Плащането се обработва сигурно чрез Stripe. Данните ви са защитени.
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
