import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for traffic chart
const mockTrafficData = [
  { date: 'Jan 1', traffic: 4000, users: 2400 },
  { date: 'Jan 8', traffic: 3000, users: 1398 },
  { date: 'Jan 15', traffic: 2000, users: 9800 },
  { date: 'Jan 22', traffic: 2780, users: 3908 },
  { date: 'Jan 29', traffic: 1890, users: 4800 },
  { date: 'Feb 5', traffic: 2390, users: 3800 },
  { date: 'Feb 12', traffic: 3490, users: 4300 }
]

function TrafficChart() {
  return (
    <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={mockTrafficData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
            cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="traffic"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Total Traffic"
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
            name="Unique Users"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default React.memo(TrafficChart)