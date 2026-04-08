import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

// Mock data for platform chart
const mockPlatformData = [
  { platform: 'Desktop', visitors: 8500 },
  { platform: 'Mobile', visitors: 6200 },
  { platform: 'Tablet', visitors: 3400 },
  { platform: 'Smart TV', visitors: 1200 }
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']

function PlatformChart() {
  return (
    <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={mockPlatformData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="platform"
            stroke="#9ca3af"
            tick={{ fill: '#6b7280', fontSize: 13 }}
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fill: '#6b7280', fontSize: 13 }}
          />
          <Tooltip formatter={(value) => `${value} visitors`} />
          <Bar dataKey="visitors" fill="#3b82f6" radius={[8, 8, 0, 0]}>
            {mockPlatformData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default React.memo(PlatformChart)