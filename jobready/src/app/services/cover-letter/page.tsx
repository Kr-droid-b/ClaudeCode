'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CoverLetterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    jobTitle: '',
    companyName: '',
    skill1: '',
    skill2: '',
    skill3: '',
    yearsExperience: '',
    achievement: '',
    language: 'en' as 'en' | 'de',
  })

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('email', form.email)
      formData.append('service', 'cover-letter')
      formData.append(
        'data',
        JSON.stringify({
          jobTitle: form.jobTitle,
          companyName: form.companyName,
          skills: [form.skill1, form.skill2, form.skill3].filter(Boolean),
          yearsExperience: parseInt(form.yearsExperience),
          achievement: form.achievement,
          language: form.language,
        })
      )

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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-navy-900">Мотивационно писмо</h1>
              <p className="text-gray-500 mt-2">
                Попълнете формата и получете персонализирано мотивационно писмо
              </p>
              <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mt-3">
                8 лв.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Имейл адрес
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="vashemail@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Позиция (на английски)
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    required
                    value={form.jobTitle}
                    onChange={(e) => updateField('jobTitle', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Компания
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    required
                    value={form.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Google, SAP, Siemens..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Топ 3 умения (на английски)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    value={form.skill1}
                    onChange={(e) => updateField('skill1', e.target.value)}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    placeholder="React"
                  />
                  <input
                    type="text"
                    required
                    value={form.skill2}
                    onChange={(e) => updateField('skill2', e.target.value)}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    placeholder="Node.js"
                  />
                  <input
                    type="text"
                    value={form.skill3}
                    onChange={(e) => updateField('skill3', e.target.value)}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    placeholder="Python"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 mb-1">
                  Години опит
                </label>
                <input
                  type="number"
                  id="yearsExperience"
                  required
                  min="0"
                  max="50"
                  value={form.yearsExperience}
                  onChange={(e) => updateField('yearsExperience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="5"
                />
              </div>

              <div>
                <label htmlFor="achievement" className="block text-sm font-medium text-gray-700 mb-1">
                  Ключово постижение (на английски)
                </label>
                <textarea
                  id="achievement"
                  required
                  rows={3}
                  value={form.achievement}
                  onChange={(e) => updateField('achievement', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Led a team of 5 to deliver a project 2 weeks ahead of schedule, resulting in 30% cost savings..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Език на писмото
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="language"
                      value="en"
                      checked={form.language === 'en'}
                      onChange={() => updateField('language', 'en')}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Английски</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="language"
                      value="de"
                      checked={form.language === 'de'}
                      onChange={() => updateField('language', 'de')}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Немски</span>
                  </label>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
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
                    Продължи към плащане — 8 лв.
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                Плащането се обработва сигурно чрез Stripe.
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
