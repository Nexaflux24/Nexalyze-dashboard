import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyticsApi } from '../services/api'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import OverviewCards from '../components/dashboard/OverviewCards'
import TrafficChart from '../components/charts/TrafficChart'
import ConversionChart from '../components/charts/ConversionChart'
import SourceChart from '../components/charts/SourceChart'
import PlatformChart from '../components/charts/PlatformChart'

export default function Dashboard({ setIsAuthenticated }) {
  const navigate = useNavigate()
  const [workspaceId, setWorkspaceId] = useState('default')
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })
  const [data, setData] = useState({
    overview: null,
    traffic: [],
    conversions: [],
    sources: [],
    platforms: []
  })
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [overview, traffic, conversions, sources, platforms] = await Promise.all([
        analyticsApi.getOverview(workspaceId, dateRange.startDate, dateRange.endDate),
        analyticsApi.getTraffic(workspaceId, dateRange.startDate, dateRange.endDate),
        analyticsApi.getConversions(workspaceId, dateRange.startDate, dateRange.endDate),
        analyticsApi.getSources(workspaceId, dateRange.startDate, dateRange.endDate),
        analyticsApi.getPlatforms(workspaceId, dateRange.startDate, dateRange.endDate)
      ])

      setData({
        overview: overview.data,
        traffic: traffic.data,
        conversions: conversions.data,
        sources: sources.data,
        platforms: platforms.data
      })
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [workspaceId, dateRange])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={handleLogout} dateRange={dateRange} setDateRange={setDateRange} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <OverviewCards data={data.overview} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <TrafficChart data={data.traffic} />
                  <ConversionChart data={data.conversions} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SourceChart data={data.sources} />
                  <PlatformChart data={data.platforms} />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}