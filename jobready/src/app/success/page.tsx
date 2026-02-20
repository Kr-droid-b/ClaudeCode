import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-navy-900 mb-4">
              Плащането е успешно!
            </h1>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Вашата поръчка се обработва в момента. Ще получите готовия документ
              на вашия имейл адрес в рамките на <strong>1-3 минути</strong>.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-8">
              <div className="flex items-center gap-2 text-blue-700 text-sm font-medium mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Какво следва?
              </div>
              <ul className="text-sm text-blue-600 space-y-1 text-left">
                <li>1. Проверете имейла си (включително папка Spam)</li>
                <li>2. Изтеглете прикачения PDF файл</li>
                <li>3. Прегледайте и персонализирайте документа</li>
                <li>4. Кандидатствайте с увереност!</li>
              </ul>
            </div>
            <Link
              href="/"
              className="inline-block bg-navy-900 hover:bg-navy-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Обратно към началото
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
