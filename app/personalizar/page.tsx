"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, RotateCcw, Save, Share2, ShoppingCart, Eye, ImageIcon, Download, Heart } from "lucide-react"
import { ShoeViewer } from "@/components/shoe-viewer"

// Importar imágenes de zapatillas
import blanca1Img from "@/assets/zapatillas/Blanca1.jpg"
import blanca2Img from "@/assets/zapatillas/Blanca2.jpg" 
import negro1Img from "@/assets/zapatillas/Negro1.jpg"
import negro2Img from "@/assets/zapatillas/Negro2.jpg"
import azul1Img from "@/assets/zapatillas/Azul1.jpg"
import neon1Img from "@/assets/zapatillas/Neon1.jpg"

export default function PersonalizarPage() {
  const [selectedModel, setSelectedModel] = useState("classic")
  const [selectedColor, setSelectedColor] = useState("#FF6B35")
  const [selectedSize, setSelectedSize] = useState("42")
  const [customText, setCustomText] = useState("")
  const [currentPrice, setCurrentPrice] = useState(89.99)
  const [viewMode, setViewMode] = useState("3d")

  const modelos = [
    {
      id: "classic",
      name: "Air Punto Classic",
      basePrice: 89.99,
      image: blanca1Img,
      status: "Disponible",
      category: "Casual",
    },
    {
      id: "runner",
      name: "Punto Runner Pro",
      basePrice: 129.99,
      image: negro1Img,
      status: "Nuevo",
      category: "Deportivo",
    },
    {
      id: "urban",
      name: "Urban Street V",
      basePrice: 99.99,
      image: neon1Img,
      status: "En oferta",
      category: "Urbano",
    },
  ]

  const colores = [
    { name: "Naranja Punto V", value: "#FF6B35", premium: false },
    { name: "Rojo Fuego", value: "#E53E3E", premium: false },
    { name: "Negro Clásico", value: "#1A202C", premium: false },
    { name: "Blanco Puro", value: "#FFFFFF", premium: false },
    { name: "Azul Océano", value: "#3182CE", premium: false },
    { name: "Verde Bosque", value: "#38A169", premium: false },
    { name: "Oro Metálico", value: "#D69E2E", premium: true },
    { name: "Plata Cromada", value: "#A0AEC0", premium: true },
    { name: "Rosa Neón", value: "#ED64A6", premium: true },
  ]

  const patrones = [
    { id: "solid", name: "Sólido", price: 0 },
    { id: "stripes", name: "Rayas", price: 15 },
    { id: "dots", name: "Puntos", price: 12 },
    { id: "geometric", name: "Geométrico", price: 20 },
    { id: "gradient", name: "Degradado", price: 18 },
  ]

  const materiales = [
    { id: "canvas", name: "Lona Clásica", price: 0 },
    { id: "leather", name: "Cuero Premium", price: 40 },
    { id: "mesh", name: "Malla Deportiva", price: 25 },
    { id: "suede", name: "Ante Suave", price: 35 },
  ]

  const tallas = ["38", "39", "40", "41", "42", "43", "44", "45", "46"]

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    // Actualizar precio basado en el color premium
    const colorObj = colores.find((c) => c.value === color)
    const basePrice = modelos.find((m) => m.id === selectedModel)?.basePrice || 89.99
    
    // Restablecer precio base y agregar premium si corresponde
    let newPrice = basePrice
    if (colorObj?.premium) {
      newPrice += 25
    }
    if (customText) {
      newPrice += 15
    }
    setCurrentPrice(newPrice)
  }

  // Manejar cambios en el texto personalizado
  const handleTextChange = (text: string) => {
    // Si antes no había texto y ahora sí, agregar cargo
    const prevHadText = customText !== "";
    const nowHasText = text !== "";
    
    setCustomText(text.slice(0, 15));
    
    if (!prevHadText && nowHasText) {
      setCurrentPrice(prev => prev + 15);
    } else if (prevHadText && !nowHasText) {
      setCurrentPrice(prev => prev - 15);
    }
  }

  // Manejar cambios de modelo
  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    const modelBasePrice = modelos.find(m => m.id === modelId)?.basePrice || 89.99;
    
    // Recalcular precio total basado en selecciones actuales
    let newPrice = modelBasePrice;
    
    // Agregar costo de color premium si aplica
    if (colores.find(c => c.value === selectedColor)?.premium) {
      newPrice += 25;
    }
    
    // Agregar costo de texto personalizado si aplica
    if (customText) {
      newPrice += 15;
    }
    
    setCurrentPrice(newPrice);
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
              <Link href="/personalizar" className="text-orange-600 font-medium">
                Personalizar
              </Link>
              <Link href="/concursos" className="text-gray-700 hover:text-orange-600 font-medium">
                Concursos
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Panel de Personalización */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Personalización
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="modelo" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="modelo">Modelo</TabsTrigger>
                    <TabsTrigger value="colores">Colores</TabsTrigger>
                    <TabsTrigger value="texto">Texto</TabsTrigger>
                    <TabsTrigger value="extras">Extras</TabsTrigger>
                  </TabsList>

                  <TabsContent value="modelo" className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Seleccionar Modelo</Label>
                      <div className="grid gap-3 mt-2">
                        {modelos.map((modelo) => (
                          <div
                            key={modelo.id}
                            onClick={() => handleModelChange(modelo.id)}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              selectedModel === modelo.id
                                ? "border-orange-500 bg-orange-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Image
                                src={modelo.image || "/placeholder.svg"}
                                alt={modelo.name}
                                width={60}
                                height={60}
                                className="rounded-md"
                              />
                              <div className="flex-1">
                                <h3 className="font-medium">{modelo.name}</h3>
                                <p className="text-sm text-gray-600">{modelo.category}</p>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="font-semibold">${modelo.basePrice}</span>
                                  <Badge variant={modelo.status === "Nuevo" ? "default" : "secondary"}>
                                    {modelo.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="size" className="text-base font-medium">
                        Talla
                      </Label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Seleccionar talla" />
                        </SelectTrigger>
                        <SelectContent>
                          {tallas.map((talla) => (
                            <SelectItem key={talla} value={talla}>
                              Talla {talla}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="colores" className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Color Principal</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {colores.map((color) => (
                          <div
                            key={color.value}
                            onClick={() => handleColorChange(color.value)}
                            className={`relative p-2 border rounded-lg cursor-pointer transition-all ${
                              selectedColor === color.value
                                ? "border-orange-500 ring-2 ring-orange-200"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="w-full h-8 rounded-md border" style={{ backgroundColor: color.value }} />
                            <p className="text-xs mt-1 text-center">{color.name}</p>
                            {color.premium && (
                              <Badge className="absolute -top-1 -right-1 text-xs bg-yellow-500">Premium</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Patrón</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Seleccionar patrón" />
                        </SelectTrigger>
                        <SelectContent>
                          {patrones.map((patron) => (
                            <SelectItem key={patron.id} value={patron.id}>
                              {patron.name} {patron.price > 0 && `(+$${patron.price})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Material</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Seleccionar material" />
                        </SelectTrigger>
                        <SelectContent>
                          {materiales.map((material) => (
                            <SelectItem key={material.id} value={material.id}>
                              {material.name} {material.price > 0 && `(+$${material.price})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="texto" className="space-y-4">
                    <div>
                      <Label htmlFor="customText" className="text-base font-medium">
                        Texto Personalizado
                      </Label>
                      <Input
                        id="customText"
                        placeholder="Ingresa tu texto (máx. 15 caracteres)"
                        value={customText}
                        onChange={(e) => handleTextChange(e.target.value)}
                        className="mt-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">{customText.length}/15 caracteres</p>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Posición del Texto</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Seleccionar posición" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="heel">Talón</SelectItem>
                          <SelectItem value="side">Lateral</SelectItem>
                          <SelectItem value="tongue">Lengüeta</SelectItem>
                          <SelectItem value="sole">Suela</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Fuente</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Seleccionar fuente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Moderna</SelectItem>
                          <SelectItem value="classic">Clásica</SelectItem>
                          <SelectItem value="bold">Negrita</SelectItem>
                          <SelectItem value="script">Script</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="extras" className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Logo Personalizado</Label>
                      <Button variant="outline" className="w-full mt-2">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Subir Logo
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">Formatos: PNG, JPG (máx. 2MB)</p>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Acabados Especiales</Label>
                      <div className="space-y-2 mt-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Reflectante (+$20)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Glow in the Dark (+$25)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Textura 3D (+$30)</span>
                        </label>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full mb-2"
                    onClick={() => {
                      setSelectedColor("#FF6B35")
                      handleTextChange("")
                      setSelectedSize("42")
                      // Restablecer el precio al precio base del modelo seleccionado
                      const basePrice = modelos.find((m) => m.id === selectedModel)?.basePrice || 89.99;
                      setCurrentPrice(basePrice);
                    }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restablecer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vista 3D/360° */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Vista Previa
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant={viewMode === "3d" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("3d")}
                    >
                      3D
                    </Button>
                    <Button
                      variant={viewMode === "360" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("360")}
                    >
                      360°
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                  {viewMode === "3d" ? (
                    <div className="w-full h-full aspect-square">
                      <ShoeViewer 
                        color={selectedColor} 
                        customText={customText}
                        textPosition="side"
                      />
                    </div>
                  ) : (
                    <Image
                      src={modelos.find(m => m.id === selectedModel)?.image || blanca1Img}
                      alt="Vista previa de zapatilla personalizada"
                      width={400}
                      height={400}
                      className="max-w-full max-h-full object-contain"
                      style={{ filter: `hue-rotate(${selectedColor === "#FF6B35" ? "0" : "180"}deg)` }}
                    />
                  )}
                  {customText && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {customText}
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white text-gray-900">Talla {selectedSize}</Badge>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Arrastra para rotar • Zoom con scroll</p>
                  <div className="flex justify-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4 mr-2" />
                      Favorito
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel de Precio y Compra */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Modelo base ({modelos.find((m) => m.id === selectedModel)?.name})</span>
                    <span>${modelos.find((m) => m.id === selectedModel)?.basePrice.toFixed(2)}</span>
                  </div>
                  {colores.find((c) => c.value === selectedColor)?.premium && (
                    <div className="flex justify-between">
                      <span>Color premium ({colores.find((c) => c.value === selectedColor)?.name})</span>
                      <span>$25.00</span>
                    </div>
                  )}
                  {customText && (
                    <div className="flex justify-between">
                      <span>Texto personalizado</span>
                      <span>$15.00</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-orange-600">${currentPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Especificaciones:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Modelo: {modelos.find((m) => m.id === selectedModel)?.name}</li>
                    <li>• Talla: {selectedSize}</li>
                    <li>• Color: {colores.find((c) => c.value === selectedColor)?.name}</li>
                    {customText && <li>• Texto: &quot;{customText}&quot;</li>}
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Tiempo de producción:</strong> 7-10 días hábiles
                  </p>
                  <p className="text-sm text-blue-700 mt-1">Envío gratuito en pedidos sobre $100</p>
                </div>

                <div className="space-y-2">
                  <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Añadir al Carrito
                  </Button>
                  <Button variant="outline" className="w-full">
                    Comprar Ahora
                  </Button>
                </div>

                <div className="text-center">
                  <Link href="/concursos" className="text-sm text-orange-600 hover:text-orange-700">
                    ¿Te gusta tu diseño? Participa en nuestros concursos →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
