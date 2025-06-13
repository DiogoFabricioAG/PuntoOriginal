"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Package, Truck, CheckCircle, Clock, MapPin, Search, Eye, Download, MessageCircle } from "lucide-react"

export default function SeguimientoPage() {
  const [trackingNumber, setTrackingNumber] = useState("")

  const pedidos = [
    {
      id: "PV-2024-001",
      date: "2024-06-10",
      status: "En producción",
      progress: 60,
      estimatedDelivery: "2024-06-20",
      items: [
        {
          name: "Air Punto Classic Personalizada",
          image: "/placeholder.svg?height=100&width=100",
          customizations: ["Color: Naranja Punto V", "Texto: 'MIGUEL'", "Talla: 42"],
          price: 114.99,
        },
      ],
      total: 114.99,
      trackingSteps: [
        { step: "Pedido confirmado", date: "2024-06-10", completed: true },
        { step: "En producción", date: "2024-06-12", completed: true },
        { step: "Control de calidad", date: "2024-06-18", completed: false },
        { step: "Enviado", date: "2024-06-19", completed: false },
        { step: "Entregado", date: "2024-06-20", completed: false },
      ],
    },
    {
      id: "PV-2024-002",
      date: "2024-06-05",
      status: "Enviado",
      progress: 80,
      estimatedDelivery: "2024-06-15",
      trackingNumber: "TR123456789",
      items: [
        {
          name: "Punto Runner Pro",
          image: "/placeholder.svg?height=100&width=100",
          customizations: ["Color: Azul Océano", "Talla: 41"],
          price: 129.99,
        },
      ],
      total: 129.99,
      trackingSteps: [
        { step: "Pedido confirmado", date: "2024-06-05", completed: true },
        { step: "En producción", date: "2024-06-07", completed: true },
        { step: "Control de calidad", date: "2024-06-10", completed: true },
        { step: "Enviado", date: "2024-06-12", completed: true },
        { step: "Entregado", date: "2024-06-15", completed: false },
      ],
    },
    {
      id: "PV-2024-003",
      date: "2024-05-28",
      status: "Entregado",
      progress: 100,
      deliveredDate: "2024-06-08",
      items: [
        {
          name: "Urban Street V",
          image: "/placeholder.svg?height=100&width=100",
          customizations: ["Color: Negro Clásico", "Logo personalizado", "Talla: 43"],
          price: 124.99,
        },
      ],
      total: 124.99,
      trackingSteps: [
        { step: "Pedido confirmado", date: "2024-05-28", completed: true },
        { step: "En producción", date: "2024-05-30", completed: true },
        { step: "Control de calidad", date: "2024-06-05", completed: true },
        { step: "Enviado", date: "2024-06-06", completed: true },
        { step: "Entregado", date: "2024-06-08", completed: true },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En producción":
        return "bg-blue-500"
      case "Enviado":
        return "bg-orange-500"
      case "Entregado":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "En producción":
        return <Package className="w-4 h-4" />
      case "Enviado":
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
                        <p className="text-2xl font-bold text-orange-600">${pedido.total}</p>
                        {pedido.status === "Entregado" ? (
                          <p className="text-sm text-green-600">
                            Entregado el {new Date(pedido.deliveredDate!).toLocaleDateString()}
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
                          <Button variant="outline" size="sm">
                            <MapPin className="w-4 h-4 mr-2" />
                            Rastrear Envío
                          </Button>
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
                    />
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      <Search className="w-4 h-4 mr-2" />
                      Buscar
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">¿Dónde encuentro mi código?</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• En el email de confirmación de tu pedido</li>
                    <li>• En tu cuenta de usuario, sección "Mis Pedidos"</li>
                    <li>• En el SMS de notificación de envío</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

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
    </div>
  )
}
