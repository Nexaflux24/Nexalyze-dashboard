import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../ui/Card'

export default function ConversionChart({ data }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversions</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          />
          <Bar dataKey="conversions" fill="#f59e0b" />
          <Bar dataKey="revenue" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}