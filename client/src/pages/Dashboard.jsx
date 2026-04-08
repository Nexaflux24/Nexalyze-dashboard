import { useState, useEffect, Suspense, lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, RefreshCw } from 'lucide-react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import MetricsOverview from '../components/dashboard/MetricsOverview'

// Lazy-load chart components to improve initial load performance
const TrafficChart = lazy(() => import('../components/charts/TrafficChart'))
const ConversionChart = lazy(() => import('../components/charts/ConversionChart'))
const SourceChart = lazy(() => import('../components/charts/SourceChart'))
const PlatformChart = lazy(() => import('../components/charts/PlatformChart'))

export default function Dashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    
    fetchData()
  }, [dateRange])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Mock data for demonstration
      setData({
        totalTraffic: 45230,
        totalConversions: 1240,
        conversionRate: 2.74,
        totalRevenue: 24500,
        avgSessionDuration: 3.45,
        bounceRate: 32.4
      })
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err.message || 'Failed to fetch analytics data')
      // Set mock data even on error
      setData({
        totalTraffic: 45230,
        totalConversions: 1240,
        conversionRate: 2.74,
        totalRevenue: 24500,
        avgSessionDuration: 3.45,
        bounceRate: 32.4
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('refreshToken')
    navigate('/login')
  }


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          onLogout={handleLogout}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.firstName}! 👋
              </h1>
              <p className="text-gray-600 mt-2">
                Here's your analytics overview for the selected period
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-semibold text-red-900">Error loading data</h3>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && !data ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Loading your analytics data...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Metrics Overview */}
                {data && <MetricsOverview data={data} />}

                {/* Charts Grid (lazy-loaded) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Over Time</h3>
                    <Suspense fallback={<div className="h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-100 rounded animate-pulse" />}>
                      <TrafficChart dateRange={dateRange} />
                    </Suspense>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rate</h3>
                    <Suspense fallback={<div className="h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-100 rounded animate-pulse" />}>
                      <ConversionChart dateRange={dateRange} />
                    </Suspense>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
                    <Suspense fallback={<div className="h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-100 rounded animate-pulse" />}>
                      <SourceChart dateRange={dateRange} />
                    </Suspense>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Distribution</h3>
                    <Suspense fallback={<div className="h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-100 rounded animate-pulse" />}>
                      <PlatformChart dateRange={dateRange} />
                    </Suspense>
                  </div>
                </div>

                {/* Refresh Button */}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={fetchData}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition"
                  >
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    {loading ? 'Refreshing...' : 'Refresh Data'}
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}