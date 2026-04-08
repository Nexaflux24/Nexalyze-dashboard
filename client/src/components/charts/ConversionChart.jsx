import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for conversion chart
const mockConversionData = [
  { date: 'Jan 1', conversions: 65, revenue: 2400 },
  { date: 'Jan 8', conversions: 78, revenue: 2210 },
  { date: 'Jan 15', conversions: 90, revenue: 2290 },
  { date: 'Jan 22', conversions: 81, revenue: 2000 },
  { date: 'Jan 29', conversions: 56, revenue: 2181 },
  { date: 'Feb 5', conversions: 93, revenue: 2500 },
  { date: 'Feb 12', conversions: 120, revenue: 2100 }
]

function ConversionChart() {
  return (
    <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mockConversionData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            tick={{ fill: '#6b7280', fontSize: 13 }}
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fill: '#6b7280', fontSize: 13 }}
          />
          <Tooltip
            cursor={{ stroke: '#06b6d4', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="conversions"
            stroke="#06b6d4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorConversions)"
            name="Conversions"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#f59e0b"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            name="Revenue ($)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default React.memo(ConversionChart)