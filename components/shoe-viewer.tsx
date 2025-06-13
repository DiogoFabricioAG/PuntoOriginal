"use client"

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF, Loader, SpotLight } from '@react-three/drei'
import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing'
import * as THREE from 'three'

interface ShoeModel {
  color: string;
  wireframe?: boolean;
  customText?: string;
  textPosition?: 'side' | 'back' | 'tongue';
}

function Shoe({ color, wireframe = false, customText = '', textPosition = 'side' }: ShoeModel) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  
  // Rotación suave más sutil
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15 + Math.PI / 4;
    }
    
    // Efecto sutil de respiración para dar vida al modelo
    if (groupRef.current?.scale) {
      const breathEffect = Math.sin(state.clock.elapsedTime * 0.5) * 0.005 + 1;
      groupRef.current.scale.set(breathEffect, breathEffect, breathEffect);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]} rotation={[0, Math.PI / 4, 0]}>
      {/* Suela */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <meshStandardMaterial color="#333" roughness={0.6} metalness={0.2} />
        <boxGeometry args={[1, 0.1, 3]} />
      </mesh>
      
      {/* Borde de la suela (efecto de textura) */}
      <mesh receiveShadow castShadow position={[0, 0.06, 0]}>
        <meshStandardMaterial color="#222" roughness={0.8} />
        <boxGeometry args={[1.05, 0.02, 3.05]} />
      </mesh>

      {/* Parte superior */}
      <mesh receiveShadow castShadow position={[0, 0.3, 0]}>
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.4} 
          metalness={wireframe ? 0.8 : 0.1} 
          wireframe={wireframe}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
        <boxGeometry args={[0.9, 0.5, 2.8]} />
      </mesh>
      
      {/* Talón reforzado */}
      <mesh receiveShadow castShadow position={[0, 0.4, -1.25]}>
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.5} 
          metalness={0.2} 
          wireframe={wireframe}
        />
        <boxGeometry args={[0.9, 0.7, 0.5]} />
      </mesh>
      
      {/* Punta redondeada */}
      <mesh receiveShadow castShadow position={[0, 0.25, 1.4]}>
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.4} 
          metalness={0.1} 
          wireframe={wireframe}
        />
        <sphereGeometry args={[0.45, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      
      {/* Lengüeta */}
      <mesh receiveShadow castShadow position={[0, 0.5, 0.4]} rotation={[-0.3, 0, 0]}>
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.4} 
          metalness={0.1} 
          wireframe={wireframe}
        />
        <boxGeometry args={[0.7, 0.1, 0.8]} />
      </mesh>
      
      {/* Agujeros para cordones (izquierda) */}
      {[-0.7, -0.4, -0.1, 0.2, 0.5].map((z, i) => (
        <mesh key={`hole-left-${i}`} position={[-0.3, 0.55, z]}>
          <meshBasicMaterial color="#111" />
          <cylinderGeometry args={[0.05, 0.05, 0.2, 12]} />
        </mesh>
      ))}
      
      {/* Agujeros para cordones (derecha) */}
      {[-0.7, -0.4, -0.1, 0.2, 0.5].map((z, i) => (
        <mesh key={`hole-right-${i}`} position={[0.3, 0.55, z]}>
          <meshBasicMaterial color="#111" />
          <cylinderGeometry args={[0.05, 0.05, 0.2, 12]} />
        </mesh>
      ))}
        {/* Cordones */}
      {[-0.7, -0.4, -0.1, 0.2, 0.5].map((z, i) => (
        <group key={`lace-${i}`} position={[0, 0.55, z]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <meshStandardMaterial color="#f0f0f0" roughness={1} />
            <cylinderGeometry args={[0.02, 0.02, 0.65, 8]} />
          </mesh>
        </group>
      ))}
      
      {/* Logo en el lateral */}
      <mesh receiveShadow castShadow position={[0.46, 0.4, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <meshStandardMaterial color="#f8f8f8" metalness={0.5} roughness={0.2} />
        <circleGeometry args={[0.15, 16]} />
      </mesh>
      
      {/* Logo "V" en el círculo */}
      <mesh position={[0.465, 0.4, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <meshStandardMaterial color="#FF6B35" />
        <torusGeometry args={[0.08, 0.015, 16, 16, Math.PI]} />
      </mesh>
      
      {/* Detalles decorativos */}
      <mesh position={[-0.46, 0.4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color={color === "#FFFFFF" ? "#DDDDDD" : "#FFFFFF"} />
        <planeGeometry args={[0.5, 0.1]} />
      </mesh>
      
      {/* Texto personalizado representado como un rectángulo */}
      {customText && (
        <mesh 
          position={
            textPosition === 'side' ? [0.46, 0.3, -0.5] : 
            textPosition === 'back' ? [0, 0.5, -1.45] : 
            [0, 0.6, 0.4]
          } 
          rotation={
            textPosition === 'side' ? [0, -Math.PI / 2, 0] : 
            textPosition === 'back' ? [0, Math.PI, 0] : 
            [-0.3, 0, 0]
          }
        >
          <meshStandardMaterial color="#fff" />
          <planeGeometry args={[0.4, 0.1]} />
        </mesh>
      )}
    </group>
  )
}

// Geometría básica de zapato definida directamente en el componente Shoe

export function ShoeViewer({ 
  color = "#FF6B35", 
  customText = "", 
  textPosition = "side" 
}) {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 45 }}>
        {/* Luces */}
        <ambientLight intensity={0.4} />
        <spotLight 
          position={[5, 5, 5]} 
          intensity={0.8} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
          angle={0.5}
          penumbra={0.5}
        />
        <spotLight 
          position={[-5, 5, -5]} 
          intensity={0.4} 
          castShadow 
          color="#9CA3AF"
        />
        
        {/* Modelo de zapatilla */}
        <Shoe 
          color={color} 
          customText={customText} 
          textPosition={textPosition as 'side' | 'back' | 'tongue'} 
        />
        
        {/* Controladores y efectos */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 4}
        />
        
        {/* Efectos visuales */}
        <EffectComposer>
          <SMAA />
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
        
        {/* Sombras y entorno */}
        <ContactShadows 
          position={[0, -0.2, 0]} 
          opacity={0.6} 
          scale={10} 
          blur={1.5} 
          far={1} 
        />
        <Environment preset="studio" />
        
        {/* Plataforma */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
          <planeGeometry args={[8, 8]} />
          <meshStandardMaterial 
            color="#f0f0f0" 
            roughness={1}
            metalness={0}
          />
        </mesh>
      </Canvas>
      <Loader />
    </div>
  )
}
