import Card from '../ui/Card'

export default function OverviewCards({ data }) {
  if (!data) return null

  const cards = [
    { label: 'Visitors', value: data.visitors, color: 'blue' },
    { label: 'Unique Visitors', value: data.uniqueVisitors, color: 'green' },
    { label: 'Page Views', value: data.pageViews, color: 'purple' },
    { label: 'Bounce Rate', value: `${data.bounceRate}%`, color: 'red' },
    { label: 'Conversion Rate', value: `${data.conversionRate}%`, color: 'orange' },
    { label: 'Revenue', value: `$${data.revenue}`, color: 'indigo' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <Card key={card.label} color={card.color}>
          <p className="text-gray-600 text-sm">{card.label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
        </Card>
      ))}
    </div>
  )
}