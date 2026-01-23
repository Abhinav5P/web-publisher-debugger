import { useEffect, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import type { WeatherData } from './types'

const SunIcon = ({ size = 40 }: { size?: number }) => (
  <svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
    <circle cx="12" cy="12" fill="currentColor" r="5" />
    <line stroke="currentColor" strokeWidth="2" x1="12" x2="12" y1="1" y2="3" />
    <line stroke="currentColor" strokeWidth="2" x1="12" x2="12" y1="21" y2="23" />
    <line stroke="currentColor" strokeWidth="2" x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
    <line stroke="currentColor" strokeWidth="2" x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
    <line stroke="currentColor" strokeWidth="2" x1="1" x2="3" y1="12" y2="12" />
    <line stroke="currentColor" strokeWidth="2" x1="21" x2="23" y1="12" y2="12" />
    <line stroke="currentColor" strokeWidth="2" x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
    <line stroke="currentColor" strokeWidth="2" x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
  </svg>
)

const MoonIcon = ({ size = 40 }: { size?: number }) => (
  <svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z" fill="currentColor" />
  </svg>
)

const CloudIcon = ({ size = 24 }: { size?: number }) => (
  <svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
    <path
      d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
)

function n(num: number): number {
  return Math.ceil(num)
}

function formatDate(dateStr: string, format: string): string {
  const date = new Date(dateStr)
  if (format === 'MMM d, h:mm a') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }
  if (format === 'ha') {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
  }
  if (format === 'h:mm a') {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }
  return dateStr
}

function isWithinInterval(date: Date, interval: { start: Date; end: Date }): boolean {
  return date >= interval.start && date <= interval.end
}

interface WeatherProps {
  weatherAtLocation: WeatherData
}

export const Weather: React.FC<WeatherProps> = ({ weatherAtLocation }) => {
  if (weatherAtLocation.error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-500 dark:bg-red-950/50">
        {weatherAtLocation.error}
      </div>
    )
  }

  const currentHigh = Math.max(...weatherAtLocation.hourly.temperature_2m.slice(0, 24))
  const currentLow = Math.min(...weatherAtLocation.hourly.temperature_2m.slice(0, 24))

  const isDay = isWithinInterval(new Date(weatherAtLocation.current.time), {
    start: new Date(weatherAtLocation.daily.sunrise[0]),
    end: new Date(weatherAtLocation.daily.sunset[0]),
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const hoursToShow = isMobile ? 5 : 6

  const currentTimeIndex = weatherAtLocation.hourly.time.findIndex(
    (time) => new Date(time) >= new Date(weatherAtLocation.current.time)
  )

  const displayTimes = weatherAtLocation.hourly.time.slice(
    currentTimeIndex,
    currentTimeIndex + hoursToShow
  )
  const displayTemperatures = weatherAtLocation.hourly.temperature_2m.slice(
    currentTimeIndex,
    currentTimeIndex + hoursToShow
  )

  const location =
    weatherAtLocation.cityName ||
    `${weatherAtLocation.latitude?.toFixed(1)}, ${weatherAtLocation.longitude?.toFixed(1)}`

  return (
    <div
      className={cn(
        'relative flex w-full flex-col gap-3 overflow-hidden rounded-2xl p-4 shadow-lg backdrop-blur-sm',
        isDay ? 'bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600' : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900'
      )}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

      <div className="relative z-10">
        <div className="mb-2 flex items-center justify-between">
          <div className="font-medium text-white/80 text-xs">{location}</div>
          <div className="text-white/60 text-xs">
            {formatDate(weatherAtLocation.current.time, 'MMM d, h:mm a')}
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn('text-white/90', isDay ? 'text-yellow-200' : 'text-blue-200')}>
              {isDay ? <SunIcon size={32} /> : <MoonIcon size={32} />}
            </div>
            <div className="font-light text-3xl text-white">
              {n(weatherAtLocation.current.temperature_2m)}
              <span className="text-lg text-white/80">
                {weatherAtLocation.current_units.temperature_2m}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="font-medium text-white/90 text-xs">H: {n(currentHigh)}°</div>
            <div className="text-white/70 text-xs">L: {n(currentLow)}°</div>
          </div>
        </div>

        <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
          <div className="mb-2 font-medium text-white/80 text-xs">Hourly Forecast</div>
          <div className="flex justify-between gap-1">
            {displayTimes.map((time, index) => {
              const hourTime = new Date(time)
              const isCurrentHour = hourTime.getHours() === new Date().getHours()

              return (
                <div
                  className={cn(
                    'flex min-w-0 flex-1 flex-col items-center gap-1 rounded-md px-1 py-1.5',
                    isCurrentHour && 'bg-white/20'
                  )}
                  key={time}
                >
                  <div className="font-medium text-white/70 text-xs">
                    {index === 0 ? 'Now' : formatDate(time, 'ha')}
                  </div>

                  <div className={cn('text-white/60', isDay ? 'text-yellow-200' : 'text-blue-200')}>
                    <CloudIcon size={16} />
                  </div>

                  <div className="font-medium text-white text-xs">
                    {n(displayTemperatures[index])}°
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-2 flex justify-between text-white/60 text-xs">
          <div>Sunrise: {formatDate(weatherAtLocation.daily.sunrise[0], 'h:mm a')}</div>
          <div>Sunset: {formatDate(weatherAtLocation.daily.sunset[0], 'h:mm a')}</div>
        </div>
      </div>
    </div>
  )
}
