import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Dashboard', icon: '📊', href: '#' },
    { label: 'Analytics', icon: '📈', href: '#' },
    { label: 'Reports', icon: '📑', href: '#' },
    { label: 'Settings', icon: '⚙️', href: '#' }
  ]

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative z-40 w-64 h-screen bg-gray-900 text-white transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Nexalyze</h1>
          <p className="text-gray-400 text-sm">Analytics Dashboard</p>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}