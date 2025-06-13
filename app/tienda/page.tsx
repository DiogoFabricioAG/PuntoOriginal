"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Grid3X3, List, Star, Heart, ShoppingCart, Palette, SlidersHorizontal } from "lucide-react"

export default function TiendaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  const productos = [
    {
      id: 1,
      name: "Air Punto Classic",
      price: 89.99,
      originalPrice: 119.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "En oferta",
      rating: 4.8,
      reviews: 124,
      customizable: true,
      colors: ["#FF6B35", "#E53E3E", "#1A202C", "#FFFFFF"],
      category: "Casual",
      sizes: ["38", "39", "40", "41", "42", "43", "44"],
      inStock: true,
    },
    {
      id: 2,
      name: "Punto Runner Pro",
      price: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Nuevo",
      rating: 4.9,
      reviews: 89,
      customizable: true,
      colors: ["#3182CE", "#38A169", "#1A202C", "#FFFFFF"],
      category: "Deportivo",
      sizes: ["39", "40", "41", "42", "43", "44", "45"],
      inStock: true,
    },
    {
      id: 3,
      name: "Urban Street V",
      price: 99.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Destacado",
      rating: 4.7,
      reviews: 156,
      customizable: true,
      colors: ["#1A202C", "#FFFFFF", "#FF6B35", "#E53E3E"],
      category: "Urbano",
      sizes: ["38", "39", "40", "41", "42", "43"],
      inStock: true,
    },
    {
      id: 4,
      name: "Eco Sustainable",
      price: 109.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Eco-friendly",
      rating: 4.6,
      reviews: 78,
      customizable: true,
      colors: ["#38A169", "#D69E2E", "#1A202C"],
      category: "Sostenible",
      sizes: ["39", "40", "41", "42", "43", "44"],
      inStock: true,
    },
    {
      id: 5,
      name: "Retro Classic 80s",
      price: 94.99,
      originalPrice: 109.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Retro",
      rating: 4.5,
      reviews: 203,
      customizable: false,
      colors: ["#ED64A6", "#D69E2E", "#FFFFFF"],
      category: "Retro",
      sizes: ["38", "39", "40", "41", "42"],
      inStock: false,
    },
    {
      id: 6,
      name: "Performance Elite",
      price: 159.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Premium",
      rating: 4.9,
      reviews: 67,
      customizable: true,
      colors: ["#1A202C", "#3182CE", "#E53E3E"],
      category: "Deportivo",
      sizes: ["40", "41", "42", "43", "44", "45", "46"],
      inStock: true,
    },
  ]

  const categorias = ["Todos", "Casual", "Deportivo", "Urbano", "Sostenible", "Retro", "Premium"]
  const tallas = ["38", "39", "40", "41", "42", "43", "44", "45", "46"]
  const rangosPrecios = [
    { label: "Menos de $100", min: 0, max: 100 },
    { label: "$100 - $150", min: 100, max: 150 },
    { label: "Más de $150", min: 150, max: 999 },
  ]

  const filteredProducts = productos.filter((producto) =>
    producto.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <Link href="/tienda" className="text-orange-600 font-medium">
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
              <Button variant="outline" size="sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrito (0)
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Tienda Punto V</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra colección completa de zapatillas personalizables y encuentra tu estilo único
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de Filtros */}
          <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="sticky top-4">
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Filtros</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="lg:hidden">
                    ✕
                  </Button>
                </div>

                {/* Categorías */}
                <div>
                  <Label className="text-base font-medium">Categoría</Label>
                  <div className="space-y-2 mt-2">
                    {categorias.map((categoria) => (
                      <label key={categoria} className="flex items-center space-x-2">
                        <Checkbox />
                        <span className="text-sm">{categoria}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tallas */}
                <div>
                  <Label className="text-base font-medium">Talla</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {tallas.map((talla) => (
                      <label key={talla} className="flex items-center space-x-1">
                        <Checkbox />
                        <span className="text-sm">{talla}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Precio */}
                <div>
                  <Label className="text-base font-medium">Precio</Label>
                  <div className="space-y-2 mt-2">
                    {rangosPrecios.map((rango, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <Checkbox />
                        <span className="text-sm">{rango.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Características */}
                <div>
                  <Label className="text-base font-medium">Características</Label>
                  <div className="space-y-2 mt-2">
                    <label className="flex items-center space-x-2">
                      <Checkbox />
                      <span className="text-sm">Personalizable</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox />
                      <span className="text-sm">En oferta</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox />
                      <span className="text-sm">Eco-friendly</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox />
                      <span className="text-sm">Nuevo</span>
                    </label>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Limpiar Filtros
                </Button>
              </div>
            </Card>
          </div>

          {/* Contenido Principal */}
          <div className="flex-1">
            {/* Barra de Búsqueda y Controles */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar zapatillas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filtros
                </Button>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Destacados</SelectItem>
                    <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                    <SelectItem value="rating">Mejor Valorados</SelectItem>
                    <SelectItem value="newest">Más Nuevos</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="mb-4">
              <p className="text-gray-600">
                Mostrando {filteredProducts.length} de {productos.length} productos
              </p>
            </div>

            {/* Grid de Productos */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((producto) => (
                <Card key={producto.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={producto.image || "/placeholder.svg"}
                        alt={producto.name}
                        width={300}
                        height={300}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "grid" ? "h-64" : "h-48 md:h-32"
                        }`}
                      />
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`${
                            producto.status === "En oferta"
                              ? "bg-red-500"
                              : producto.status === "Nuevo"
                                ? "bg-green-500"
                                : producto.status === "Eco-friendly"
                                  ? "bg-green-600"
                                  : "bg-orange-500"
                          }`}
                        >
                          {producto.status}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex space-x-2">
                        {producto.customizable && (
                          <Badge className="bg-purple-500">
                            <Palette className="w-3 h-3 mr-1" />
                            Personalizable
                          </Badge>
                        )}
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Button size="sm" variant="outline" className="bg-white/80 hover:bg-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      {!producto.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge className="bg-gray-800 text-white">Agotado</Badge>
                        </div>
                      )}
                    </div>

                    <div className={`p-6 ${viewMode === "list" ? "md:flex md:items-center md:justify-between" : ""}`}>
                      <div className={viewMode === "list" ? "md:flex-1" : ""}>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(producto.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            ({producto.rating}) • {producto.reviews} reseñas
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{producto.name}</h3>
                        <p className="text-gray-600 mb-3">{producto.category}</p>

                        {/* Colores disponibles */}
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-sm text-gray-600">Colores:</span>
                          {producto.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-orange-600">${producto.price}</span>
                            {producto.originalPrice && (
                              <span className="text-lg text-gray-500 line-through">${producto.originalPrice}</span>
                            )}
                          </div>
                          <Badge variant="outline">{producto.sizes.length} tallas</Badge>
                        </div>
                      </div>

                      <div className={`flex space-x-2 ${viewMode === "list" ? "md:ml-6" : ""}`}>
                        <Button
                          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                          disabled={!producto.inStock}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {producto.inStock ? "Añadir" : "Agotado"}
                        </Button>
                        {producto.customizable && (
                          <Link href={`/personalizar?model=${producto.id}`}>
                            <Button variant="outline">
                              <Palette className="w-4 h-4 mr-2" />
                              Personalizar
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button variant="outline">Anterior</Button>
                <Button className="bg-orange-500 hover:bg-orange-600">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Siguiente</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
