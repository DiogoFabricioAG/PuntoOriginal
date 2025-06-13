"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Trophy, Zap, Star, ArrowRight, Timer, Users } from "lucide-react"

// Importar las imágenes
import bannerImg from "@/assets/zapatillas/Banner.jpg"
import random3Img from "@/assets/zapatillas/Random3.jpg"
import blanca1Img from "@/assets/zapatillas/Blanca1.jpg"
import negro1Img from "@/assets/zapatillas/Negro1.jpg"
import neon1Img from "@/assets/zapatillas/Neon1.jpg"

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0)

  const campaigns = [
    {
      id: 1,
      title: "Concurso Verano 2024",
      description: "Diseña las zapatillas del verano",
      endDate: "2024-07-15",
      prize: "$5,000",
      participants: 234,
      image: bannerImg,
    },
    {
      id: 2,
      title: "Edición Limitada Urbana",
      description: "Estilo urbano para la ciudad",
      endDate: "2024-06-30",
      prize: "$3,000",
      participants: 156,
      image: random3Img,
    },
  ]

  const featuredShoes = [
    {
      id: 1,
      name: "Air Punto Classic",
      price: 89.99,
      originalPrice: 119.99,
      image: blanca1Img,
      status: "En oferta",
      rating: 4.8,
      customizable: true,
    },
    {
      id: 2,
      name: "Punto Runner Pro",
      price: 129.99,
      image: negro1Img,
      status: "Nuevo",
      rating: 4.9,
      customizable: true,
    },
    {
      id: 3,
      name: "Urban Street V",
      price: 99.99,
      image: neon1Img,
      status: "Destacado",
      rating: 4.7,
      customizable: true,
    },
  ]

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
                <span className="text-xl font-bold text-gray-900">Punto V</span>
              </div>
            </div>
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
              <Link href="/login">
                <Button variant="outline">Iniciar Sesión</Button>
              </Link>
              <Link href="/registro">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner - Campañas Dinámicas */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 px-8 py-16 text-white">
              <div className="max-w-2xl">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  <Timer className="w-4 h-4 mr-1" />
                  Termina en 15 días
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{campaigns[activeSlide].title}</h1>
                <p className="text-xl mb-6 text-white/90">{campaigns[activeSlide].description}</p>
                <div className="flex items-center space-x-6 mb-8">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span className="font-semibold">Premio: {campaigns[activeSlide].prize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>{campaigns[activeSlide].participants} participantes</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Link href="/concursos">
                    <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                      Participar Ahora
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/concursos">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Ver Detalles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
              <Image
                src={campaigns[activeSlide].image}
                alt="Campaign"
                width={400}
                height={300}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Campaign Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {campaigns.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeSlide ? "bg-orange-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Acceso Rápido a Personalización */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Crea Tus Zapatillas Únicas</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Diseña, personaliza y crea las zapatillas de tus sueños con nuestra herramienta de personalización 3D
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Personaliza Colores</CardTitle>
              <CardDescription>Elige entre miles de combinaciones de colores y patrones</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Vista 3D</CardTitle>
              <CardDescription>Visualiza tu diseño en tiempo real con nuestra tecnología 3D</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Comparte y Compite</CardTitle>
              <CardDescription>Participa en concursos y comparte tus diseños con la comunidad</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/personalizar">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Comenzar a Personalizar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Zapatillas Destacadas */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Zapatillas Destacadas</h2>
              <p className="text-xl text-gray-600">Descubre nuestros modelos más populares y personalizables</p>
            </div>
            <Link href="/tienda">
              <Button variant="outline" className="hidden md:flex">
                Ver Todas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredShoes.map((shoe) => (
              <Card key={shoe.id} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={shoe.image}
                      alt={shoe.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge
                      className={`absolute top-4 left-4 ${
                        shoe.status === "En oferta"
                          ? "bg-red-500"
                          : shoe.status === "Nuevo"
                            ? "bg-green-500"
                            : "bg-orange-500"
                      }`}
                    >
                      {shoe.status}
                    </Badge>
                    {shoe.customizable && (
                      <Badge className="absolute top-4 right-4 bg-purple-500">
                        <Palette className="w-3 h-3 mr-1" />
                        Personalizable
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(shoe.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({shoe.rating})</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{shoe.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-orange-600">${shoe.price}</span>
                        {shoe.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">${shoe.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                        Comprar
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Personalizar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/tienda">
              <Button variant="outline">
                Ver Todas las Zapatillas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="text-xl font-bold">Punto V</span>
              </div>
              <p className="text-gray-400">
                Creando zapatillas únicas a través de la co-creación y el diseño personalizado.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Productos</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/tienda" className="hover:text-white">
                    Tienda
                  </Link>
                </li>
                <li>
                  <Link href="/personalizar" className="hover:text-white">
                    Personalizar
                  </Link>
                </li>
                <li>
                  <Link href="/concursos" className="hover:text-white">
                    Concursos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/seguimiento" className="hover:text-white">
                    Seguimiento
                  </Link>
                </li>
                <li>
                  <Link href="/ayuda" className="hover:text-white">
                    Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-white">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Cuenta</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/login" className="hover:text-white">
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link href="/registro" className="hover:text-white">
                    Registrarse
                  </Link>
                </li>
                <li>
                  <Link href="/perfil" className="hover:text-white">
                    Mi Perfil
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Punto V. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
