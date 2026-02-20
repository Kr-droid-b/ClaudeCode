import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">JobReady.bg</h3>
            <p className="text-sm leading-relaxed">
              AI платформа за кариерни документи. Оптимизирайте CV-то си,
              генерирайте мотивационно писмо и LinkedIn профил за работа в Европа.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/cv-optimizer" className="hover:text-white transition-colors">CV ATS Оптимизатор</Link></li>
              <li><Link href="/services/cover-letter" className="hover:text-white transition-colors">Мотивационно писмо</Link></li>
              <li><Link href="/services/linkedin-writer" className="hover:text-white transition-colors">LinkedIn профил</Link></li>
              <li><Link href="/services/combo" className="hover:text-white transition-colors">Комбо пакет</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Контакти</h4>
            <ul className="space-y-2 text-sm">
              <li>info@jobready.bg</li>
              <li>
                <div className="flex space-x-4 mt-4">
                  <span className="text-xs">Плащания чрез Stripe — сигурни и криптирани</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-navy-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} JobReady.bg — Всички права запазени.</p>
        </div>
      </div>
    </footer>
  )
}
