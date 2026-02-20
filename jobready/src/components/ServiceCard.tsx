import Link from 'next/link'

interface ServiceCardProps {
  title: string
  price: string
  description: string
  features: string[]
  href: string
  popular?: boolean
  icon: React.ReactNode
}

export default function ServiceCard({
  title,
  price,
  description,
  features,
  href,
  popular,
  icon,
}: ServiceCardProps) {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg p-8 flex flex-col transition-transform hover:scale-105 ${
        popular ? 'ring-2 ring-blue-500 shadow-blue-100' : ''
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Най-популярен
        </div>
      )}
      <div className="text-blue-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-navy-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-4">{description}</p>
      <div className="text-3xl font-bold text-navy-900 mb-6">
        {price} <span className="text-base font-normal text-gray-400">лв.</span>
      </div>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
          popular
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-navy-100 text-navy-900 hover:bg-navy-200'
        }`}
      >
        Избери
      </Link>
    </div>
  )
}
