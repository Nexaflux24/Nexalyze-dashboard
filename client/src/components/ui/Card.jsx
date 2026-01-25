const colorMap = {
  blue: 'bg-blue-50 border-blue-100',
  green: 'bg-green-50 border-green-100',
  red: 'bg-red-50 border-red-100',
  purple: 'bg-purple-50 border-purple-100',
  orange: 'bg-orange-50 border-orange-100',
  indigo: 'bg-indigo-50 border-indigo-100',
  gray: 'bg-gray-50 border-gray-100'
}

export default function Card({ children, color = 'gray' }) {
  return (
    <div className={`${colorMap[color] || colorMap.gray} border rounded-lg p-6 shadow-sm hover:shadow-md transition`}>
      {children}
    </div>
  )
}