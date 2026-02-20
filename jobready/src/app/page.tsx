import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ServiceCard from '@/components/ServiceCard'
import FAQ from '@/components/FAQ'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Вашето CV, готово за
            <span className="text-blue-400"> Европа</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            AI платформа, която оптимизира CV-то ви за ATS системи, генерира мотивационно писмо
            и LinkedIn профил. За минути, не за дни.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services/cv-optimizer"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg shadow-blue-500/25"
            >
              Оптимизирай CV-то си
            </Link>
            <a
              href="#pricing"
              className="border border-gray-400 hover:border-white text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Виж цените
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Готово за 1-3 минути
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              ATS оптимизирано
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Сигурни плащания чрез Stripe
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-4">Как работи?</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Три прости стъпки до професионални документи за кариерата ви в чужбина
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Изберете услуга',
                desc: 'CV оптимизация, мотивационно писмо, LinkedIn профил или комбо пакет',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                ),
              },
              {
                step: '2',
                title: 'Попълнете формата',
                desc: 'Качете CV или въведете информацията за желаната услуга',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
              },
              {
                step: '3',
                title: 'Платете сигурно',
                desc: 'Бързо и сигурно плащане чрез Stripe с карта',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                step: '4',
                title: 'Получете документа',
                desc: 'AI обработва данните и получавате готовия файл на имейла си',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-sm text-blue-500 font-semibold mb-1">Стъпка {item.step}</div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-4">Нашите услуги</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Всичко необходимо за успешно кандидатстване за работа в Западна Европа
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="text-blue-500 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">CV ATS Оптимизатор</h3>
              <p className="text-gray-500 mb-4">
                Качете текущото си CV и получете ATS-оптимизирана версия с правилни ключови думи,
                структура и формат за западноевропейския пазар.
              </p>
              <Link href="/services/cv-optimizer" className="text-blue-500 font-semibold hover:text-blue-600">
                Научете повече &rarr;
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="text-blue-500 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Мотивационно писмо</h3>
              <p className="text-gray-500 mb-4">
                Попълнете кратка форма и получете професионално мотивационно писмо,
                персонализирано за конкретната позиция и компания.
              </p>
              <Link href="/services/cover-letter" className="text-blue-500 font-semibold hover:text-blue-600">
                Научете повече &rarr;
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="text-blue-500 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">LinkedIn профил</h3>
              <p className="text-gray-500 mb-4">
                Получете оптимизирани LinkedIn секции — headline, about и experience,
                готови за копиране в профила ви.
              </p>
              <Link href="/services/linkedin-writer" className="text-blue-500 font-semibold hover:text-blue-600">
                Научете повече &rarr;
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow border-2 border-blue-500">
              <div className="text-blue-500 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Комбо пакет</h3>
              <p className="text-gray-500 mb-4">
                Всичките три услуги на преференциална цена. CV + Мотивационно писмо + LinkedIn
                — всичко необходимо за кандидатстване.
              </p>
              <Link href="/services/combo" className="text-blue-500 font-semibold hover:text-blue-600">
                Научете повече &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-4">Прозрачни цени</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Без скрити такси. Платете веднъж, получете документа за минути.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              title="CV ATS Оптимизатор"
              price="10"
              description="Оптимизирайте CV-то си за ATS системите на западните компании"
              features={[
                'Качете PDF или Word файл',
                'ATS-оптимизиран формат',
                'Ключови думи за EU пазара',
                'Професионална структура',
                'Готов PDF за изтегляне',
              ]}
              href="/services/cv-optimizer"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
            <ServiceCard
              title="Мотивационно писмо"
              price="8"
              description="Персонализирано писмо за конкретната позиция"
              features={[
                'Попълнете кратка форма',
                'Английски или немски',
                '3-4 параграфа',
                'Персонализирано за компанията',
                'PDF формат',
              ]}
              href="/services/cover-letter"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
            <ServiceCard
              title="LinkedIn профил"
              price="12"
              description="Оптимизиран профил за рекрутъри"
              features={[
                'Headline (120 символа)',
                'About секция (2600 символа)',
                '3 experience записа',
                'Ключови думи за индустрията',
                'Готов за копиране',
              ]}
              href="/services/linkedin-writer"
              popular
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />
            <ServiceCard
              title="Комбо пакет"
              price="25"
              description="Всичките три услуги на преференциална цена"
              features={[
                'CV ATS Оптимизатор',
                'Мотивационно писмо',
                'LinkedIn профил',
                'Спестявате 5 лв.',
                'Пълен кариерен пакет',
              ]}
              href="/services/combo"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Какво казват нашите клиенти</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Мария К.',
                role: 'Софтуерен инженер, Берлин',
                text: 'Благодарение на JobReady.bg получих интервю в три немски компании. CV-то ми беше перфектно оптимизирано за ATS системите.',
              },
              {
                name: 'Георги П.',
                role: 'Маркетинг мениджър, Виена',
                text: 'Мотивационното писмо беше изключително добре написано. Спести ми часове работа и получих позицията, за която кандидатствах.',
              },
              {
                name: 'Ивана Д.',
                role: 'Финансов аналитик, Лондон',
                text: 'LinkedIn профилът ми се промени изцяло. След оптимизацията започнах да получавам съобщения от рекрутъри всяка седмица.',
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-navy-800 rounded-2xl p-8">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Output */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-4">Примерен резултат</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Вижте как AI оптимизира реално CV за ATS системите
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="text-red-500 font-semibold text-sm mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                ПРЕДИ
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 space-y-2 font-mono">
                <p className="font-bold">Иван Иванов</p>
                <p>Работя в IT от 5 години. Правя уеб сайтове и приложения. Знам JavaScript и Python.</p>
                <p>Образование: Информатика, СУ</p>
                <p>Опит: Фирма ООД - програмист</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 ring-2 ring-green-500">
              <div className="text-green-500 font-semibold text-sm mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                СЛЕД — ATS Оптимизирано
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 space-y-2 font-mono">
                <p className="font-bold">IVAN IVANOV</p>
                <p className="font-semibold text-navy-800">Full-Stack Software Engineer</p>
                <p>Results-driven Full-Stack Engineer with 5+ years building scalable web applications. Proficient in JavaScript, TypeScript, React, Node.js, Python, and PostgreSQL.</p>
                <p className="font-semibold mt-2">EXPERIENCE</p>
                <p>Software Engineer | Company Ltd | 2019-Present</p>
                <p>&#x2022; Developed 15+ responsive web applications serving 10K+ daily users</p>
                <p>&#x2022; Reduced page load time by 40% through code optimization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готови ли сте за следващата стъпка?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Хиляди българи вече работят в Европа с документи от JobReady.bg
          </p>
          <Link
            href="/services/cv-optimizer"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Започнете сега — от 8 лв.
          </Link>
        </div>
      </section>

      <FAQ />
      <Footer />
    </>
  )
}
