import { useState } from 'react'
import { Menu, X, BarChart3, TrendingUp, Settings, Users, LogOut, Home } from 'lucide-react'

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { label: 'Dashboard', icon: Home, href: '#dashboard' },
    { label: 'Analytics', icon: BarChart3, href: '#analytics' },
    { label: 'Traffic', icon: TrendingUp, href: '#traffic' },
    { label: 'Team', icon: Users, href: '#team' },
    { label: 'Settings', icon: Settings, href: '#settings' }
  ]

  return (
    <>
      {/* Sidebar */}
      <aside aria-hidden={!isOpen && true} className={`
        fixed md:relative w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white
        transition-transform duration-300 z-40 md:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
              N
            </div>
            <div>
              <h1 className="text-xl font-bold">Nexalyze</h1>
              <p className="text-xs text-gray-400">Analytics</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition group"
              >
                <Icon size={20} className="group-hover:text-blue-400 transition" />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-red-400 transition">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  )
}