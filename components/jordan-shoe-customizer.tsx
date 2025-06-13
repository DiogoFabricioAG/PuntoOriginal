'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber'
import {
  useGLTF,
  ContactShadows,
  Environment,
  OrbitControls,
} from '@react-three/drei'
import { HexColorPicker } from 'react-colorful'
import { proxy, useSnapshot } from 'valtio'
import html2canvas from 'html2canvas'
// FIX ▶️ importa Mesh para los type‑casts
import { Mesh } from 'three'

// ---------------------------------------------------------------------------
// 1. Estado global con Valtio
// ---------------------------------------------------------------------------

const state = proxy({
  current: null as null | keyof JordanColors,
  items: {
    side: '#e3e3e3',
    back_flipper: '#ffffff',
    front_down: '#e3e3e3',
    slashes: '#191a11',
    mini_flaps: '#3d3d3d',
    side_flaps: '#af1a2b',
    back_flip: '#af1a2b',
    logo: '#3a3a3a',
    upper_side: '#ad1b29',
    upper_soft: '#3a3a3a',
    softy: '#0e0f10',
    big_front: '#0e0f10',
    upper_bottom_bottom: '#d7d2d1',
    bottooom: '#7c1013',
    bottom_logo: '#3a3a3a',
    middle_sides: '#b01826',
    front_side: '#b31929',
  },
})

type JordanColors = typeof state.items

// ---------------------------------------------------------------------------
// 2. Modelo Jordan
// ---------------------------------------------------------------------------

function Shoe() {
  const ref = useRef<THREE.Group>(null!)
  const snap = useSnapshot(state)
  // rtl‑three guarda una cache interna; basta con llamar sin genéricos
  const { nodes, materials } = useGLTF('/models/jordan_shoe.glb')

  // Rotación/“flotación”
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.set(
      Math.cos(t / 4) / 8,
      Math.sin(t / 4) / 8,
      -0.2 - (1 + Math.sin(t / 1.5)) / 20,
    )
    ref.current.position.y = 0.2 + (0.04 + Math.sin(t / 2)) / 10
  })

  // Color del cursor SVG
  const [hovered, setHovered] = useState<keyof JordanColors | null>(null)

  useEffect(() => {
    // Si no hay parte sobre la que pasar el mouse → cursor normal
    const auto =
      "data:image/svg+xml;base64," +
      btoa(
        `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255,255,255,.5)" d="M29.5 54C43 54 54 43 54 29.5S43 5 29.5 5 5 16 5 29.5 16 54 29.5 54Z" stroke="#000"/><path d="M2 2l11 3L5 13 2 2Z" fill="#000"/></svg>`,
      )

    if (!hovered) {
      document.body.style.cursor = `url("${auto}") 0 0, auto`
      return
    }

    const colorCircle =
      "data:image/svg+xml;base64," +
      btoa(
        `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255,255,255,.5)" d="M29.5 54C43 54 54 43 54 29.5S43 5 29.5 5 5 16 5 29.5 16 54 29.5 54Z" stroke="#000"/><circle cx="29.5" cy="29.5" r="17" fill="${snap.items[hovered]}"/><path d="M2 2l11 3L5 13 2 2Z" fill="#000"/></svg>`,
      )

    document.body.style.cursor = `url("${colorCircle}") 0 0, auto`
    return () => {
      document.body.style.cursor = `url("${auto}") 0 0, auto`
    }
  }, [hovered, snap.items])

  // ───────── handlers con type‑cast seguro ─────────
  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    const name = (e.object as Mesh).material?.name as keyof JordanColors | undefined
    if (name) setHovered(name)
  }

  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    if (e.intersections.length === 0) setHovered(null)
  }

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    const name = (e.object as Mesh).material?.name as keyof JordanColors | undefined
    if (name) state.current = name
  }

  return (
    <group
      ref={ref}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onPointerMissed={() => (state.current = null)}
      onClick={handleClick}
    >
      {/* Se mantiene exactamente tu malla original */}
      {/* … ‑‑‑ Todas las <mesh> iguales a tu versión anterior ‑‑‑ */}
      <group position={[0, -0.3, 0.29]} rotation={[Math.PI / 2, 0, -1.61]} scale={0.65}>
        <mesh geometry={nodes.Object001_4.geometry} material={materials.side} material-color={snap.items.side} />
        <mesh geometry={nodes.Object001_5.geometry} material={materials.back_flipper} material-color={snap.items.back_flipper} />
        <mesh geometry={nodes.Object001_6.geometry} material={materials.front_down} material-color={snap.items.front_down} />
        <mesh geometry={nodes.Object001_7.geometry} material={materials.slashes} material-color={snap.items.slashes} />
        <mesh geometry={nodes.Object001_8.geometry} material={materials.mini_flaps} material-color={snap.items.mini_flaps} />
        <mesh geometry={nodes.Object001_9.geometry} material={materials.front_side} material-color={snap.items.front_side} />
        <mesh geometry={nodes.Object001_10.geometry} material={materials.side_flaps} material-color={snap.items.side_flaps} />
        <mesh geometry={nodes.Object001_11.geometry} material={materials.back_flip} material-color={snap.items.back_flip} />
        <mesh geometry={nodes.Object001_12.geometry} material={materials.logo} material-color={snap.items.logo} />
        <mesh geometry={nodes.Object001_15.geometry} material={materials.middle_sides} material-color={snap.items.middle_sides} />
        <mesh geometry={nodes.Object001_13.geometry} material={materials.upper_side} material-color={snap.items.upper_side} />
        <mesh geometry={nodes.Object001_14.geometry} material={materials.upper_soft} material-color={snap.items.upper_soft} />
        <mesh geometry={nodes.Object001_16.geometry} material={materials.softy} material-color={snap.items.softy} />
        <mesh geometry={nodes.Object001_17.geometry} material={materials.big_front} material-color={snap.items.big_front} />
        <mesh geometry={nodes.Object001_18.geometry} material={materials.upper_bottom_bottom} material-color={snap.items.upper_bottom_bottom} />
        <mesh geometry={nodes.Object001_19.geometry} material={materials.bottooom} material-color={snap.items.bottooom} />
        <mesh geometry={nodes.Object001_20.geometry} material={materials.bottom_logo} material-color={snap.items.bottom_logo} />
      </group>
    </group>
  )
}

// ---------------------------------------------------------------------------
// 3. Color‑picker
// ---------------------------------------------------------------------------

function Picker() {
  const snap = useSnapshot(state)
  if (!snap.current) return null

  const currentPart = snap.current as keyof JordanColors

  return (
    <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">{currentPart}</h3>
        <button
          onClick={() => (state.current = null)}
          className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
        >
          ×
        </button>
      </div>
      <HexColorPicker
        color={snap.items[currentPart]}
        onChange={(color) => (state.items[currentPart] = color)}
        className="picker mb-2"
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// 4. Componente principal exportado
// ---------------------------------------------------------------------------

export function JordanShoeCustomizer() {
  // No necesitamos el ref para html2canvas; seleccionamos después
  const handleDownload = () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return

    html2canvas(canvas).then((c) => {
      const link = document.createElement('a')
      link.href = c.toDataURL('image/png')
      link.download = 'zapatilla-jordan-personalizada.png'
      link.click()
    })
  }

  return (
    <div className="relative w-full h-[420px]">
      <Canvas shadows camera={{ position: [0, 0.5, 4], fov: 50 }} className="w-full h-full">
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Shoe />
        <Environment preset="studio" />
        <ContactShadows position={[0, -0.8, 0]} opacity={0.45} scale={15} blur={1.5} far={0.9} color="white" />
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 1} enableZoom enablePan={false} />
      </Canvas>

      <Picker />

      <button
        onClick={handleDownload}
        className="absolute top-4 right-4 z-10 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
      >
        Descargar diseño
      </button>

      <div className="absolute bottom-4 left-4 z-10 bg-white/80 p-3 rounded-lg backdrop-blur-sm">
        <p className="text-sm font-medium">Haz clic en la zapatilla para personalizar cada parte</p>
      </div>
    </div>
  )
}
