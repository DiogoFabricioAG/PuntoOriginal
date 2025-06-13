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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Settings,
  ShoppingBag,
  Trophy,
  Palette,
  Heart,
  Edit,
  Camera,
  Save,
  Star,
  Eye,
  Download,
  Share2,
} from "lucide-react"

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    firstName: "María",
    lastName: "González",
    email: "maria.gonzalez@email.com",
    phone: "+34 612 345 678",
    birthDate: "1995-03-15",
    address: "Calle Mayor 123, Madrid",
    bio: "Diseñadora apasionada por las zapatillas personalizadas y el arte urbano.",
  })

  const comprasRecientes = [
    {
      id: "PV-2024-001",
      name: "Air Punto Classic Personalizada",
      image: "/placeholder.svg?height=100&width=100",
      date: "2024-06-10",
      price: 114.99,
      status: "En producción",
      customizations: ["Color: Naranja Punto V", "Texto: 'MARÍA'"],
    },
    {
      id: "PV-2024-002",
      name: "Punto Runner Pro",
      image: "/placeholder.svg?height=100&width=100",
      date: "2024-06-05",
      price: 129.99,
      status: "Entregado",
      rating: 5,
    },
    {
      id: "PV-2024-003",
      name: "Urban Street V",
      image: "/placeholder.svg?height=100&width=100",
      date: "2024-05-28",
      price: 124.99,
      status: "Entregado",
      rating: 4,
    },
  ]

  const disenosEnviados = [
    {
      id: 1,
      title: "Sunset Vibes",
      contest: "Concurso Verano 2024",
      image: "/placeholder.svg?height=200&width=200",
      status: "Finalista",
      votes: 127,
      views: 1543,
      submittedDate: "2024-06-01",
    },
    {
      id: 2,
      title: "Ocean Dreams",
      contest: "Concurso Verano 2024",
      image: "/placeholder.svg?height=200&width=200",
      status: "Participando",
      votes: 89,
      views: 892,
      submittedDate: "2024-06-03",
    },
    {
      id: 3,
      title: "Retro Funk",
      contest: "Retro Revival 2024",
      image: "/placeholder.svg?height=200&width=200",
      status: "Ganador",
      prize: "$2,500",
      votes: 234,
      views: 2156,
      submittedDate: "2024-04-20",
    },
  ]

  const favoritos = [
    {
      id: 1,
      name: "Performance Elite",
      image: "/placeholder.svg?height=150&width=150",
      price: 159.99,
      category: "Deportivo",
    },
    {
      id: 2,
      name: "Eco Sustainable",
      image: "/placeholder.svg?height=150&width=150",
      price: 109.99,
      category: "Sostenible",
    },
    {
      id: 3,
      name: "Retro Classic 80s",
      image: "/placeholder.svg?height=150&width=150",
      price: 94.99,
      category: "Retro",
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Aquí iría la lógica para guardar los datos
    console.log("Datos guardados:", userData)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ganador":
        return "bg-yellow-500"
      case "Finalista":
        return "bg-orange-500"
      case "Participando":
        return "bg-blue-500"
      case "Entregado":
        return "bg-green-500"
      case "En producción":
        return "bg-blue-500"
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
              <Link href="/seguimiento" className="text-gray-700 hover:text-orange-600 font-medium">
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
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Información del Usuario */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      {userData.firstName[0]}
                      {userData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-gray-600 mb-4">{userData.email}</p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Compras realizadas</span>
                    <Badge variant="outline">{comprasRecientes.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Diseños enviados</span>
                    <Badge variant="outline">{disenosEnviados.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Concursos ganados</span>
                    <Badge className="bg-yellow-500">
                      {disenosEnviados.filter((d) => d.status === "Ganador").length}
                    </Badge>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600 mb-2">Miembro desde</p>
                  <p className="font-medium">Marzo 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenido Principal */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="perfil" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="perfil">
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="compras">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Compras
                </TabsTrigger>
                <TabsTrigger value="diseños">
                  <Palette className="w-4 h-4 mr-2" />
                  Diseños
                </TabsTrigger>
                <TabsTrigger value="favoritos">
                  <Heart className="w-4 h-4 mr-2" />
                  Favoritos
                </TabsTrigger>
                <TabsTrigger value="configuracion">
                  <Settings className="w-4 h-4 mr-2" />
                  Config
                </TabsTrigger>
              </TabsList>

              {/* Información Personal */}
              <TabsContent value="perfil">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Información Personal</CardTitle>
                        <CardDescription>Gestiona tu información personal y preferencias</CardDescription>
                      </div>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                      >
                        {isEditing ? (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Guardar
                          </>
                        ) : (
                          <>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          value={userData.firstName}
                          onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          value={userData.lastName}
                          onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input
                        id="address"
                        value={userData.address}
                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografía</Label>
                      <Textarea
                        id="bio"
                        value={userData.bio}
                        onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Historial de Compras */}
              <TabsContent value="compras">
                <Card>
                  <CardHeader>
                    <CardTitle>Historial de Compras</CardTitle>
                    <CardDescription>Revisa todas tus compras y personalizaciones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {comprasRecientes.map((compra) => (
                        <div key={compra.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <Image
                            src={compra.image || "/placeholder.svg"}
                            alt={compra.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{compra.name}</h3>
                            <p className="text-sm text-gray-600">Pedido: {compra.id}</p>
                            <p className="text-sm text-gray-600">Fecha: {new Date(compra.date).toLocaleDateString()}</p>
                            {compra.customizations && (
                              <div className="mt-1">
                                {compra.customizations.map((custom, i) => (
                                  <p key={i} className="text-xs text-gray-500">
                                    • {custom}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${compra.price}</p>
                            <Badge className={getStatusColor(compra.status)}>{compra.status}</Badge>
                            {compra.rating && (
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < compra.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Diseños Enviados */}
              <TabsContent value="diseños">
                <Card>
                  <CardHeader>
                    <CardTitle>Mis Diseños</CardTitle>
                    <CardDescription>Diseños enviados a concursos y su estado actual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {disenosEnviados.map((diseno) => (
                        <div key={diseno.id} className="border rounded-lg overflow-hidden">
                          <div className="relative">
                            <Image
                              src={diseno.image || "/placeholder.svg"}
                              alt={diseno.title}
                              width={200}
                              height={200}
                              className="w-full h-48 object-cover"
                            />
                            <Badge className={`absolute top-2 right-2 ${getStatusColor(diseno.status)}`}>
                              {diseno.status}
                            </Badge>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold mb-1">{diseno.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{diseno.contest}</p>

                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                              <div className="flex items-center">
                                <Trophy className="w-4 h-4 mr-1" />
                                <span>{diseno.votes} votos</span>
                              </div>
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                <span>{diseno.views} vistas</span>
                              </div>
                            </div>

                            {diseno.prize && (
                              <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-3">
                                <p className="text-sm font-medium text-yellow-800">🏆 Premio ganado: {diseno.prize}</p>
                              </div>
                            )}

                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Eye className="w-4 h-4 mr-1" />
                                Ver
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Favoritos */}
              <TabsContent value="favoritos">
                <Card>
                  <CardHeader>
                    <CardTitle>Productos Favoritos</CardTitle>
                    <CardDescription>Zapatillas que has marcado como favoritas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {favoritos.map((producto) => (
                        <div key={producto.id} className="border rounded-lg overflow-hidden">
                          <Image
                            src={producto.image || "/placeholder.svg"}
                            alt={producto.name}
                            width={150}
                            height={150}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="font-semibold mb-1">{producto.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{producto.category}</p>
                            <p className="font-bold text-orange-600 mb-3">${producto.price}</p>
                            <div className="flex space-x-2">
                              <Button size="sm" className="flex-1">
                                Comprar
                              </Button>
                              <Button size="sm" variant="outline">
                                <Heart className="w-4 h-4 fill-current text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Configuración */}
              <TabsContent value="configuracion">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferencias de Notificaciones</CardTitle>
                      <CardDescription>Configura cómo quieres recibir las notificaciones</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Nuevos concursos</p>
                          <p className="text-sm text-gray-600">Recibir notificaciones sobre nuevos concursos</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Estado de pedidos</p>
                          <p className="text-sm text-gray-600">Updates sobre el estado de tus pedidos</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Ofertas especiales</p>
                          <p className="text-sm text-gray-600">Promociones y descuentos exclusivos</p>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Seguridad</CardTitle>
                      <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        Cambiar Contraseña
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Configurar Autenticación de Dos Factores
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Eliminar Cuenta
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
