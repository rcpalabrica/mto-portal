import { Building2, Store, Receipt, Wallet } from 'lucide-react'
import AppCard from './AppCard'

const APPS = [
  {
    name: 'DINGLE MUNICIPAL CEMETERY',
    description: 'Niches and Bone Boxes Rentals',
    icon: Building2,
    iconBgClass: 'bg-sky-100',
    iconColorClass: 'text-sky-600',
    url: 'https://dcm-mto.vercel.app/',
    status: 'live',
  },
  {
    name: 'MARKET STALLS',
    description: 'Stall Rentals',
    icon: Store,
    iconBgClass: 'bg-emerald-100',
    iconColorClass: 'text-emerald-600',
    url: 'https://stalls-mto.vercel.app/',
    status: 'live',
  },
  {
    name: 'COLLECTION SYSTEM',
    description: 'RCD and Abstract of Collections',
    icon: Receipt,
    iconBgClass: 'bg-amber-100',
    iconColorClass: 'text-amber-600',
    url: null,
    status: 'coming-soon',
  },
  {
    name: 'PETTY CASH FUND',
    description: 'PCF Monitoring',
    icon: Wallet,
    iconBgClass: 'bg-violet-100',
    iconColorClass: 'text-violet-600',
    url: 'https://pcf-tan.vercel.app/',
    status: 'live',
  },
]

export default function PortalHome() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
          <img
            src="/dingle seal.png"
            alt="Dingle LGU Seal"
            className="w-12 h-12 rounded-full object-cover bg-white p-0.5"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <div>
            <p className="text-white font-bold text-lg leading-tight tracking-tight">MTO Portal</p>
            <p className="text-slate-400 text-xs leading-tight">Municipality of Dingle, Iloilo</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-xl font-bold text-slate-800">OFFICE OF THE MUNICIPAL TREASURER</h2>
          <p className="text-sm text-slate-500 mt-2">Select an application to get started.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {APPS.map((app) => (
            <div key={app.name} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <AppCard {...app} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
