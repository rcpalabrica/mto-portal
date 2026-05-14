export default function AppCard({ name, description, icon: Icon, iconBgClass, iconColorClass, url, status }) {
  const isLive = status === 'live'

  const handleClick = () => {
    if (isLive && url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      onClick={handleClick}
      role={isLive ? 'link' : undefined}
      tabIndex={isLive ? 0 : undefined}
      onKeyDown={isLive ? (e) => e.key === 'Enter' && handleClick() : undefined}
      className={[
        'relative bg-white rounded-2xl border border-slate-200 p-8',
        'flex flex-col items-center gap-4 text-center select-none',
        isLive
          ? 'cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500'
          : 'opacity-40 cursor-not-allowed shadow-sm',
      ].join(' ')}
    >
      {!isLive && (
        <span className="absolute top-3 right-3 bg-slate-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide">
          Soon
        </span>
      )}

      <div className={`w-20 h-20 rounded-2xl ${iconBgClass} flex items-center justify-center`}>
        <Icon size={40} className={iconColorClass} strokeWidth={1.5} />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800">{name}</p>
        {description && (
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  )
}
