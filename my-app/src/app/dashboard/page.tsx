'use client'

import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  ChevronDown,
  CreditCard,
  DollarSign,
  Heart,
  Home,
  LogOut,
  Menu,
  Package,
  Palette,
  Settings,
  ShoppingBag,
  TrendingUp,
  User,
  Wallet,
  X
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type Section =
  | 'overview'
  | 'wallet'
  | 'orders'
  | 'designs'
  | 'profile'
  | 'settings'

// Mock data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: '',
  joinDate: '2024-01-15',
  walletBalance: 1250.5
}

const mockTransactions = [
  {
    id: '1',
    date: '2024-12-20',
    type: 'credit' as const,
    description: 'Added funds',
    amount: 500,
    status: 'completed' as const
  },
  {
    id: '2',
    date: '2024-12-18',
    type: 'debit' as const,
    description: 'Order #12345',
    amount: 89.99,
    status: 'completed' as const
  },
  {
    id: '3',
    date: '2024-12-15',
    type: 'debit' as const,
    description: 'Order #12344',
    amount: 129.99,
    status: 'completed' as const
  },
  {
    id: '4',
    date: '2024-12-10',
    type: 'credit' as const,
    description: 'Refund - Order #12340',
    amount: 45.5,
    status: 'completed' as const
  }
]

const mockOrders = [
  {
    id: '12345',
    date: '2024-12-18',
    items: 2,
    total: 89.99,
    status: 'shipped' as const,
    trackingNumber: 'TRK123456789'
  },
  {
    id: '12344',
    date: '2024-12-15',
    items: 1,
    total: 129.99,
    status: 'delivered' as const,
    trackingNumber: 'TRK123456788'
  },
  {
    id: '12343',
    date: '2024-12-10',
    items: 3,
    total: 199.99,
    status: 'processing' as const
  }
]

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<Section>('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)

  const menuItems = [
    { id: 'overview' as Section, label: 'Overview', icon: Home },
    { id: 'wallet' as Section, label: 'Wallet', icon: Wallet },
    { id: 'orders' as Section, label: 'Orders', icon: Package },
    { id: 'designs' as Section, label: 'My Designs', icon: Palette },
    { id: 'profile' as Section, label: 'Profile', icon: User },
    { id: 'settings' as Section, label: 'Settings', icon: Settings }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700'
      case 'shipped':
        return 'bg-blue-100 text-blue-700'
      case 'processing':
        return 'bg-yellow-100 text-yellow-700'
      case 'pending':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                MerchStore
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="hidden sm:flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900">
                  {mockUser.name}
                </p>
                <p className="text-xs text-gray-500">{mockUser.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 transition-transform duration-300 z-30 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 w-64`}
        >
          <div className="flex flex-col h-full pt-20 lg:pt-4">
            {/* Close button for mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map(item => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setIsSidebarOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>

            <div className="p-4 border-t border-gray-200">
              <Link
                href="/"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {mockUser.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-gray-600 mt-1">
                  Here's what's happening with your account
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <Wallet className="w-8 h-8" />
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <p className="text-purple-100 text-sm mb-1">Wallet Balance</p>
                  <p className="text-3xl font-bold">
                    ${mockUser.walletBalance.toFixed(2)}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <Package className="w-8 h-8 text-blue-600" />
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                      +2 new
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <Palette className="w-8 h-8 text-pink-600" />
                    <Heart className="w-5 h-5 text-pink-600" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Saved Designs</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="font-semibold">New Order</span>
                  </button>
                  <button
                    onClick={() => setIsAddFundsModalOpen(true)}
                    className="flex items-center justify-center space-x-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-purple-300 transition-all"
                  >
                    <DollarSign className="w-5 h-5" />
                    <span className="font-semibold">Add Funds</span>
                  </button>
                  <Link
                    href="/designs"
                    className="flex items-center justify-center space-x-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-purple-300 transition-all"
                  >
                    <Palette className="w-5 h-5" />
                    <span className="font-semibold">Browse Designs</span>
                  </Link>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Recent Orders
                  </h2>
                  <button
                    onClick={() => setActiveSection('orders')}
                    className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-3">
                  {mockOrders.slice(0, 3).map(order => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Order #{order.id}
                          </p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          ${order.total}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Wallet Section */}
          {activeSection === 'wallet' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
                <p className="text-gray-600 mt-1">
                  Manage your funds and transactions
                </p>
              </div>

              {/* Balance Card */}
              <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-purple-100 text-sm mb-2">
                      Available Balance
                    </p>
                    <p className="text-5xl font-bold">
                      ${mockUser.walletBalance.toFixed(2)}
                    </p>
                  </div>
                  <Wallet className="w-16 h-16 text-white/30" />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsAddFundsModalOpen(true)}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-white text-purple-700 rounded-xl hover:bg-purple-50 transition-all font-semibold"
                  >
                    <ArrowDownLeft className="w-5 h-5" />
                    <span>Add Funds</span>
                  </button>
                  <button
                    onClick={() => setIsWithdrawModalOpen(true)}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                    <span>Withdraw</span>
                  </button>
                </div>
              </div>

              {/* Transaction History */}
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Transaction History
                </h2>
                <div className="space-y-3">
                  {mockTransactions.map(transaction => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            transaction.type === 'credit'
                              ? 'bg-green-100'
                              : 'bg-red-100'
                          }`}
                        >
                          {transaction.type === 'credit' ? (
                            <ArrowDownLeft className="w-6 h-6 text-green-600" />
                          ) : (
                            <ArrowUpRight className="w-6 h-6 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-600">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold ${
                            transaction.type === 'credit'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'credit' ? '+' : '-'}$
                          {transaction.amount.toFixed(2)}
                        </p>
                        <span className="text-xs text-gray-500">
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Section */}
          {activeSection === 'orders' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
                <p className="text-gray-600 mt-1">
                  Track and manage your orders
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="space-y-4">
                  {mockOrders.map(order => (
                    <div
                      key={order.id}
                      className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Order #{order.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {order.date} • {order.items} items
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full font-semibold text-sm ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">
                            ${order.total}
                          </p>
                          {order.trackingNumber && (
                            <p className="text-sm text-gray-600 mt-1">
                              Tracking: {order.trackingNumber}
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                            View Details
                          </button>
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-purple-300 transition-colors font-semibold">
                              Reorder
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* My Designs Section */}
          {activeSection === 'designs' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Designs</h1>
                <p className="text-gray-600 mt-1">
                  Your saved and purchased designs
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="text-center py-12">
                  <Palette className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No designs yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start browsing our design library to save your favorites
                  </p>
                  <Link
                    href="/designs"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                  >
                    Browse Designs
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Profile Section */}
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                <p className="text-gray-600 mt-1">
                  Manage your account information
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {mockUser.name}
                    </h2>
                    <p className="text-gray-600">
                      Member since {mockUser.joinDate}
                    </p>
                    <button className="mt-2 text-purple-600 hover:text-purple-700 font-semibold text-sm">
                      Change Avatar
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={mockUser.name}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={mockUser.email}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue={mockUser.phone}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">
                  Manage your preferences and security
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Notifications
                </h2>
                <div className="space-y-4">
                  {[
                    'Order updates',
                    'New designs',
                    'Promotional emails',
                    'Security alerts'
                  ].map(item => (
                    <div
                      key={item}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <span className="font-medium text-gray-900">{item}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Security
                </h2>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors font-medium text-gray-900">
                    Change Password
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors font-medium text-gray-900">
                    Two-Factor Authentication
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors font-medium text-gray-900">
                    Connected Devices
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Funds Modal */}
      {isAddFundsModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsAddFundsModalOpen(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
              <button
                onClick={() => setIsAddFundsModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Add Funds
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[50, 100, 500].map(amount => (
                    <button
                      key={amount}
                      className="px-4 py-2 bg-gray-100 hover:bg-purple-100 hover:text-purple-700 rounded-lg font-semibold transition-colors"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 p-4 border-2 border-purple-600 bg-purple-50 rounded-xl">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-gray-900">
                        Credit Card
                      </span>
                    </button>
                  </div>
                </div>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                  Add Funds
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsWithdrawModalOpen(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
              <button
                onClick={() => setIsWithdrawModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Withdraw Funds
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-700">
                    Available balance: ${mockUser.walletBalance.toFixed(2)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      max={mockUser.walletBalance}
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bank Account
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors">
                    <option>**** **** **** 1234</option>
                  </select>
                </div>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
