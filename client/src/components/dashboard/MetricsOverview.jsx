import { TrendingUp, TrendingDown, BarChart3, DollarSign, Clock, Activity } from 'lucide-react'

export default function MetricsOverview({ data }) {
  if (!data) return null

  const metrics = [
    {
      label: 'Total Traffic',
      value: data.totalTraffic?.toLocaleString() || '0',
      icon: Activity,
      color: 'blue',
      trend: '+12.5%'
    },
    {
      label: 'Total Conversions',
      value: data.totalConversions?.toLocaleString() || '0',
      icon: TrendingUp,
      color: 'green',
      trend: '+8.2%'
    },
    {
      label: 'Conversion Rate',
      value: `${data.conversionRate?.toFixed(2) || '0'}%`,
      icon: BarChart3,
      color: 'purple',
      trend: '+2.1%'
    },
    {
      label: 'Total Revenue',
      value: `$${data.totalRevenue?.toLocaleString() || '0'}`,
      icon: DollarSign,
      color: 'amber',
      trend: '+15.3%'
    },
    {
      label: 'Avg. Session Duration',
      value: `${data.avgSessionDuration?.toFixed(2) || '0'}m`,
      icon: Clock,
      color: 'indigo',
      trend: '-0.5%'
    },
    {
      label: 'Bounce Rate',
      value: `${data.bounceRate?.toFixed(1) || '0'}%`,
      icon: Activity,
      color: 'red',
      trend: '-3.2%'
    }
  ]

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    red: 'bg-red-100 text-red-600'
  }

  const gradientMap = {
    blue: ['#bfdbfe', '#3b82f6'],
    green: ['#bbf7d0', '#10b981'],
    purple: ['#e9d5ff', '#8b5cf6'],
    amber: ['#ffedd5', '#f59e0b'],
    indigo: ['#e0e7ff', '#4f46e5'],
    red: ['#fee2e2', '#ef4444']
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        const isTrendPositive = !metric.trend.startsWith('-')
        const gradient = gradientMap[metric.color] || gradientMap.blue

        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 hover:shadow-xl transition"
          >
            {/* Icon */}
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4`} style={{ background: gradient[0], color: gradient[1] }}>
              <Icon size={18} />
            </div>

            {/* Content */}
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">{metric.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                  {metric.value}
                </h3>
                <div className={`flex items-center gap-1 text-xs md:text-sm font-semibold px-2 py-1 rounded-lg ${isTrendPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {isTrendPositive ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                  {metric.trend}
                </div>
              </div>
            </div>

            {/* Bottom gradient */}
            <div className="h-1 rounded-full mt-4" style={{ background: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})` }} />
          </div>
        )
      })}
    </div>
  )
}