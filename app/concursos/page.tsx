"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Users, Calendar, Clock, Search, Filter, Star, Heart, Eye } from "lucide-react"

export default function ConcursosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const concursosActivos = [
    {
      id: 1,
      title: "Concurso Verano 2024",
      description:
        "Diseña las zapatillas perfectas para el verano. Colores vibrantes, materiales frescos y estilo único.",
      startDate: "2024-06-01",
      endDate: "2024-07-15",
      prize: "$5,000",
      participants: 234,
      submissions: 89,
      image: "/placeholder.svg?height=300&width=400",
      status: "active",
      category: "Estacional",
      difficulty: "Intermedio",
    },
    {
      id: 2,
      title: "Edición Limitada Urbana",
      description:
        "Crea diseños inspirados en la cultura urbana y el street art. Expresión libre y creatividad sin límites.",
      startDate: "2024-05-15",
      endDate: "2024-06-30",
      prize: "$3,000",
      participants: 156,
      submissions: 67,
      image: "/placeholder.svg?height=300&width=400",
      status: "active",
      category: "Urbano",
      difficulty: "Avanzado",
    },
    {
      id: 3,
      title: "Eco-Friendly Challenge",
      description:
        "Diseños sostenibles que respeten el medio ambiente. Materiales reciclados y procesos eco-amigables.",
      startDate: "2024-06-10",
      endDate: "2024-08-01",
      prize: "$4,000",
      participants: 98,
      submissions: 23,
      image: "/placeholder.svg?height=300&width=400",
      status: "active",
      category: "Sostenible",
      difficulty: "Principiante",
    },
  ]

  const concursosPasados = [
    {
      id: 4,
      title: "Retro Revival 2024",
      description: "Diseños inspirados en los años 80 y 90",
      endDate: "2024-05-01",
      winner: "María González",
      winnerDesign: "/placeholder.svg?height=200&width=200",
      prize: "$2,500",
      participants: 187,
      image: "/placeholder.svg?height=300&width=400",
      status: "completed",
    },
    {
      id: 5,
      title: "Minimalista Moderno",
      description: "Elegancia en la simplicidad",
      endDate: "2024-04-15",
      winner: "Carlos Ruiz",
      winnerDesign: "/placeholder.svg?height=200&width=200",
      prize: "$3,500",
      participants: 203,
      image: "/placeholder.svg?height=300&width=400",
      status: "completed",
    },
  ]

  const disenosDestacados = [
    {
      id: 1,
      title: "Sunset Vibes",
      designer: "Ana López",
      contestId: 1,
      votes: 127,
      views: 1543,
      image: "/placeholder.svg?height=250&width=250",
      liked: false,
    },
    {
      id: 2,
      title: "Urban Jungle",
      designer: "Diego Martín",
      contestId: 2,
      votes: 98,
      views: 1234,
      image: "/placeholder.svg?height=250&width=250",
      liked: true,
    },
    {
      id: 3,
      title: "Ocean Breeze",
      designer: "Sofia Chen",
      contestId: 1,
      votes: 156,
      views: 1876,
      image: "/placeholder.svg?height=250&width=250",
      liked: false,
    },
  ]

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
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
              <Link href="/concursos" className="text-orange-600 font-medium">
                Concursos
              </Link>
              <Link href="/seguimiento" className="text-gray-700 hover:text-orange-600 font-medium">
                Seguimiento
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Iniciar Sesión</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Concursos de Diseño</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Participa en nuestros concursos, comparte tu creatividad y gana increíbles premios. Tu diseño podría
            convertirse en la próxima zapatilla estrella de Punto V.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar concursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48 h-12">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="completed">Finalizados</SelectItem>
              <SelectItem value="upcoming">Próximos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="activos" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activos">Concursos Activos</TabsTrigger>
            <TabsTrigger value="finalizados">Finalizados</TabsTrigger>
            <TabsTrigger value="diseños">Diseños Destacados</TabsTrigger>
          </TabsList>

          {/* Concursos Activos */}
          <TabsContent value="activos" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {concursosActivos.map((concurso) => (
                <Card key={concurso.id} className="group hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={concurso.image || "/placeholder.svg"}
                      alt={concurso.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-green-500">Activo</Badge>
                    <Badge className="absolute top-4 right-4 bg-purple-500">{concurso.category}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{concurso.difficulty}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {getDaysRemaining(concurso.endDate)} días restantes
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{concurso.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{concurso.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                        <span className="font-semibold">{concurso.prize}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{concurso.participants} participantes</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-green-500" />
                        <span>Hasta {new Date(concurso.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2 text-orange-500" />
                        <span>{concurso.submissions} diseños</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                          Participar
                      </Button>
                      <Button variant="outline">Ver Detalles</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Concursos Finalizados */}
          <TabsContent value="finalizados" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {concursosPasados.map((concurso) => (
                <Card key={concurso.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={concurso.image || "/placeholder.svg"}
                        alt={concurso.title}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-gray-500">Finalizado</Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(concurso.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{concurso.title}</h3>
                        <p className="text-gray-600 mb-4">{concurso.description}</p>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center space-x-3">
                            <Trophy className="w-6 h-6 text-yellow-600" />
                            <div>
                              <p className="font-semibold text-yellow-800">Ganador: {concurso.winner}</p>
                              <p className="text-sm text-yellow-700">Premio: {concurso.prize}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{concurso.participants} participantes</span>
                          <Button variant="outline" size="sm">
                            Ver Resultados
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Diseños Destacados */}
          <TabsContent value="diseños" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {disenosDestacados.map((diseno) => (
                <Card key={diseno.id} className="group hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={diseno.image || "/placeholder.svg"}
                      alt={diseno.title}
                      width={250}
                      height={250}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Button
                        size="sm"
                        variant={diseno.liked ? "default" : "outline"}
                        className={`${diseno.liked ? "bg-red-500 hover:bg-red-600" : "bg-white/80 hover:bg-white"}`}
                      >
                        <Heart className={`w-4 h-4 ${diseno.liked ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{diseno.title}</h3>
                    <p className="text-gray-600 mb-3">por {diseno.designer}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        <span>{diseno.votes} votos</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{diseno.views} vistas</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      >
                        Votar
                      </Button>
                      <Button size="sm" variant="outline">
                        Ver Diseño
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-center text-white mt-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Participar?</h2>
          <p className="text-xl mb-6 text-white/90">
            Únete a nuestra comunidad de diseñadores y compite por increíbles premios
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registro">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Crear Cuenta Gratis
              </Button>
            </Link>
            <Link href="/personalizar">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Probar Herramientas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
