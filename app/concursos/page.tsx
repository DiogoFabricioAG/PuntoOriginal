"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trophy,
  Users,
  Calendar,
  Clock,
  Search,
  Filter,
  Star,
  Heart,
  Eye,
  ArrowLeft,
  Upload,
  ThumbsUp,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

//Importación de imagenes
import blanca1Img from "@/assets/zapatillas/Blanca1.jpg";
import blanca2Img from "@/assets/zapatillas/Blanca2.jpg";
import blanca3Img from "@/assets/zapatillas/Blanca3.jpg";
import negro1Img from "@/assets/zapatillas/Negro1.jpg";
import negro2Img from "@/assets/zapatillas/Negro2.jpg";
import negro3Img from "@/assets/zapatillas/Negro3.jpg";
import negro4Img from "@/assets/zapatillas/Negro4.jpg";
import negro5Img from "@/assets/zapatillas/Negro5.jpg";
import azul1Img from "@/assets/zapatillas/Azul1.jpg";
import gris1Img from "@/assets/zapatillas/Gris1.jpg";
import naranja1Img from "@/assets/zapatillas/Naranja1.jpg";
import neon1Img from "@/assets/zapatillas/Neon1.jpg";
import random1Img from "@/assets/zapatillas/Random1.jpg";
import random2Img from "@/assets/zapatillas/Random2.jpg";
import random3Img from "@/assets/zapatillas/Random3.jpg";
import random4Img from "@/assets/zapatillas/Random4.jpg";
import random5Img from "@/assets/zapatillas/Random5.jpg";

//Importación de concursos
import veranoImg from "@/assets/concursos/verano.jpg";
import urbanoImg from "@/assets/concursos/urbano.jpg";

export default function ConcursosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  // Estado para gestionar la vista de detalle ---
  const [selectedContest, setSelectedContest] = useState<any | null>(null);

  const concursos = [
    {
      id: 1,
      title: "Concurso Verano 2025",
      description:
        "Diseña las zapatillas perfectas para el verano. Colores vibrantes, materiales frescos y estilo único.",
      prize: "$5,000",
      participants: 234,
      image: veranoImg,
      status: "active",
      // Fase actual del concurso
      phase: "inscripcion",
      // Definición de todas las fases para la línea de tiempo
      phases: [
        { name: "Inscripción", status: "active", date: "Jun 24, 2025" },
        { name: "Votación", status: "upcoming", date: "Jul 16, 2025" },
        { name: "Finalistas", status: "upcoming", date: "Jul 25, 2025" },
        { name: "Ganador", status: "upcoming", date: "Ago 01, 2025" },
      ],
      // Diseños presentados (vacío porque está en inscripción)
      submissions: [],
    },
    {
      id: 2,
      title: "Edición Limitada Urbana",
      description:
        "Crea diseños inspirados en la cultura urbana y el street art. Expresión libre y creatividad sin límites.",
      prize: "$3,000",
      participants: 156,
      image: urbanoImg,
      status: "active",
      phase: "votacion",
      phases: [
        { name: "Inscripción", status: "completed", date: "May 15, 2025" },
        { name: "Votación", status: "active", date: "Jun 15, 2025" },
        { name: "Finalistas", status: "upcoming", date: "Jul 01, 2025" },
        { name: "Ganador", status: "upcoming", date: "Jul 10, 2025" },
      ],
      // Diseños de ejemplo para la fase de votación
      submissions: [
        {
          id: 1,
          title: "Sunset Vibes",
          designer: "Ana López",
          image: blanca1Img,
          votes: 127,
        },
        {
          id: 2,
          title: "Urban Jungle",
          designer: "Diego Martín",
          image: negro1Img,
          votes: 98,
        },
        {
          id: 3,
          title: "Ocean Breeze",
          designer: "Sofia Chen",
          image: gris1Img,
          votes: 156,
        },
        {
          id: 4,
          title: "Graffiti Pop",
          designer: "Carlos Vera",
          image: blanca2Img,
          votes: 88,
        },
        {
          id: 5,
          title: "Metro Lines",
          designer: "Lucía Ferreyros",
          image: blanca3Img,
          votes: 110,
        },
        {
          id: 6,
          title: "Night Runner",
          designer: "Javier Prado",
          image: negro3Img,
          votes: 132,
        },
      ],
    },
    {
      id: 4,
      title: "Retro Revival 2024",
      description: "Diseños inspirados en los años 80 y 90",
      endDate: "2024-05-01",
      winner: "María González",
      prize: "$2,500",
      participants: 98,
      image: blanca3Img,
      status: "completed",
      phase: "finalizado",
      phases: [
        { name: "Inscripción", status: "completed", date: "Mar 01, 2024" },
        { name: "Votación", status: "completed", date: "Abr 01, 2024" },
        { name: "Finalistas", status: "completed", date: "Abr 15, 2024" },
        { name: "Ganador", status: "completed", date: "May 01, 2024" },
      ],
      submissions: [],
    },
  ];

  // Componente para la línea de tiempo de fases
  const ContestTimeline = ({
    phases,
    currentPhase,
  }: {
    phases: any[];
    currentPhase: string;
  }) => {
    const getStatusColor = (status: "completed" | "active" | "upcoming") => {
      switch (status) {
        case "completed":
          return "bg-green-500";
        case "active":
          return "bg-orange-500 animate-pulse";
        case "upcoming":
          return "bg-gray-300";
      }
    };
    const getTextColor = (status: "completed" | "active" | "upcoming") => {
      return status === "upcoming" ? "text-gray-500" : "text-gray-800";
    };

    return (
      <div className="w-full my-8">
        <div className="flex items-center">
          {phases.map((phase, index) => (
            <div key={phase.name} className="flex-1 flex items-center">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(
                    phase.status
                  )}`}
                >
                  {phase.status === "completed" && (
                    <ThumbsUp className="w-5 h-5 text-white" />
                  )}
                </div>
                <p
                  className={`mt-2 font-semibold ${getTextColor(phase.status)}`}
                >
                  {phase.name}
                </p>
                <p className={`text-sm ${getTextColor(phase.status)}`}>
                  {phase.date}
                </p>
              </div>
              {index < phases.length - 1 && (
                <div
                  className={`flex-1 h-1 ${
                    phase.status === "completed"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const disenosDestacados = [
    {
      id: 1,
      title: "Sunset Vibes",
      designer: "Ana López",
      contestId: 1,
      votes: 127,
      views: 1543,
      image: blanca1Img,
      liked: false,
    },
    {
      id: 2,
      title: "Urban Jungle",
      designer: "Diego Martín",
      contestId: 2,
      votes: 98,
      views: 1234,
      image: negro1Img,
      liked: true,
    },
    {
      id: 3,
      title: "Ocean Breeze",
      designer: "Sofia Chen",
      contestId: 1,
      votes: 156,
      views: 1876,
      image: gris1Img,
      liked: false,
    },
  ];

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Lógica para manejar la votación (simulada)
  const handleVote = (submissionId: number) => {
    const updatedContest = { ...selectedContest };
    const submissionIndex = updatedContest.submissions.findIndex(
      (s: any) => s.id === submissionId
    );
    if (submissionIndex > -1) {
      updatedContest.submissions[submissionIndex].votes += 1;
      setSelectedContest(updatedContest);
    }
  };

  // Si un concurso está seleccionado, muestra la vista de detalle
  // Vista de Detalle del Concurso
  if (selectedContest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <header className="bg-white shadow-sm border-b">
          {/* ... El header puede permanecer igual ... */}
        </header>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="outline"
            onClick={() => setSelectedContest(null)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a todos los concursos
          </Button>

          <Card className="overflow-hidden">
            <Image
              src={selectedContest.image}
              alt={selectedContest.title}
              width={1200}
              height={400}
              className="w-full h-64 object-cover"
            />
            <CardContent className="p-8">
              <Badge className="mb-4 bg-orange-500">
                {selectedContest.phase === "inscripcion"
                  ? "Inscripciones Abiertas"
                  : "Votaciones Abiertas"}
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900">
                {selectedContest.title}
              </h1>
              <p className="text-lg text-gray-600 mt-2 mb-6">
                {selectedContest.description}
              </p>

              <div className="flex items-center space-x-6 text-lg">
                <div className="flex items-center font-semibold">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-500" /> Premio:{" "}
                  {selectedContest.prize}
                </div>
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-blue-500" />{" "}
                  {getDaysRemaining(selectedContest.phase)} días restantes
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-10 border-b pb-2 mb-4">
                Fases del Concurso
              </h2>
              <ContestTimeline
                phases={selectedContest.phases}
                currentPhase={selectedContest.phase}
              />

              {/* Interfaz Condicional: Participar o Votar */}
              {selectedContest.phase === "inscripcion" && (
                <div id="participar">
                  <h2 className="text-2xl font-bold text-gray-800 mt-10 border-b pb-2 mb-6">
                    ¡Participa Ahora!
                  </h2>
                  <Card className="bg-gray-50 p-6">
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="design-name">Nombre de tu diseño</Label>
                        <Input
                          id="design-name"
                          placeholder="Ej: Fuego Andino"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="design-desc">
                          Cuéntanos sobre tu diseño
                        </Label>
                        <Textarea
                          id="design-desc"
                          placeholder="Mi diseño se inspira en..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="design-file">Sube tu diseño</Label>
                        <div className="mt-2 flex items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-10 h-10 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                  Click para subir
                                </span>{" "}
                                o arrastra y suelta
                              </p>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, o GIF (MAX. 800x400px)
                              </p>
                            </div>
                            <Input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      >
                        Enviar mi Diseño
                      </Button>
                    </div>
                  </Card>
                </div>
              )}

              {selectedContest.phase === "votacion" && (
                <div id="votar">
                  <h2 className="text-2xl font-bold text-gray-800 mt-10 border-b pb-2 mb-6">
                    Vota por tu Favorito
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedContest.submissions.map((design: any) => (
                      <Card key={design.id} className="group overflow-hidden">
                        <Image
                          src={design.image}
                          alt={design.title}
                          width={300}
                          height={300}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                        />
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg">{design.title}</h3>
                          <p className="text-sm text-gray-500">
                            por {design.designer}
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <span className="font-bold text-orange-600 flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-1.5" />{" "}
                              {design.votes} Votos
                            </span>
                            <Button
                              size="sm"
                              onClick={() => handleVote(design.id)}
                            >
                              Votar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
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
              <Link
                href="/tienda"
                className="text-gray-700 hover:text-orange-600 font-medium"
              >
                Tienda
              </Link>
              <Link
                href="/personalizar"
                className="text-gray-700 hover:text-orange-600 font-medium"
              >
                Personalizar
              </Link>
              <Link href="/concursos" className="text-orange-600 font-medium">
                Concursos
              </Link>
              <Link
                href="/seguimiento"
                className="text-gray-700 hover:text-orange-600 font-medium"
              >
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Concursos de Diseño
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Participa en nuestros concursos, comparte tu creatividad y gana
            increíbles premios. Tu diseño podría convertirse en la próxima
            zapatilla estrella de Punto V.
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

          <TabsContent value="activos" className="space-y-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {concursos.filter(c => c.status === 'active').map((concurso) => (
                                <Card key={concurso.id} className="group hover:shadow-xl transition-all duration-300 flex flex-col">
                                    <div className="relative overflow-hidden rounded-t-lg">
                                        <Image src={concurso.image} alt={concurso.title} width={400} height={300} className="w-full h-48 object-cover"/>
                                        <Badge className="absolute top-4 left-4 bg-green-500">Activo</Badge>
                                    </div>
                                    <CardContent className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge variant="outline">{concurso.phase === 'inscripcion' ? 'Inscripción' : 'Votación'}</Badge>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {getDaysRemaining(concurso.phase)} días restantes
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{concurso.title}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{concurso.description}</p>
                                        <div className="flex items-center font-semibold mb-4">
                                            <Trophy className="w-5 h-5 mr-2 text-yellow-500" /> {concurso.prize}
                                        </div>
                                        {/*  Botones que actualizan el estado */}
                                        <div className="flex gap-2 mt-auto">
                                          <Button
                                            onClick={() => setSelectedContest(concurso)}
                                            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                          >
                                            {concurso.phase === "inscripcion" ? "Participar Ahora" : "Ir a Votar"}
                                          </Button>
                                          <Button
                                            onClick={() => setSelectedContest(concurso)}
                                            variant="outline"
                                            className="flex-1"
                                          >
                                            Ver Detalles
                                          </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

          {/* Concursos Finalizados */}
          <TabsContent value="finalizados" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {concursos.filter(c => c.status === 'completed').map((concurso) => (
                <Card
                  key={concurso.id}
                  className="hover:shadow-lg transition-shadow"
                >
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {concurso.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {concurso.description}
                        </p>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center space-x-3">
                            <Trophy className="w-6 h-6 text-yellow-600" />
                            <div>
                              <p className="font-semibold text-yellow-800">
                                Ganador: {concurso.winner}
                              </p>
                              <p className="text-sm text-yellow-700">
                                Premio: {concurso.prize}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {concurso.participants} participantes
                          </span>
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
                <Card
                  key={diseno.id}
                  className="group hover:shadow-xl transition-all duration-300"
                >
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
                        className={`${
                          diseno.liked
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-white/80 hover:bg-white"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            diseno.liked ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {diseno.title}
                    </h3>
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
            Únete a nuestra comunidad de diseñadores y compite por increíbles
            premios
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registro">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                Crear Cuenta Gratis
              </Button>
            </Link>
            <Link href="/personalizar">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-orange-600 hover:bg-white/10"
              >
                Probar Herramientas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
