"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  CreditCard, 
  Truck,
  Shield,
  Heart,
  Share2,
  CheckCircle
} from "lucide-react"

// Importar imágenes de zapatillas
import { StaticImageData } from "next/image"

interface CartItem {
  id: string
  name: string
  model: string
  size: string
  color: string
  colorName: string
  customText?: string
  price: number
  quantity: number
  image: StaticImageData
  isJordan?: boolean
}

export default function CarritoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(1) // 1: datos, 2: procesando, 3: éxito

  // Cargar items del carrito desde localStorage al montar el componente
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  // Guardar en localStorage cuando cambie el carrito
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }
  }, [cartItems])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }
  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleCheckout = () => {
    setShowCheckoutModal(true)
    setCheckoutStep(1)
  }
  const processPayment = () => {
    setCheckoutStep(2)
    
    // Simular procesamiento de pago
    setTimeout(() => {
      setCheckoutStep(3)
      
      // Crear el pedido para guardar en seguimiento
      const orderNumber = `PV-${Date.now().toString().slice(-6)}`
      const newOrder = {
        id: orderNumber,
        date: new Date().toISOString().split('T')[0],
        status: "Pedido confirmado",
        progress: 20,
        estimatedDelivery: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 días
        trackingNumber: `TR${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        items: cartItems.map(item => ({
          name: item.name,
          image: item.image,
          customizations: [
            `Color: ${item.colorName}`,
            ...(item.customText ? [`Texto: "${item.customText}"`] : []),
            `Talla: ${item.size}`,
            ...(item.isJordan ? ['Edición 3D Premium'] : [])
          ],
          price: item.price,
          quantity: item.quantity
        })),        total: total,
        trackingSteps: [
          { step: "Pedido confirmado", date: new Date().toISOString().split('T')[0], completed: true },
          { step: "En producción", date: "", completed: false },
          { step: "Control de calidad", date: "", completed: false },
          { step: "Enviado", date: "", completed: false },
          { step: "Entregado", date: "", completed: false },
        ],
      }
      
      // Guardar pedido en localStorage para seguimiento
      const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]')
      existingOrders.unshift(newOrder) // Agregar al inicio
      localStorage.setItem('userOrders', JSON.stringify(existingOrders))
      
      // Limpiar carrito después del pago exitoso
      localStorage.removeItem('cartItems')
      setCartItems([])
      
      // Redirigir a seguimiento después de 3 segundos
      setTimeout(() => {
        window.location.href = '/seguimiento'
      }, 3000)
    }, 3000)
  }

  const closeCheckoutModal = () => {
    setShowCheckoutModal(false)
    setCheckoutStep(1)
  }

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "DESCUENTO10") {
      setDiscount(0.1) // 10% de descuento
    } else if (promoCode.toUpperCase() === "NUEVO20") {
      setDiscount(0.2) // 20% de descuento
    } else {
      alert("Código promocional no válido")
      setDiscount(0)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discountAmount = subtotal * discount
  const shipping = subtotal > 100 ? 0 : 15.99
  const total = subtotal - discountAmount + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Punto V</span>
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/tienda" className="text-gray-700 hover:text-orange-600 font-medium">
                  Tienda
                </Link>
                <Link href="/personalizar" className="text-gray-700 hover:text-orange-600 font-medium">
                  Personalizar
                </Link>
                <Link href="/concursos" className="text-gray-700 hover:text-orange-600 font-medium">
                  Concursos
                </Link>
              </nav>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/carrito">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Carrito (0)
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Carrito vacío */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              ¡Descubre nuestras increíbles zapatillas personalizables y crea tu estilo único!
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button asChild className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Link href="/personalizar">
                  Personalizar Zapatillas
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/tienda">
                  Ver Tienda
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Punto V</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/tienda" className="text-gray-700 hover:text-orange-600 font-medium">
                Tienda
              </Link>
              <Link href="/personalizar" className="text-gray-700 hover:text-orange-600 font-medium">
                Personalizar
              </Link>
              <Link href="/concursos" className="text-gray-700 hover:text-orange-600 font-medium">
                Concursos
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/carrito">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrito ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Button variant="outline" size="sm" asChild className="mr-4">
            <Link href="/personalizar">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Seguir Comprando
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items del carrito */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">Modelo: {item.model}</p>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-gray-600">Talla: {item.size}</span>
                              <span className="text-gray-600">Color: {item.colorName}</span>
                            </div>                            {item.customText && (
                              <p className="text-sm text-gray-600">
                                Texto personalizado: &quot;{item.customText}&quot;
                              </p>
                            )}
                            {item.isJordan && (
                              <Badge className="bg-gradient-to-r from-orange-500 to-red-500">
                                Edición 3D Premium
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-semibold text-orange-600">
                            ${item.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">por unidad</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-3 py-1 border rounded-md min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-right">
                        <p className="text-sm text-gray-600">
                          Subtotal: <span className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Código promocional */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Código promocional</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ingresa tu código"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Aplicar
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600">
                      ✓ Código aplicado: {(discount * 100)}% de descuento
                    </p>
                  )}
                </div>

                <Separator />

                {/* Desglose de precios */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} artículos)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-orange-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Información de envío */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-blue-800 mb-2">
                    <Truck className="w-4 h-4" />
                    <span className="font-medium">Información de envío</span>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Envío gratuito en pedidos sobre $100</li>
                    <li>• Tiempo de producción: 7-10 días hábiles</li>
                    <li>• Envío express disponible</li>
                  </ul>
                </div>

                {/* Garantías */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-green-800 mb-2">
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">Garantías</span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 30 días de devolución gratuita</li>
                    <li>• Garantía de satisfacción 100%</li>
                    <li>• Compra segura protegida</li>
                  </ul>
                </div>                {/* Botones de acción */}
                <div className="space-y-2">
                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceder al Pago
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/personalizar">
                      Seguir Personalizando
                    </Link>
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Códigos promocionales disponibles: DESCUENTO10, NUEVO20
                  </p>
                </div>
              </CardContent>            </Card>
          </div>
        </div>
      </div>

      {/* Modal de Checkout */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl transform transition-all duration-300">
            <div className="p-6">
              {checkoutStep === 1 && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Finalizar Compra</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={closeCheckoutModal}
                      className="rounded-full"
                    >
                      ✕
                    </Button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu-email@ejemplo.com"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Fecha de Vencimiento</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Dirección de Envío</Label>
                      <Input
                        id="address"
                        placeholder="Calle, número, ciudad, código postal"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total a pagar:</span>
                      <span className="text-xl font-bold text-orange-600">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    onClick={processPayment}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Confirmar Pago
                  </Button>
                </>
              )}

              {checkoutStep === 2 && (
                <div className="text-center py-8">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600 mx-auto mb-4"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Procesando Pago...</h3>
                  <p className="text-gray-600">Por favor espera mientras procesamos tu pago</p>
                  <div className="mt-4 bg-gray-200 rounded-full h-2 max-w-xs mx-auto overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-1000 animate-pulse"></div>
                  </div>
                </div>
              )}

              {checkoutStep === 3 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-green-600">¡Pago Exitoso!</h3>
                  <p className="text-gray-600 mb-4">
                    Tu pedido ha sido confirmado y pronto recibirás un email de confirmación.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-green-800">
                      <strong>Número de pedido:</strong> PV-{Date.now().toString().slice(-6)}
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      Serás redirigido al seguimiento en unos segundos...
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/seguimiento'}
                    className="border-green-300 text-green-600 hover:bg-green-50"
                  >
                    Ir a Seguimiento Ahora
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
