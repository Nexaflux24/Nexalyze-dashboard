import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for source chart
const mockSourceData = [
  { name: 'Direct', value: 45, percentage: 30 },
  { name: 'Organic Search', value: 50, percentage: 35 },
  { name: 'Social Media', value: 30, percentage: 20 },
  { name: 'Referral', value: 20, percentage: 15 }
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

function SourceChart() {
  return (
    <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={mockSourceData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name} (${percentage}%)`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {mockSourceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} visitors`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default React.memo(SourceChart)