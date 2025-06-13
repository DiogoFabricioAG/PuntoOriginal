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
import { Textarea } from "@/components/ui/textarea"
import {
  BarChart3,
  Users,
  Package,
  Trophy,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Star,
  Filter,
  Download,
  Upload,
} from "lucide-react"

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("dashboard")

  // Datos del dashboard
  const stats = {
    totalUsers: 2847,
    activeContests: 3,
    totalOrders: 1256,
    monthlyRevenue: 45780,
    pendingOrders: 23,
    completedOrders: 1233,
  }

  const recentOrders = [
    {
      id: "PV-2024-001",
      customer: "María González",
      product: "Air Punto Classic",
      status: "En producción",
      date: "2024-06-10",
      total: 114.99,
    },
    {
      id: "PV-2024-002",
      customer: "Carlos Ruiz",
      product: "Punto Runner Pro",
      status: "Enviado",
      date: "2024-06-09",
      total: 129.99,
    },
    {
      id: "PV-2024-003",
      customer: "Ana López",
      product: "Urban Street V",
      status: "Entregado",
      date: "2024-06-08",
      total: 124.99,
    },
  ]

  const contests = [
    {
      id: 1,
      title: "Concurso Verano 2024",
      startDate: "2024-06-01",
      endDate: "2024-07-15",
      participants: 234,
      submissions: 89,
      prize: 5000,
      status: "Activo",
    },
    {
      id: 2,
      title: "Edición Limitada Urbana",
      startDate: "2024-05-15",
      endDate: "2024-06-30",
      participants: 156,
      submissions: 67,
      prize: 3000,
      status: "Activo",
    },
    {
      id: 3,
      title: "Retro Revival 2024",
      startDate: "2024-04-01",
      endDate: "2024-05-01",
      participants: 187,
      submissions: 98,
      prize: 2500,
      status: "Finalizado",
      winner: "Diego Martín",
    },
  ]

  const products = [
    {
      id: 1,
      name: "Air Punto Classic",
      category: "Casual",
      price: 89.99,
      stock: 45,
      sales: 234,
      status: "Activo",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Punto Runner Pro",
      category: "Deportivo",
      price: 129.99,
      stock: 23,
      sales: 156,
      status: "Activo",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Urban Street V",
      category: "Urbano",
      price: 99.99,
      stock: 0,
      sales: 89,
      status: "Agotado",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const topDesigns = [
    {
      id: 1,
      title: "Sunset Vibes",
      designer: "Ana López",
      contest: "Concurso Verano 2024",
      votes: 127,
      views: 1543,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "Urban Jungle",
      designer: "Diego Martín",
      contest: "Edición Limitada Urbana",
      votes: 98,
      views: 1234,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      title: "Ocean Breeze",
      designer: "Sofia Chen",
      contest: "Concurso Verano 2024",
      votes: 156,
      views: 1876,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-green-500"
      case "Finalizado":
        return "bg-gray-500"
      case "En producción":
        return "bg-blue-500"
      case "Enviado":
        return "bg-orange-500"
      case "Entregado":
        return "bg-green-500"
      case "Agotado":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Punto V Admin</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">Admin</Badge>
              <Link href="/">
                <Button variant="outline">Ver Sitio</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="pedidos">
              <Package className="w-4 h-4 mr-2" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="concursos">
              <Trophy className="w-4 h-4 mr-2" />
              Concursos
            </TabsTrigger>
            <TabsTrigger value="productos">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Productos
            </TabsTrigger>
            <TabsTrigger value="usuarios">
              <Users className="w-4 h-4 mr-2" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="configuracion">
              <Settings className="w-4 h-4 mr-2" />
              Config
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Usuarios Totales</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12% vs mes anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ingresos Mensuales</p>
                      <p className="text-3xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+8% vs mes anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pedidos Totales</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-gray-600">{stats.pendingOrders} pendientes</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Concursos Activos</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.activeContests}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-gray-600">456 participantes totales</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Pedidos Recientes */}
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Recientes</CardTitle>
                  <CardDescription>Últimos pedidos realizados en la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.product}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.total}</p>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Diseños Más Votados */}
              <Card>
                <CardHeader>
                  <CardTitle>Diseños Destacados</CardTitle>
                  <CardDescription>Diseños con más votos en concursos activos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topDesigns.map((design) => (
                      <div key={design.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Image
                          src={design.image || "/placeholder.svg"}
                          alt={design.title}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{design.title}</p>
                          <p className="text-sm text-gray-600">por {design.designer}</p>
                          <p className="text-xs text-gray-500">{design.contest}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span>{design.votes}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Eye className="w-4 h-4 mr-1" />
                            <span>{design.views}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gestión de Pedidos */}
          <TabsContent value="pedidos" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Gestión de Pedidos</h2>
                <p className="text-gray-600">Administra todos los pedidos de la plataforma</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.product}</p>
                          <p className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">${order.total}</p>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gestión de Concursos */}
          <TabsContent value="concursos" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Gestión de Concursos</h2>
                <p className="text-gray-600">Crea y administra concursos de diseño</p>
              </div>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Concurso
              </Button>
            </div>

            <div className="grid gap-6">
              {contests.map((contest) => (
                <Card key={contest.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold">{contest.title}</h3>
                          <Badge className={getStatusColor(contest.status)}>{contest.status}</Badge>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Fecha inicio</p>
                            <p className="font-medium">{new Date(contest.startDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Fecha fin</p>
                            <p className="font-medium">{new Date(contest.endDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Participantes</p>
                            <p className="font-medium">{contest.participants}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Diseños</p>
                            <p className="font-medium">{contest.submissions}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">
                            Premio: <span className="font-semibold text-green-600">${contest.prize}</span>
                          </p>
                          {contest.winner && (
                            <p className="text-sm text-gray-600">
                              Ganador: <span className="font-semibold">{contest.winner}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        {contest.status === "Finalizado" && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Resultados
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gestión de Productos */}
          <TabsContent value="productos" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Gestión de Productos</h2>
                <p className="text-gray-600">Administra el catálogo de zapatillas</p>
              </div>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Producto
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <p className="text-sm text-gray-500">Stock: {product.stock} unidades</p>
                          <p className="text-sm text-gray-500">Ventas: {product.sales}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">${product.price}</p>
                          <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gestión de Usuarios */}
          <TabsContent value="usuarios" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
                <p className="text-gray-600">Administra los usuarios de la plataforma</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">2,847</p>
                        <p className="text-sm text-gray-600">Total Usuarios</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-green-600">1,234</p>
                        <p className="text-sm text-gray-600">Usuarios Activos</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-orange-600">456</p>
                        <p className="text-sm text-gray-600">Diseñadores</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-purple-600">89</p>
                        <p className="text-sm text-gray-600">Nuevos (mes)</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuración */}
          <TabsContent value="configuracion" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Configuración del Sistema</h2>
              <p className="text-gray-600">Administra la configuración general de la plataforma</p>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración General</CardTitle>
                  <CardDescription>Ajustes básicos de la plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Nombre del Sitio</Label>
                      <Input id="siteName" defaultValue="Punto V" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteEmail">Email de Contacto</Label>
                      <Input id="siteEmail" defaultValue="info@puntov.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Descripción</Label>
                    <Textarea
                      id="siteDescription"
                      defaultValue="Plataforma de co-creación de zapatillas personalizadas"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Concursos</CardTitle>
                  <CardDescription>Ajustes para los concursos de diseño</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxSubmissions">Máximo diseños por usuario</Label>
                      <Input id="maxSubmissions" type="number" defaultValue="3" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="votingDuration">Duración votación (días)</Label>
                      <Input id="votingDuration" type="number" defaultValue="7" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mantenimiento</CardTitle>
                  <CardDescription>Herramientas de mantenimiento del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4">
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Backup Base de Datos
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar Datos
                    </Button>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      Limpiar Cache
                    </Button>
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
