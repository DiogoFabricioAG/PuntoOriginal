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
import { JordanShoeCustomizer } from "@/components/jordan-shoe-customizer"

// Importar imágenes de zapatillas
import blanca1Img from "@/assets/zapatillas/Blanca1.jpg"
import blanca1ImgIA from "@/assets/ia/imag3.png"
import imagenInicial from "@/assets/ia/ImagenInicial.png" 
import negro1Img from "@/assets/zapatillas/Negro1.jpg"
import negro1ImgIA from "@/assets/ia/imag2.png"
import neon1ImgIA from "@/assets/ia/imag1.png"
import neon1Img from "@/assets/zapatillas/Neon1.jpg"

export default function PersonalizarPage() {
  const [selectedModel, setSelectedModel] = useState("classic")
  const [selectedColor, setSelectedColor] = useState("#FF6B35")
  const [selectedSize, setSelectedSize] = useState("42")
  const [customText, setCustomText] = useState("")
  const [currentPrice, setCurrentPrice] = useState(89.99)
  const [viewMode, setViewMode] = useState("3d")
  const [modelType, setModelType] = useState("normal") // "normal" o "jordan"
  
  // Estados para la funcionalidad de IA
  const [showImageComparison, setShowImageComparison] = useState(false)
  const [isProcessingIA, setIsProcessingIA] = useState(false)
  const [imageComparisonStep, setImageComparisonStep] = useState(0) // 0: inicial, 1: procesando, 2: resultado

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

  // Función para simular el proceso de IA
  const handleImageUpload = () => {
    setShowImageComparison(true)
    setIsProcessingIA(true)
    setImageComparisonStep(1)
    
    // Simular procesamiento de IA
    setTimeout(() => {
      setImageComparisonStep(2)
      setIsProcessingIA(false)
    }, 2500)
  }

  // Función para cerrar la comparación
  const closeImageComparison = () => {
    setShowImageComparison(false)
    setImageComparisonStep(0)
    setIsProcessingIA(false)
  }

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

  const [activeTab, setActiveTab] = useState("modelo")
  
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
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="modelo">Modelo</TabsTrigger>
                    <TabsTrigger value="jordan">3D</TabsTrigger>
                    <TabsTrigger value="ia">IA Visual</TabsTrigger>
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

                  <TabsContent value="jordan" className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Modelo 3D</Label>
                      <div className="grid gap-3 mt-2">
                        <div 
                          onClick={() => {
                            // Actualizar el estado para mostrar el modelo Jordan
                            setModelType("jordan");
                            // Actualizar el precio para el modelo Jordan
                            setCurrentPrice(189.99);
                          }}
                          className={`p-3 border rounded-lg cursor-pointer transition-all border-orange-500 bg-orange-50`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-[60px] h-[60px] bg-gray-100 rounded-md flex items-center justify-center">
                              <Palette className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">Vista 3d</h3>
                              <p className="text-sm text-gray-600">Edición Premium</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="font-semibold">$189.99</span>
                                <Badge variant="default">
                                  Exclusivo
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Haz clic en el modelo 3D para personalizar cada parte de forma independiente
                      </p>
                      <div className="mt-4">
                        <p className="text-sm text-gray-700 font-medium">Instrucciones:</p>
                        <ul className="text-xs text-gray-600 space-y-1 mt-1">
                          <li>1. Haz clic en cualquier parte de la zapatilla para seleccionarla</li>
                          <li>2. Usa el selector de color para cambiar el color de esa parte</li>
                          <li>3. Personaliza tantas partes como desees</li>
                          <li>4. Utiliza el botón &quot;Guardar diseño&quot; para descargar tu creación</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="ia" className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Visualización con IA</Label>
                      <p className="text-sm text-gray-600 mt-1 mb-4">
                        Sube una imagen y ve cómo te quedarían las zapatillas con tecnología de IA
                      </p>
                      
                      <div className="space-y-4">
                        <Button 
                          onClick={handleImageUpload}
                          className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                          disabled={isProcessingIA}
                        >
                          {isProcessingIA ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Procesando con IA...
                            </>
                          ) : (
                            <>
                              <ImageIcon className="w-4 h-4 mr-2" />
                              Cargar Imagen y Visualizar
                            </>
                          )}
                        </Button>
                        
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
                          <h4 className="font-medium text-orange-800 mb-2">¿Cómo funciona?</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>1. Sube una imagen tuya o de tu outfit</li>
                            <li>2. Nuestra IA analizará el estilo y colores</li>
                            <li>3. Te mostrará cómo te quedarían las zapatillas</li>
                            <li>4. Compara diferentes modelos y colores</li>
                          </ul>
                        </div>
                      </div>
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
                  {activeTab === "jordan" ? (
                    <div className="w-full h-full aspect-square overflow-hidden">
                      <JordanShoeCustomizer />
                    </div>
                  ) : viewMode === "3d" ? (
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
                  {customText && activeTab !== "jordan" && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {customText}
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white text-gray-900">
                      {activeTab === "jordan" ? "Vista 3D" : `Talla ${selectedSize}`}
                    </Badge>
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
                  {activeTab === "jordan" ? (
                    <div className="flex justify-between">
                      <span>Vista Personalizado</span>
                      <span>$189.99</span>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span>Modelo base ({modelos.find((m) => m.id === selectedModel)?.name})</span>
                      <span>${modelos.find((m) => m.id === selectedModel)?.basePrice.toFixed(2)}</span>
                    </div>
                  )}
                  {!activeTab.includes("jordan") && (
                    <>
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
                    </>
                  )}
                  {activeTab === "jordan" && (
                    <div className="flex justify-between">
                      <span>Personalización multicolor</span>
                      <span>Incluido</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-orange-600">
                        ${activeTab === "jordan" ? "189.99" : currentPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Especificaciones:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {activeTab === "jordan" ? (
                      <>
                        <li>• Modelo: Air Jordan Personalizado</li>
                        <li>• Tipo: Premium Multicolor</li>
                        <li>• Personalización: Colores por parte</li>
                      </>
                    ) : (
                      <>
                        <li>• Modelo: {modelos.find((m) => m.id === selectedModel)?.name}</li>
                        <li>• Talla: {selectedSize}</li>
                        <li>• Color: {colores.find((c) => c.value === selectedColor)?.name}</li>
                        {customText && <li>• Texto: &quot;{customText}&quot;</li>}
                      </>
                    )}
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

      {/* Modal de Comparación de Imágenes con IA */}
      {showImageComparison && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Visualización con IA
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeImageComparison}
                  className="rounded-full hover:bg-gray-100 transition-colors"
                >
                  ✕
                </Button>
              </div>

              {imageComparisonStep === 1 && (
                <div className="text-center py-12">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600 mx-auto mb-4"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Procesando con IA...</h3>
                  <p className="text-gray-600">Analizando tu imagen y generando la visualización</p>
                  <div className="mt-4 bg-gray-200 rounded-full h-2 max-w-xs mx-auto overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                      <span>Detectando colores dominantes</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <span>Analizando estilo y combinaciones</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <span>Generando visualización realista</span>
                    </div>
                  </div>
                </div>
              )}

              {imageComparisonStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">¡Visualización Completada!</h3>
                    <p className="text-gray-600">Aquí tienes cómo te quedarían las zapatillas</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Imagen Original */}
                    <div className="space-y-3">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                        <div className="relative bg-white rounded-lg p-2 shadow-lg">
                          <Image
                            src={imagenInicial}
                            alt="Imagen Original"
                            width={300}
                            height={320}
                            className="w-full h-80 object-cover rounded-md"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-gray-600 text-white">Original</Badge>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-center">Tu Imagen</h4>
                      <p className="text-sm text-gray-600 text-center">Imagen base subida</p>
                    </div>

                    {/* Imagen con IA - Conectada al modelo seleccionado */}
                    <div className="space-y-3">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                        <div className="relative bg-white rounded-lg p-2 shadow-lg">
                          <Image
                            src={
                              selectedModel === "classic" ? blanca1ImgIA : 
                              selectedModel === "runner" ? negro1ImgIA : 
                              neon1ImgIA
                            }
                            alt="Procesado con IA"
                            width={300}
                            height={320}
                            className="w-full h-80 object-cover rounded-md"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">IA</Badge>
                          </div>
                          <div className="absolute top-3 right-3">
                            <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                              Procesado
                            </div>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-center">Con IA</h4>
                      <p className="text-sm text-gray-600 text-center">Modelo: {modelos.find(m => m.id === selectedModel)?.name}</p>
                    </div>

                    {/* Zapatilla Real */}
                    <div className="space-y-3">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                        <div className="relative bg-white rounded-lg p-2 shadow-lg">
                          <Image
                            src={modelos.find(m => m.id === selectedModel)?.image || blanca1Img}
                            alt="Zapatilla Real"
                            width={300}
                            height={320}
                            className="w-full h-80 object-cover rounded-md"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">Producto</Badge>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-center">Zapatilla Real</h4>
                      <p className="text-sm text-gray-600 text-center">Producto final</p>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 mt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-3">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-800">Análisis Completado</h4>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-orange-600 mr-2">Coincidencia de estilo:</span>
                          <div className="bg-orange-200 rounded-full h-2 w-20 overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-1000" style={{width: '94%'}}></div>
                          </div>
                          <span className="text-sm font-semibold text-orange-700 ml-2">94%</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-orange-800 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                          Recomendaciones de IA:
                        </h5>
                        <ul className="text-sm text-orange-700 space-y-1">
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                            Color recomendado: {colores.find(c => c.value === selectedColor)?.name}
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                            Estilo compatible con tu outfit
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                            Combinación perfecta detectada
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-orange-800 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                          Detalles técnicos:
                        </h5>
                        <ul className="text-sm text-orange-700 space-y-1">
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                            Modelo: {modelos.find(m => m.id === selectedModel)?.name}
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                            Confianza de IA: 94%
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                            Tiempo de procesamiento: 2.3s
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                      onClick={() => {
                        closeImageComparison()
                        // Aquí podrías añadir al carrito automáticamente
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Me gusta, añadir al carrito
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
                      onClick={() => {
                        // Simular nueva imagen
                        setImageComparisonStep(1)
                        setTimeout(() => setImageComparisonStep(2), 2000)
                      }}
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Probar otra imagen
                    </Button>
                    <Button 
                      variant="outline"
                      className="hover:bg-gray-50 transition-colors"
                      onClick={closeImageComparison}
                    >
                      Cerrar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
