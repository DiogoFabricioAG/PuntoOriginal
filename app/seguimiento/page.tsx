"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Package, Truck, CheckCircle, Clock, MapPin, Search, Eye, Download, MessageCircle, ShoppingCart } from "lucide-react"
import dynamic from "next/dynamic"
import L from "leaflet"
import Head from 'next/head'
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface Order {
  id: string
  date: string
  status: string
  progress: number
  estimatedDelivery: string
  trackingNumber?: string
  deliveredDate?: string
  items: {
    name: string
    image: string
    customizations: string[]
    price: number
    quantity: number
  }[]
  total: number
  trackingSteps: {
    step: string
    date: string
    completed: boolean
  }[]
}

// Iconos personalizados para Leaflet
const iconCD = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-blue.png',
  iconSize: [32, 48],
  iconAnchor: [16, 48], popupAnchor: [0, -40]
})
const iconDestino = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png',
  iconSize: [32, 48], iconAnchor: [16, 48], popupAnchor: [0, -40]
})
const iconPaquete = new L.DivIcon({
  className: 'custom-paquete-icon',
  html: `<div style='background:#f59e42;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px #0002;'><svg width='20' height='20' fill='white' viewBox='0 0 24 24'><path d='M3 7l9-4 9 4-9 4-9-4zm0 2.18v7.02c0 1.1.9 2 2 2h2v-7.02l-4-1.68zm16 9.02c1.1 0 2-.9 2-2v-7.02l-4 1.68v7.02h2zm-6 0h2v-7.02l-2-.84-2 .84v7.02h2z'></path></svg></div>`
})

// Componente Leaflet sin SSR
const MapWithMarkers = dynamic(() => Promise.resolve(({ mapPoints }: { mapPoints: any }) => {
  if (!mapPoints) return null
  const center: [number, number] = [
    (mapPoints.centro.lat + mapPoints.destino.lat) / 2,
    (mapPoints.centro.lng + mapPoints.destino.lng) / 2
  ]
  return (
    <MapContainer center={center} zoom={12.5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap contributors' />
      <Marker position={[mapPoints.centro.lat, mapPoints.centro.lng]} icon={iconCD}><Tooltip permanent>Centro de Distribución</Tooltip></Marker>
      <Marker position={[mapPoints.destino.lat, mapPoints.destino.lng]} icon={iconDestino}><Tooltip permanent>Destino</Tooltip></Marker>
      <Marker position={[mapPoints.paquete.lat, mapPoints.paquete.lng]} icon={iconPaquete}><Tooltip permanent>Paquete</Tooltip></Marker>
      <Polyline positions={[[mapPoints.centro.lat, mapPoints.centro.lng],[mapPoints.paquete.lat, mapPoints.paquete.lng],[mapPoints.destino.lat, mapPoints.destino.lng]]} color='#3B82F6' weight={5} dashArray='10,8'/>
    </MapContainer>
  )
}), { ssr: false })

export default function SeguimientoPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [pedidos, setPedidos] = useState<Order[]>([])
  const [searchResults, setSearchResults] = useState<Order[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState("")
  const [cartItemCount, setCartItemCount] = useState(0)
  const [showMapModal, setShowMapModal] = useState(false)
  const [selectedOrderForMap, setSelectedOrderForMap] = useState<Order | null>(null)

  // Utilidades para generar coordenadas aleatorias en Lima
  function getRandomLimaCoord(bounds = {
    north: -11.85, // Norte de Lima
    south: -12.20, // Sur de Lima
    west: -77.15,  // Oeste de Lima
    east: -76.90   // Este de Lima
  }) {
    const lat = Math.random() * (bounds.north - bounds.south) + bounds.south
    const lng = Math.random() * (bounds.east - bounds.west) + bounds.west
    return { lat, lng }
  }

  // Estado para los puntos del mapa
  const [mapPoints, setMapPoints] = useState<{
    centro: { lat: number, lng: number }
    destino: { lat: number, lng: number }
    paquete: { lat: number, lng: number }
  } | null>(null)

  // Al abrir el modal, generar puntos aleatorios y simular la posición del paquete
  useEffect(() => {
    if (showMapModal && !mapPoints) {
      // Centro de distribución (fijo o random dentro de Lima Norte)
      const centro = getRandomLimaCoord({
        north: -11.95, south: -12.00, west: -77.10, east: -77.05
      })
      // Destino (random en Lima)
      const destino = getRandomLimaCoord()
      // Paquete (inicia cerca del centro, luego se anima)
      const paquete = { ...centro }
      setMapPoints({ centro, destino, paquete })
    }
    if (!showMapModal) {
      setMapPoints(null)
    }
  }, [showMapModal])

  // Animar el paquete del centro al destino
  useEffect(() => {
    if (!mapPoints || !showMapModal) return
    let animId: any
    let progress = 0
    function animate() {
      progress += 0.005 // velocidad
      if (progress > 1) progress = 1
      const lat = mapPoints.centro.lat + (mapPoints.destino.lat - mapPoints.centro.lat) * progress
      const lng = mapPoints.centro.lng + (mapPoints.destino.lng - mapPoints.centro.lng) * progress
      setMapPoints(mp => mp ? { ...mp, paquete: { lat, lng } } : mp)
      if (progress < 1 && showMapModal) {
        animId = requestAnimationFrame(animate)
      }
    }
    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [mapPoints, showMapModal])

  // Cargar pedidos desde localStorage al montar el componente
  useEffect(() => {
    const userOrders = JSON.parse(localStorage.getItem('userOrders') || '[]')
    
    // Cargar contador del carrito
    const currentCart: { quantity: number }[] = JSON.parse(localStorage.getItem('cartItems') || '[]')
    setCartItemCount(currentCart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0))
    
    // Combinar pedidos del usuario con algunos pedidos de ejemplo si no hay pedidos
    const exampleOrders = userOrders.length === 0 ? [
      {
        id: "PV-DEMO-001",
        date: "2024-06-10",
        status: "En producción",
        progress: 60,
        estimatedDelivery: "2024-06-20",
        trackingNumber: "TRDEMO12345",
        items: [
          {
            name: "Air Punto Classic Personalizada",
            image: "/placeholder.svg?height=100&width=100",
            customizations: ["Color: Naranja Punto V", "Texto: 'DEMO'", "Talla: 42"],
            price: 114.99,
            quantity: 1
          },
        ],
        total: 114.99,
        trackingSteps: [
          { step: "Pedido confirmado", date: "2024-06-10", completed: true },
          { step: "En producción", date: "2024-06-12", completed: true },
          { step: "Control de calidad", date: "", completed: false },
          { step: "Enviado", date: "", completed: false },
          { step: "Entregado", date: "", completed: false },
        ],
      }
    ] : []
    
    setPedidos([...userOrders, ...exampleOrders])
  }, [])

  // Función de búsqueda
  const handleSearch = () => {
    if (!trackingNumber.trim()) {
      setSearchError("Por favor ingresa un código de seguimiento")
      return
    }

    setIsSearching(true)
    setSearchError("")

    // Simular un pequeño delay para mostrar el estado de carga
    setTimeout(() => {
      const results = pedidos.filter(pedido => 
        pedido.id.toLowerCase().includes(trackingNumber.toLowerCase()) ||
        (pedido.trackingNumber && pedido.trackingNumber.toLowerCase().includes(trackingNumber.toLowerCase()))
      )

      if (results.length === 0) {
        setSearchError("No se encontró ningún pedido con ese código")
        setSearchResults([])
      } else {
        setSearchResults(results)
        setSearchError("")
      }

      setIsSearching(false)
    }, 1000)
  }

  // Función para limpiar búsqueda
  const clearSearch = () => {
    setTrackingNumber("")
    setSearchResults([])
    setSearchError("")
  }

  // Función para abrir el modal de seguimiento
  const openTrackingMap = (order: Order) => {
    setSelectedOrderForMap(order)
    setShowMapModal(true)
  }

  // Función para cerrar el modal de seguimiento
  const closeTrackingMap = () => {
    setShowMapModal(false)
    setSelectedOrderForMap(null)
  }

  // Función para simular avance del pedido
  const simulateProgress = (orderId: string) => {
    const updateOrder = (orders: Order[]) => 
      orders.map(order => {
        if (order.id !== orderId) return order

        const currentStepIndex = order.trackingSteps.findIndex(step => !step.completed)
        if (currentStepIndex === -1) return order // Ya está completado

        const newSteps = [...order.trackingSteps]
        const currentDate = new Date().toISOString().split('T')[0]
        
        // Completar el paso actual
        newSteps[currentStepIndex] = {
          ...newSteps[currentStepIndex],
          completed: true,
          date: currentDate
        }

        // Calcular nuevo progreso y status
        const completedSteps = newSteps.filter(step => step.completed).length
        const newProgress = Math.round((completedSteps / newSteps.length) * 100)
        
        let newStatus = order.status
        let additionalInfo = ""

        switch (currentStepIndex) {
          case 0: // Pedido confirmado -> En producción
            newStatus = "En producción"
            additionalInfo = "¡Genial! Tu pedido ha sido confirmado y ahora está siendo preparado para producción. Tiempo estimado: 1-2 días hábiles."
            break
          case 1: // En producción -> Control de calidad
            newStatus = "Control de calidad"
            additionalInfo = "Nuestros artesanos especializados han terminado de crear tu zapatilla personalizada. Ahora pasa a control de calidad."
            break
          case 2: // Control de calidad -> Enviado
            newStatus = "Enviado"
            additionalInfo = "Tu zapatilla ha pasado todos los controles de calidad y está siendo preparada para el envío. Proceso de 1-2 días."
            break
          case 3: // Enviado -> En tránsito
            newStatus = "En tránsito"
            additionalInfo = "¡Excelente! Tu pedido está en camino hacia tu dirección. Recibirás el número de tracking por email y SMS para seguir su ubicación en tiempo real."
            // Agregar tracking number si no existe
            if (!order.trackingNumber) {
              const updatedOrder = order as Order & { trackingNumber: string }
              updatedOrder.trackingNumber = `TR${Math.random().toString(36).substr(2, 9).toUpperCase()}`
            }
            break
          case 4: // En tránsito -> Entregado
            newStatus = "Entregado"
            additionalInfo = "🎉 ¡Tu zapatilla personalizada ha sido entregada exitosamente! Esperamos que disfrutes de tu nueva creación única."
            // Agregar fecha de entrega
            const updatedOrder = order as Order & { deliveredDate: string }
            updatedOrder.deliveredDate = currentDate
            break
        }

        // Mostrar notificación de progreso
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            // Crear una notificación más elegante
            const notification = document.createElement('div')
            const isDelivered = newStatus === "Entregado"
            const bgColor = isDelivered ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-blue-500 to-purple-500"
            
            notification.className = `fixed top-4 right-4 ${bgColor} text-white rounded-lg shadow-xl p-4 z-50 max-w-sm animate-bounce-in border`
            notification.innerHTML = `
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center flex-shrink-0">
                  ${isDelivered 
                    ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
                    : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
                  }
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <h4 class="font-bold text-white">${isDelivered ? '🎉 ' : ''}${newStatus}</h4>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-white/70 hover:text-white ml-2 flex-shrink-0">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  <p class="text-white/90 text-sm mt-1 leading-relaxed">${additionalInfo}</p>
                  <div class="mt-3 pt-2 border-t border-white/20">
                    <p class="text-white/70 text-xs">Pedido: <span class="font-mono">${orderId}</span></p>
                    <p class="text-white/70 text-xs">Progreso: ${newProgress}% completado</p>
                  </div>
                </div>
              </div>
            `
            
            // Añadir un pequeño efecto de sound (opcional)
            if (isDelivered) {
              // Efecto visual adicional para entrega
              notification.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(34, 197, 94, 0.5)'
            }
            
            document.body.appendChild(notification)
            
            // Auto-remover después de 8 segundos (más tiempo para leer)
            setTimeout(() => {
              if (notification.parentElement) {
                notification.style.animation = 'slideInFromRight 0.3s reverse ease-in'
                setTimeout(() => notification.remove(), 300)
              }
            }, 8000)
          }, 500)
        }

        return {
          ...order,
          status: newStatus,
          progress: newProgress,
          trackingSteps: newSteps
        }
      })

    // Actualizar tanto la lista principal como los resultados de búsqueda
    setPedidos(prevPedidos => {
      const updatedOrders = updateOrder(prevPedidos)
      // Guardar en localStorage (solo los pedidos del usuario, no los de ejemplo)
      const userOrders = updatedOrders.filter(order => !order.id.includes('DEMO'))
      if (userOrders.length > 0) {
        localStorage.setItem('userOrders', JSON.stringify(userOrders))
      }
      return updatedOrders
    })

    // También actualizar los resultados de búsqueda si existen
    if (searchResults.length > 0) {
      setSearchResults(prevResults => updateOrder(prevResults))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pedido confirmado":
        return "bg-gray-500"
      case "En producción":
        return "bg-blue-500"
      case "Control de calidad":
        return "bg-yellow-500"
      case "Enviado":
      case "En tránsito":
        return "bg-orange-500"
      case "Entregado":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pedido confirmado":
        return <Clock className="w-4 h-4" />
      case "En producción":
        return <Package className="w-4 h-4" />
      case "Control de calidad":
        return <CheckCircle className="w-4 h-4" />
      case "Enviado":
      case "En tránsito":
        return <Truck className="w-4 h-4" />
      case "Entregado":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
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
              <Link href="/seguimiento" className="text-orange-600 font-medium">
                Seguimiento
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/carrito">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrito ({cartItemCount})
                </Link>
              </Button>
              <Link href="/perfil">
                <Button variant="outline">Mi Perfil</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Seguimiento de Pedidos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Rastrea el estado de tus zapatillas personalizadas en tiempo real
          </p>
        </div>

        <Tabs defaultValue="mis-pedidos" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mis-pedidos">Mis Pedidos</TabsTrigger>
            <TabsTrigger value="buscar">Buscar por Código</TabsTrigger>
          </TabsList>

          {/* Mis Pedidos */}
          <TabsContent value="mis-pedidos" className="space-y-6">
            <div className="grid gap-6">
              {pedidos.map((pedido) => (
                <Card key={pedido.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>Pedido {pedido.id}</span>
                          <Badge className={getStatusColor(pedido.status)}>
                            {getStatusIcon(pedido.status)}
                            <span className="ml-1">{pedido.status}</span>
                          </Badge>
                        </CardTitle>
                        <CardDescription>Realizado el {new Date(pedido.date).toLocaleDateString()}</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-600">${pedido.total.toFixed(2)}</p>
                        {pedido.status === "Entregado" ? (
                          <p className="text-sm text-green-600">
                            Entregado el {pedido.deliveredDate ? new Date(pedido.deliveredDate).toLocaleDateString() : 'Fecha no disponible'}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-600">
                            Entrega estimada: {new Date(pedido.estimatedDelivery).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Productos */}
                    <div className="space-y-4">
                      {pedido.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <div className="space-y-1 mt-2">
                              {item.customizations.map((custom, i) => (
                                <p key={i} className="text-sm text-gray-600">
                                  • {custom}
                                </p>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progreso del pedido</span>
                        <span>{pedido.progress}%</span>
                      </div>
                      <Progress value={pedido.progress} className="h-2" />
                    </div>

                    {/* Tracking Steps */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Estado del pedido:</h4>
                      <div className="space-y-3">
                        {pedido.trackingSteps.map((step, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div
                              className={`w-4 h-4 rounded-full ${step.completed ? "bg-green-500" : "bg-gray-300"}`}
                            />
                            <div className="flex-1">
                              <p className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                                {step.step}
                              </p>
                              <p className="text-sm text-gray-500">{step.date}</p>
                            </div>
                            {step.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tracking Number */}
                    {pedido.trackingNumber && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-blue-900">Código de seguimiento</p>
                            <p className="text-blue-700 font-mono">{pedido.trackingNumber}</p>
                          </div>
                          {(pedido.status === "Enviado" || pedido.status === "En tránsito") && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openTrackingMap(pedido)}
                              className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                            >
                              <MapPin className="w-4 h-4 mr-2" />
                              Revisar Envío
                            </Button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar Factura
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contactar Soporte
                      </Button>
                      {pedido.status !== "Entregado" && (
                        <Button 
                          size="sm" 
                          onClick={() => simulateProgress(pedido.id)}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                        >
                          <Package className="w-4 h-4 mr-2" />
                          Simular Avance
                        </Button>
                      )}
                      {pedido.status === "Entregado" && (
                        <Button variant="outline" size="sm" className="text-orange-600 border-orange-600">
                          Dejar Reseña
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Buscar por Código */}
          <TabsContent value="buscar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Buscar Pedido</CardTitle>
                <CardDescription>Ingresa tu código de seguimiento para ver el estado de tu pedido</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tracking">Código de Seguimiento</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="tracking"
                      placeholder="Ej: PV-2024-001 o TR123456789"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="flex-1"
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button 
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      {isSearching ? "Buscando..." : "Buscar"}
                    </Button>
                    {(searchResults.length > 0 || searchError) && (
                      <Button variant="outline" onClick={clearSearch}>
                        Limpiar
                      </Button>
                    )}
                  </div>
                </div>

                {/* Mostrar error de búsqueda */}
                {searchError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 font-medium">{searchError}</p>
                  </div>
                )}

                {/* Mostrar estado de carga */}
                {isSearching && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <p className="text-blue-700">Buscando pedido...</p>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">¿Dónde encuentro mi código?</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• En el email de confirmación de tu pedido</li>
                    <li>• En tu cuenta de usuario, sección &quot;Mis Pedidos&quot;</li>
                    <li>• En el SMS de notificación de envío</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Mostrar resultados de búsqueda */}
            {searchResults.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Resultados de búsqueda</h3>
                  <Badge variant="secondary">{searchResults.length} resultado(s)</Badge>
                </div>
                
                {searchResults.map((pedido) => (
                  <Card key={pedido.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>Pedido {pedido.id}</span>
                            <Badge className={getStatusColor(pedido.status)}>
                              {getStatusIcon(pedido.status)}
                              <span className="ml-1">{pedido.status}</span>
                            </Badge>
                          </CardTitle>
                          <CardDescription>Realizado el {new Date(pedido.date).toLocaleDateString()}</CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-600">${pedido.total.toFixed(2)}</p>
                          {pedido.status === "Entregado" ? (
                            <p className="text-sm text-green-600">
                              Entregado el {pedido.deliveredDate ? new Date(pedido.deliveredDate).toLocaleDateString() : 'Fecha no disponible'}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-600">
                              Entrega estimada: {new Date(pedido.estimatedDelivery).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Productos */}
                      <div className="space-y-4">
                        {pedido.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{item.name}</h3>
                              <div className="space-y-1 mt-2">
                                {item.customizations.map((custom, i) => (
                                  <p key={i} className="text-sm text-gray-600">
                                    • {custom}
                                  </p>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progreso del pedido</span>
                          <span>{pedido.progress}%</span>
                        </div>
                        <Progress value={pedido.progress} className="h-2" />
                      </div>

                      {/* Tracking Steps */}
                      <div className="space-y-4">
                        <h4 className="font-semibold">Estado del pedido:</h4>
                        <div className="space-y-3">
                          {pedido.trackingSteps.map((step, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div
                                className={`w-4 h-4 rounded-full ${step.completed ? "bg-green-500" : "bg-gray-300"}`}
                              />
                              <div className="flex-1">
                                <p className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                                  {step.step}
                                </p>
                                <p className="text-sm text-gray-500">{step.date}</p>
                              </div>
                              {step.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tracking Number */}
                      {pedido.trackingNumber && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-blue-900">Código de seguimiento</p>
                              <p className="text-blue-700 font-mono">{pedido.trackingNumber}</p>
                            </div>
                            {(pedido.status === "Enviado" || pedido.status === "En tránsito") && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => openTrackingMap(pedido)}
                                className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                              >
                                <MapPin className="w-4 h-4 mr-2" />
                                Revisar Envío
                              </Button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalles
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Descargar Factura
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Contactar Soporte
                        </Button>
                        {pedido.status !== "Entregado" && (
                          <Button 
                            size="sm" 
                            onClick={() => simulateProgress(pedido.id)}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                          >
                            <Package className="w-4 h-4 mr-2" />
                            Simular Avance
                          </Button>
                        )}
                        {pedido.status === "Entregado" && (
                          <Button variant="outline" size="sm" className="text-orange-600 border-orange-600">
                            Dejar Reseña
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Información de Ayuda */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tiempos de Producción</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Zapatillas estándar</span>
                      <span className="font-medium">3-5 días</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Personalizaciones básicas</span>
                      <span className="font-medium">5-7 días</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Personalizaciones premium</span>
                      <span className="font-medium">7-10 días</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Diseños de concurso</span>
                      <span className="font-medium">10-14 días</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Opciones de Envío</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Envío estándar</span>
                      <span className="font-medium">3-5 días</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío express</span>
                      <span className="font-medium">1-2 días</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío gratuito</span>
                      <span className="font-medium">Pedidos +$100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de Seguimiento con Leaflet */}
      {showMapModal && selectedOrderForMap && mapPoints && (
        <>
          <Head>
            <link rel='stylesheet' href='https://unpkg.com/leaflet/dist/leaflet.css' />
          </Head>
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-auto'>
            <div className='bg-white rounded-xl w-full max-w-6xl max-h-[calc(100vh-1rem)] shadow-2xl flex flex-col'>
              <div className='p-4 sm:p-6 border-b flex-shrink-0'>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Seguimiento en Tiempo Real</h2>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      Pedido {selectedOrderForMap.id} • {selectedOrderForMap.trackingNumber}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={closeTrackingMap}
                    className="rounded-full"
                  >
                    ✕
                  </Button>
                </div>
              </div>

              <div className='p-6'>
                <div className='grid lg:grid-cols-3 gap-6'>
                  {/* Información del envío */}
                  <div className='space-y-4'>
                    <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4'>
                      <div className='flex items-center space-x-2 mb-3'>
                        <Truck className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-blue-900">Estado Actual</h3>
                      </div>
                      <p className="text-blue-700 font-medium">{selectedOrderForMap.status}</p>
                      <p className="text-blue-600 text-sm mt-1">
                        Última actualización: {new Date().toLocaleTimeString()}
                      </p>
                    </div>

                    <div className='bg-green-50 rounded-lg p-4'>
                      <div className='flex items-center space-x-2 mb-3'>
                        <MapPin className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-green-900">Ubicación Actual</h3>
                      </div>
                      <p className="text-green-700 font-medium">Centro de Distribución Lima Norte</p>
                      <p className="text-green-600 text-sm mt-1">
                        Av. Túpac Amaru 123, Los Olivos
                      </p>
                    </div>

                    <div className='bg-orange-50 rounded-lg p-4'>
                      <div className='flex items-center space-x-2 mb-3'>
                        <Clock className="w-5 h-5 text-orange-600" />
                        <h3 className="font-semibold text-orange-900">Tiempo Estimado</h3>
                      </div>
                      <p className="text-orange-700 font-medium">2-3 horas</p>
                      <p className="text-orange-600 text-sm mt-1">
                        Llegada estimada: {new Date(Date.now() + 3 * 60 * 60 * 1000).toLocaleTimeString()}
                      </p>
                    </div>

                    <div className='bg-gray-50 rounded-lg p-4'>
                      <h4 className="font-semibold text-gray-900 mb-2">Productos en tránsito:</h4>
                      {selectedOrderForMap.items.map((item, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          • {item.name} (Cantidad: {item.quantity})
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mapa interactivo con Leaflet */}
                  <div className='lg:col-span-2'>
                    <div style={{ height: 400, width: '100%' }} className='rounded-lg overflow-hidden'>
                      <MapWithMarkers mapPoints={mapPoints} />
                    </div>
                    {/* Ruta estimada */}
                    <div className="mt-4 bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Ruta de Entrega</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-green-700 font-medium">Centro de Distribución (Origen)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-blue-700 font-medium">En tránsito - Av. Javier Prado</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          <span className="text-gray-500">Tu dirección (Destino)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="mt-6 pt-4 border-t flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Actualización automática cada 30 segundos
                  </div>
                  <div className="space-x-3">
                    <Button variant="outline" onClick={closeTrackingMap}>
                      Cerrar
                    </Button>
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      Notificarme cuando llegue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
