'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'Какво е ATS и защо е важно?',
    answer:
      'ATS (Applicant Tracking System) е софтуер, който компаниите използват за филтриране на кандидатури. Над 90% от големите компании в Западна Европа използват ATS. Ако CV-то ви не е оптимизирано, може да бъде отхвърлено автоматично, дори да сте идеалният кандидат.',
  },
  {
    question: 'Колко време отнема обработката?',
    answer:
      'След успешно плащане, AI системата обработва вашите документи за 1-3 минути. Получавате готовия файл на имейла си веднага след обработката.',
  },
  {
    question: 'На какъв език са документите?',
    answer:
      'CV оптимизацията е на английски, тъй като това е стандартът за международни кандидатури. Мотивационното писмо може да бъде на английски или немски. LinkedIn профилът е на английски.',
  },
  {
    question: 'Какви файлови формати поддържате?',
    answer:
      'За входящи файлове поддържаме PDF и Word (.docx). Готовите документи се доставят като PDF файлове.',
  },
  {
    question: 'Мога ли да получа възстановяване на сумата?',
    answer:
      'Ако не сте доволни от резултата, свържете се с нас в рамките на 24 часа след получаване на документа. Ще направим ревизия или ще възстановим сумата.',
  },
  {
    question: 'Безопасни ли са моите лични данни?',
    answer:
      'Абсолютно. Вашите файлове се обработват автоматично и се изтриват от сървърите ни веднага след изпращане на имейла. Плащанията се обработват от Stripe — лидер в сигурните онлайн плащания.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
          Често задавани въпроси
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-semibold text-navy-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
