import { LogOut, Menu, Calendar, Bell, User } from 'lucide-react'
import { useState } from 'react'

export default function Header({ onLogout, onMenuClick, dateRange, setDateRange }) {
  const [showProfile, setShowProfile] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Menu & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Analytics</h2>
            <p className="text-xs text-gray-500">Real-time data updates</p>
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
          <Calendar size={18} className="text-gray-600" />
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
            className="px-2 py-1 bg-transparent text-sm outline-none text-gray-700"
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
            className="px-2 py-1 bg-transparent text-sm outline-none text-gray-700"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-gray-700">
                {user.firstName} {user.lastName}
              </span>
            </button>

            {/* Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}