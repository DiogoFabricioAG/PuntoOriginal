"use client"

import { useState, useEffect } from "react"
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

// Importar imágenes de zapatillas
import blanca1Img from "@/assets/zapatillas/Blanca1.jpg"
import blanca2Img from "@/assets/zapatillas/Blanca2.jpg"
import blanca3Img from "@/assets/zapatillas/Blanca3.jpg"
import negro1Img from "@/assets/zapatillas/Negro1.jpg"
import negro2Img from "@/assets/zapatillas/Negro2.jpg"
import negro3Img from "@/assets/zapatillas/Negro3.jpg"
import negro4Img from "@/assets/zapatillas/Negro4.jpg"
import negro5Img from "@/assets/zapatillas/Negro5.jpg"
import azul1Img from "@/assets/zapatillas/Azul1.jpg"
import gris1Img from "@/assets/zapatillas/Gris1.jpg"
import naranja1Img from "@/assets/zapatillas/Naranja1.jpg"
import neon1Img from "@/assets/zapatillas/Neon1.jpg"
import random1Img from "@/assets/zapatillas/Random1.jpg"
import random2Img from "@/assets/zapatillas/Random2.jpg"
import random3Img from "@/assets/zapatillas/Random3.jpg"
import random4Img from "@/assets/zapatillas/Random4.jpg"
import random5Img from "@/assets/zapatillas/Random5.jpg"
import { StaticImageData } from "next/image"

// Tipo para los items del carrito
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

export default function TiendaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  
  // Estados para filtros
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  // Cargar contador del carrito al montar el componente
  useEffect(() => {
    const currentCart: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]')
    setCartItemCount(currentCart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0))
  }, [])

  const productos = [
    {
      id: 1,
      name: "Air Punto Classic",
      price: 89.99,
      originalPrice: 119.99,
      image: blanca1Img,
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
      image: negro1Img,
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
      image: negro2Img,
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
      image: random1Img,
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
      image: random2Img,
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
      image: negro3Img,
      status: "Premium",
      rating: 4.9,
      reviews: 67,
      customizable: true,
      colors: ["#1A202C", "#3182CE", "#E53E3E"],
      category: "Premium",
      sizes: ["40", "41", "42", "43", "44", "45", "46"],
      inStock: true,
    },
    {
      id: 7,
      name: "Azul Ocean Wave",
      price: 94.99,
      image: azul1Img,
      status: "Nuevo",
      rating: 4.6,
      reviews: 92,
      customizable: true,
      colors: ["#3182CE", "#FFFFFF", "#1A202C"],
      category: "Casual",
      sizes: ["38", "39", "40", "41", "42", "43"],
      inStock: true,
    },
    {
      id: 8,
      name: "Neon Flash",
      price: 119.99,
      image: neon1Img,
      status: "Destacado",
      rating: 4.4,
      reviews: 156,
      customizable: true,
      colors: ["#FFFF00", "#FF6B35", "#1A202C"],
      category: "Urbano",
      sizes: ["39", "40", "41", "42", "43", "44"],
      inStock: true,
    },
    {
      id: 9,
      name: "Gris Elegance",
      price: 104.99,
      image: gris1Img,
      status: "Clásico",
      rating: 4.7,
      reviews: 134,
      customizable: true,
      colors: ["#718096", "#FFFFFF", "#1A202C"],
      category: "Casual",
      sizes: ["38", "39", "40", "41", "42", "43", "44"],
      inStock: true,
    },
    {
      id: 10,
      name: "Naranja Burst",
      price: 89.99,
      originalPrice: 109.99,
      image: naranja1Img,
      status: "En oferta",
      rating: 4.5,
      reviews: 98,
      customizable: true,
      colors: ["#FF6B35", "#FFFFFF", "#1A202C"],
      category: "Deportivo",
      sizes: ["39", "40", "41", "42", "43", "44", "45"],
      inStock: true,
    },
    {
      id: 11,
      name: "Random Design Pro",
      price: 134.99,
      image: random3Img,
      status: "Edición Limitada",
      rating: 4.8,
      reviews: 45,
      customizable: false,
      colors: ["#FF6B35", "#3182CE", "#FFFFFF"],
      category: "Premium",
      sizes: ["40", "41", "42", "43", "44"],
      inStock: true,
    },
    {
      id: 12,
      name: "Blanca Pure",
      price: 79.99,
      image: blanca2Img,
      status: "Básico",
      rating: 4.3,
      reviews: 187,
      customizable: true,
      colors: ["#FFFFFF", "#1A202C", "#FF6B35"],
      category: "Casual",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
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
  const caracteristicas = ["Personalizable", "En oferta", "Eco-friendly", "Nuevo"]

  // Función para agregar/quitar elementos de arrays de filtros
  const toggleFilter = (value: string, currentArray: string[], setArray: (arr: string[]) => void) => {
    if (currentArray.includes(value)) {
      setArray(currentArray.filter(item => item !== value))
    } else {
      setArray([...currentArray, value])
    }
  }

  // Función para limpiar todos los filtros
  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedPriceRanges([])
    setSelectedFeatures([])
    setSearchTerm("")
  }

  // Función para añadir al carrito
  const addToCart = (producto: typeof productos[0]) => {
    const cartItem: CartItem = {
      id: `${producto.id}-${Date.now()}`,
      name: producto.name,
      model: producto.name,
      size: producto.sizes[0], // Talla por defecto
      color: producto.colors[0],
      colorName: "Color principal",
      price: producto.price,
      quantity: 1,
      image: producto.image,
      isJordan: false
    }

    const currentCart: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]')
    currentCart.push(cartItem)
    localStorage.setItem('cartItems', JSON.stringify(currentCart))
    setCartItemCount(currentCart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0))

    // Mostrar notificación
    if (typeof window !== 'undefined') {
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-xl p-4 z-50 max-w-sm animate-cart-success'
      notification.innerHTML = `
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="font-bold">¡Añadido al carrito!</h4>
            <p class="text-sm opacity-90">${producto.name}</p>
          </div>
        </div>
      `
      document.body.appendChild(notification)
      
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove()
        }
      }, 5000)
    }
  }

  const filteredProducts = productos.filter((producto) => {
    // Filtro por término de búsqueda
    const matchesSearch = producto.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Filtro por categoría
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes("Todos") || 
      selectedCategories.includes(producto.category)
    
    // Filtro por talla
    const matchesSize = selectedSizes.length === 0 || 
      selectedSizes.some(size => producto.sizes.includes(size))
    
    // Filtro por precio
    const matchesPrice = selectedPriceRanges.length === 0 || 
      selectedPriceRanges.some(range => {
        const rangeObj = rangosPrecios.find(r => r.label === range)
        if (rangeObj) {
          return producto.price >= rangeObj.min && producto.price <= rangeObj.max
        }
        return false
      })
    
    // Filtro por características
    const matchesFeatures = selectedFeatures.length === 0 || 
      selectedFeatures.every(feature => {
        switch (feature) {
          case "Personalizable":
            return producto.customizable
          case "En oferta":
            return producto.status === "En oferta"
          case "Eco-friendly":
            return producto.status === "Eco-friendly"
          case "Nuevo":
            return producto.status === "Nuevo"
          default:
            return true
        }
      })
    
    return matchesSearch && matchesCategory && matchesSize && matchesPrice && matchesFeatures
  })

  // Aplicar ordenamiento
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return a.name.localeCompare(b.name)
      default: // featured
        return 0
    }
  })

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
              <Button variant="outline" size="sm" asChild>
                <Link href="/carrito">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrito ({cartItemCount})
                </Link>
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
                        <Checkbox 
                          checked={selectedCategories.includes(categoria)}
                          onCheckedChange={() => toggleFilter(categoria, selectedCategories, setSelectedCategories)}
                        />
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
                        <Checkbox 
                          checked={selectedSizes.includes(talla)}
                          onCheckedChange={() => toggleFilter(talla, selectedSizes, setSelectedSizes)}
                        />
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
                        <Checkbox 
                          checked={selectedPriceRanges.includes(rango.label)}
                          onCheckedChange={() => toggleFilter(rango.label, selectedPriceRanges, setSelectedPriceRanges)}
                        />
                        <span className="text-sm">{rango.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Características */}
                <div>
                  <Label className="text-base font-medium">Características</Label>
                  <div className="space-y-2 mt-2">
                    {caracteristicas.map((caracteristica) => (
                      <label key={caracteristica} className="flex items-center space-x-2">
                        <Checkbox 
                          checked={selectedFeatures.includes(caracteristica)}
                          onCheckedChange={() => toggleFilter(caracteristica, selectedFeatures, setSelectedFeatures)}
                        />
                        <span className="text-sm">{caracteristica}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={clearAllFilters}>
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
                Mostrando {sortedProducts.length} de {productos.length} productos
              </p>
            </div>

            {/* Grid de Productos */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {sortedProducts.map((producto) => (
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
                          onClick={() => addToCart(producto)}
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
