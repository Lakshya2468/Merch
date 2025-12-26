'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Lock,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
  Wallet
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Step = 'shipping' | 'method' | 'payment' | 'review'

interface ShippingInfo {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}

interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  days: string
}

const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivery in 5-7 business days',
    price: 9.99,
    days: '5-7 days'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Delivery in 2-3 business days',
    price: 19.99,
    days: '2-3 days'
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day delivery',
    price: 29.99,
    days: '1 day'
  }
]

export default function CheckoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('shipping')
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States'
  })
  const [selectedShipping, setSelectedShipping] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'paypal' | 'wallet'
  >('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock cart data
  const cartItems = [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      design: 'Sunset Vibes',
      size: 'M',
      color: 'White',
      price: 29.99,
      quantity: 2
    },
    {
      id: '2',
      name: 'Classic Hoodie',
      design: 'Mountain Peak',
      size: 'L',
      color: 'Black',
      price: 49.99,
      quantity: 1
    }
  ]

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shippingCost =
    shippingMethods.find(m => m.id === selectedShipping)?.price || 0
  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + tax

  const steps: { id: Step; label: string; icon: any }[] = [
    { id: 'shipping', label: 'Shipping', icon: MapPin },
    { id: 'method', label: 'Method', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: Check }
  ]

  const currentStepIndex = steps.findIndex(s => s.id === currentStep)

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id)
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id)
    }
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true)
    setTimeout(() => {
      alert('Order placed successfully! (This is a demo)')
      router.push('/dashboard')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStepIndex >= index
              const isCurrent = currentStep === step.id
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-purple-200' : ''}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`mt-2 text-sm font-semibold ${
                        isActive ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-4 rounded-full transition-all ${
                        currentStepIndex > index
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              {/* Shipping Information */}
              {currentStep === 'shipping' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.fullName}
                        onChange={e =>
                          setShippingInfo({
                            ...shippingInfo,
                            fullName: e.target.value
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={e =>
                          setShippingInfo({
                            ...shippingInfo,
                            email: e.target.value
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={e =>
                          setShippingInfo({
                            ...shippingInfo,
                            phone: e.target.value
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.address}
                        onChange={e =>
                          setShippingInfo({
                            ...shippingInfo,
                            address: e.target.value
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={e =>
                          setShippingInfo({
                            ...shippingInfo,
                            city: e.target.value
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={e =>
                          setShippingInfo({
                            ...shippingInfo,
                            state: e.target.value
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.zip}
                        onChange={e =>
                          setShippingInfo({
                            ...shippingInfo,
                            zip: e.target.value
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Country
                      </label>
                      <select
                        value={shippingInfo.country}
                        onChange={e =>
                          setShippingInfo({
                            ...shippingInfo,
                            country: e.target.value
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Method */}
              {currentStep === 'method' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Shipping Method
                  </h2>
                  <div className="space-y-3">
                    {shippingMethods.map(method => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedShipping(method.id)}
                        className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                          selectedShipping === method.id
                            ? 'border-purple-600 bg-purple-50 ring-4 ring-purple-200'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedShipping === method.id
                                  ? 'border-purple-600 bg-purple-600'
                                  : 'border-gray-300'
                              }`}
                            >
                              {selectedShipping === method.id && (
                                <Check className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">
                                {method.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {method.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">
                              ${method.price.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {method.days}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Method */}
              {currentStep === 'payment' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Payment Method
                  </h2>

                  {/* Payment Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <CreditCard
                        className={`w-8 h-8 mx-auto mb-2 ${
                          paymentMethod === 'card'
                            ? 'text-purple-600'
                            : 'text-gray-400'
                        }`}
                      />
                      <p className="font-semibold text-gray-900">Card</p>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'paypal'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <Package
                        className={`w-8 h-8 mx-auto mb-2 ${
                          paymentMethod === 'paypal'
                            ? 'text-purple-600'
                            : 'text-gray-400'
                        }`}
                      />
                      <p className="font-semibold text-gray-900">PayPal</p>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'wallet'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <Wallet
                        className={`w-8 h-8 mx-auto mb-2 ${
                          paymentMethod === 'wallet'
                            ? 'text-purple-600'
                            : 'text-gray-400'
                        }`}
                      />
                      <p className="font-semibold text-gray-900">Wallet</p>
                    </button>
                  </div>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mt-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={e =>
                            setCardDetails({
                              ...cardDetails,
                              number: e.target.value
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardDetails.name}
                          onChange={e =>
                            setCardDetails({
                              ...cardDetails,
                              name: e.target.value
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={e =>
                              setCardDetails({
                                ...cardDetails,
                                expiry: e.target.value
                              })
                            }
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cardDetails.cvv}
                            onChange={e =>
                              setCardDetails({
                                ...cardDetails,
                                cvv: e.target.value
                              })
                            }
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && (
                    <div className="p-6 bg-purple-50 border-2 border-purple-200 rounded-xl">
                      <p className="text-sm text-purple-700">
                        Your wallet balance: $1,250.50
                      </p>
                      <p className="text-sm text-purple-700 mt-2">
                        Order total: ${total.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Review Order */}
              {currentStep === 'review' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Review Order
                  </h2>

                  {/* Shipping Info */}
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-3">
                      Shipping Address
                    </h3>
                    <p className="text-gray-700">{shippingInfo.fullName}</p>
                    <p className="text-gray-700">{shippingInfo.address}</p>
                    <p className="text-gray-700">
                      {shippingInfo.city}, {shippingInfo.state}{' '}
                      {shippingInfo.zip}
                    </p>
                    <p className="text-gray-700">{shippingInfo.country}</p>
                    <p className="text-gray-700 mt-2">{shippingInfo.email}</p>
                    <p className="text-gray-700">{shippingInfo.phone}</p>
                  </div>

                  {/* Shipping Method */}
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-3">
                      Shipping Method
                    </h3>
                    <p className="text-gray-700">
                      {
                        shippingMethods.find(m => m.id === selectedShipping)
                          ?.name
                      }{' '}
                      - $
                      {shippingMethods
                        .find(m => m.id === selectedShipping)
                        ?.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-3">
                      Payment Method
                    </h3>
                    <p className="text-gray-700 capitalize">{paymentMethod}</p>
                    {paymentMethod === 'card' && cardDetails.number && (
                      <p className="text-gray-700">
                        **** **** **** {cardDetails.number.slice(-4)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                {currentStepIndex > 0 ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-purple-300 transition-all font-semibold"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep === 'review' ? (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-bold disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Place Order
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-bold"
                  >
                    Continue
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-blue-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.design} • {item.size} • {item.color}
                      </p>
                      <p className="text-sm text-gray-900 mt-1">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-purple-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
