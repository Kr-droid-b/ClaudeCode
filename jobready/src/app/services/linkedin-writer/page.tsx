'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LinkedInWriterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    jobTitle: '',
    industry: '',
    yearsExperience: '',
    skills: '',
    background: '',
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
      formData.append('service', 'linkedin-writer')
      formData.append(
        'data',
        JSON.stringify({
          jobTitle: form.jobTitle,
          industry: form.industry,
          yearsExperience: parseInt(form.yearsExperience),
          skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
          background: form.background,
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-navy-900">LinkedIn профил</h1>
              <p className="text-gray-500 mt-2">
                Попълнете формата и получете оптимизиран LinkedIn профил
              </p>
              <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mt-3">
                12 лв.
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
                    Длъжност (на английски)
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
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                    Индустрия (на английски)
                  </label>
                  <input
                    type="text"
                    id="industry"
                    required
                    value={form.industry}
                    onChange={(e) => updateField('industry', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Technology, Finance, Marketing..."
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
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                  Ключови умения (разделени със запетая, на английски)
                </label>
                <input
                  type="text"
                  id="skills"
                  required
                  value={form.skills}
                  onChange={(e) => updateField('skills', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Project Management, React, Data Analysis, Team Leadership"
                />
              </div>

              <div>
                <label htmlFor="background" className="block text-sm font-medium text-gray-700 mb-1">
                  Кратко описание на опита (на английски)
                </label>
                <textarea
                  id="background"
                  required
                  rows={4}
                  value={form.background}
                  onChange={(e) => updateField('background', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="I have been working in software development for 5 years, starting as a junior developer at a startup and growing into a senior role at a large enterprise company. I specialize in full-stack development..."
                />
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
                    Продължи към плащане — 12 лв.
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
