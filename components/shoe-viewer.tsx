"use client"

import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Loader } from '@react-three/drei'
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
  });  // Crear un color secundario que contraste o complemente el color principal
  const secondaryColor = color === "#FFFFFF" ? "#EEEEEE" : 
                         color === "#000000" ? "#333333" : 
                         color === "#FF6B35" ? "#E55A24" : 
                         new THREE.Color(color).getHex() * 0.85;

  return (
    <group ref={groupRef} position={[0, -0.17, 0]} rotation={[0, Math.PI / 4, 0]}>
      {/* Base/Entresuela */}
      <mesh receiveShadow castShadow position={[0, 0.08, 0]}>
        <meshPhysicalMaterial 
          color="#f5f5f5"
          roughness={0.7} 
          metalness={0.05} 
          clearcoat={0.1}
          clearcoatRoughness={0.4}
        />
        <boxGeometry args={[1.04, 0.15, 3.04]} />
      </mesh>

      {/* Suela con textura */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <meshPhysicalMaterial 
          color="#222" 
          roughness={0.9} 
          metalness={0.05} 
        />
        <boxGeometry args={[1.08, 0.1, 3.08]} />
      </mesh>
      
      {/* Patrón de la suela (tipo waffle) */}
      {Array(6).fill(0).map((_, i) => (
        <mesh key={`sole-pattern-${i}`} receiveShadow castShadow position={[0, -0.051, -1.3 + i * 0.5]}>
          <meshStandardMaterial color="#1a1a1a" roughness={1} />
          <boxGeometry args={[0.9, 0.02, 0.1]} />
        </mesh>
      ))}
      
      {/* Ranura de flexibilidad en la suela */}
      <mesh receiveShadow castShadow position={[0, -0.04, 0.8]}>
        <meshStandardMaterial color="#1a1a1a" roughness={1} />
        <boxGeometry args={[1, 0.03, 0.08]} />
      </mesh>
      
      {/* Parte superior principal (usando meshes curvos para mejor forma) */}
      <group>
        {/* Parte central */}
        <mesh receiveShadow castShadow position={[0, 0.32, 0]}>
          <meshPhysicalMaterial 
            color={color} 
            roughness={0.4} 
            metalness={wireframe ? 0.8 : 0.05} 
            wireframe={wireframe}
            clearcoat={0.3}
            clearcoatRoughness={0.2}
            envMapIntensity={0.7}
          />
          <boxGeometry args={[0.9, 0.5, 2.8]} />
        </mesh>
        
        {/* Curvatura lateral interior */}
        <mesh receiveShadow castShadow position={[-0.42, 0.35, 0]}>
          <meshPhysicalMaterial 
            color={secondaryColor} 
            roughness={0.5} 
            metalness={wireframe ? 0.8 : 0.05} 
            wireframe={wireframe}
          />
          <cylinderGeometry args={[0.4, 0.4, 2.7, 16, 1, false, Math.PI, Math.PI/2]} />
        </mesh>
        
        {/* Curvatura lateral exterior */}
        <mesh receiveShadow castShadow position={[0.42, 0.35, 0]}>
          <meshPhysicalMaterial 
            color={secondaryColor} 
            roughness={0.5} 
            metalness={wireframe ? 0.8 : 0.05} 
            wireframe={wireframe}
          />
          <cylinderGeometry args={[0.4, 0.4, 2.7, 16, 1, false, Math.PI * 1.5, Math.PI/2]} />
        </mesh>
      </group>
      
      {/* Talón reforzado con forma más ergonómica */}
      <mesh receiveShadow castShadow position={[0, 0.42, -1.25]}>
        <meshPhysicalMaterial 
          color={secondaryColor} 
          roughness={0.5} 
          metalness={0.1} 
          wireframe={wireframe}
          clearcoat={0.4}
        />
        <boxGeometry args={[0.9, 0.75, 0.55]} />
      </mesh>
      
      {/* Refuerzo del talón (elemento circular) */}
      <mesh receiveShadow castShadow position={[0, 0.45, -1.47]} rotation={[0, 0, 0]}>
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.4} 
          metalness={0.1} 
          wireframe={wireframe}
        />
        <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
      </mesh>
      
      {/* Punta con mejor forma */}
      <mesh receiveShadow castShadow position={[0, 0.27, 1.4]}>
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.4} 
          metalness={0.1} 
          wireframe={wireframe}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
        <sphereGeometry args={[0.45, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      
      {/* Refuerzo de la punta (parte superior) */}
      <mesh receiveShadow castShadow position={[0, 0.35, 1.2]} rotation={[-Math.PI/4, 0, 0]}>
        <meshPhysicalMaterial 
          color={secondaryColor} 
          roughness={0.5} 
          metalness={0.05} 
          wireframe={wireframe}
        />
        <planeGeometry args={[0.85, 0.4]} />
      </mesh>
      
      {/* Lengüeta mejorada */}
      <group position={[0, 0.05, 0.4]} rotation={[-0.4, 0, 0]}>
        <mesh receiveShadow castShadow position={[0, 0.5, 0]}>
          <meshPhysicalMaterial 
            color={secondaryColor} 
            roughness={0.6} 
            metalness={0.05} 
            wireframe={wireframe}
          />
          <boxGeometry args={[0.75, 0.1, 0.9]} />
        </mesh>
        
        <mesh receiveShadow castShadow position={[0, 0.55, -0.2]}>
          <meshPhysicalMaterial 
            color={color} 
            roughness={0.5} 
            metalness={0.05} 
            wireframe={wireframe}
          />
          <boxGeometry args={[0.7, 0.05, 0.4]} />
        </mesh>
      </group>
      
      {/* Sistema de cordones mejorado */}
      {/* Agujeros para cordones (izquierda) */}
      {[-0.7, -0.4, -0.1, 0.2, 0.5].map((z, i) => (
        <mesh key={`hole-left-${i}`} position={[-0.3, 0.55, z]}>
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.4} />
          <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} />
        </mesh>
      ))}
      
      {/* Agujeros para cordones (derecha) */}
      {[-0.7, -0.4, -0.1, 0.2, 0.5].map((z, i) => (
        <mesh key={`hole-right-${i}`} position={[0.3, 0.55, z]}>
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.4} />
          <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} />
        </mesh>
      ))}      {/* Sistema de cordones mejorado con zigzag */}
      {[
        [-0.3, 0.55, -0.7, 0.3, 0.55, -0.7],
        [0.3, 0.55, -0.4, -0.3, 0.55, -0.1],
        [-0.3, 0.55, 0.2, 0.3, 0.55, 0.5],
        [0.3, 0.55, 0.2, -0.3, 0.55, 0.5]
      ].map(([x1, y1, z1, x2, y2, z2], i) => (
        <group key={`lace-${i}`}>
          <mesh>
            <meshStandardMaterial color="#f5f5f5" roughness={0.6} />
            <cylinderGeometry 
              args={[0.015, 0.015, Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2) + Math.pow(z2-z1, 2)), 8]} 
            />
            <group position={[x1, y1, z1]} lookAt={[x2, y2, z2]}>
              <mesh position={[0, 0, Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2) + Math.pow(z2-z1, 2))/2]}>
                <cylinderGeometry 
                  args={[0.015, 0.015, Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2) + Math.pow(z2-z1, 2)), 8]} 
                />
              </mesh>
            </group>
          </mesh>
        </group>
      ))}
      
      {/* Nudos de cordones en la parte superior */}
      <mesh position={[0, 0.57, 0.65]}>
        <meshStandardMaterial color="#e8e8e8" roughness={0.7} />
        <sphereGeometry args={[0.05, 8, 8]} />
      </mesh>
      
      {/* Logo circular mejorado */}
      <group position={[0.46, 0.45, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Fondo del logo */}
        <mesh receiveShadow castShadow>
          <meshPhysicalMaterial 
            color="#f8f8f8" 
            metalness={0.2} 
            roughness={0.2} 
            clearcoat={0.5}
            clearcoatRoughness={0.2}
          />
          <circleGeometry args={[0.15, 32]} />
        </mesh>
        
        {/* Logo "V" en el círculo */}
        <mesh position={[0, 0, 0.001]}>
          <meshStandardMaterial 
            color={color === "#FF6B35" ? "#FF3B15" : color} 
            metalness={0.4} 
            roughness={0.2} 
            emissive={color === "#FF6B35" ? "#FF3B15" : color}
            emissiveIntensity={0.3}
          />
          <torusGeometry args={[0.08, 0.02, 16, 16, Math.PI]} />
        </mesh>
        
        {/* Línea diagonal para completar la V */}
        <mesh position={[0, 0, 0.001]} rotation={[0, 0, Math.PI/4]}>
          <meshStandardMaterial 
            color={color === "#FF6B35" ? "#FF3B15" : color} 
            metalness={0.4} 
            roughness={0.2}
            emissive={color === "#FF6B35" ? "#FF3B15" : color}
            emissiveIntensity={0.3}
          />
          <boxGeometry args={[0.16, 0.02, 0.01]} />
        </mesh>
      </group>
      
      {/* Detalles decorativos - Líneas de diseño */}
      <group position={[-0.46, 0.45, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <meshStandardMaterial 
            color="#ffffff"
            roughness={0.4} 
            metalness={0.1} 
          />
          <planeGeometry args={[0.6, 0.02]} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <meshStandardMaterial 
            color="#ffffff"
            roughness={0.4} 
            metalness={0.1} 
          />
          <planeGeometry args={[0.4, 0.02]} />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <meshStandardMaterial 
            color="#ffffff"
            roughness={0.4} 
            metalness={0.1} 
          />
          <planeGeometry args={[0.4, 0.02]} />
        </mesh>
      </group>
      
      {/* Texto personalizado con efecto de relieve */}
      {customText && (
        <group 
          position={
            textPosition === 'side' ? [0.459, 0.3, -0.5] : 
            textPosition === 'back' ? [0, 0.5, -1.449] : 
            [0, 0.6, 0.4]
          } 
          rotation={
            textPosition === 'side' ? [0, -Math.PI / 2, 0] : 
            textPosition === 'back' ? [0, Math.PI, 0] : 
            [-0.3, 0, 0]
          }
        >
          <mesh>
            <meshStandardMaterial 
              color="#ffffff"
              roughness={0.4} 
              metalness={0.2} 
              emissive="#ffffff"
              emissiveIntensity={0.2}
            />
            <planeGeometry args={[0.5, 0.15]} />
          </mesh>
          <mesh position={[0, 0, 0.001]}>
            <meshStandardMaterial 
              color={color === "#FFFFFF" ? "#000000" : color}
              metalness={0.3}
              roughness={0.3}
            />
            <planeGeometry args={[0.45, 0.1]} />
          </mesh>
        </group>
      )}
      
      {/* Detalles adicionales */}
      {/* Ventilación en los laterales */}
      {[-1, -0.5, 0, 0.5, 1].map((z, i) => (
        <group key={`vent-${i}`}>
          <mesh position={[-0.45, 0.3, z * 0.5]} rotation={[0, Math.PI / 2, 0]}>
            <meshStandardMaterial color="#222222" />
            <circleGeometry args={[0.03, 8]} />
          </mesh>
          <mesh position={[0.45, 0.3, z * 0.5]} rotation={[0, -Math.PI / 2, 0]}>
            <meshStandardMaterial color="#222222" />
            <circleGeometry args={[0.03, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Geometría básica de zapato definida directamente en el componente Shoe

export function ShoeViewer({ 
  color = "#FF6B35", 
  customText = "", 
  textPosition = "side" 
}) {
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar dispositivos móviles para optimizaciones
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  return (
    <div className="w-full h-full">
      <Canvas 
        shadows 
        dpr={[1, isMobile ? 1.5 : 2]} 
        camera={{ position: [1, 1, 5], fov: 42 }}
        gl={{ 
          antialias: true,
          preserveDrawingBuffer: true 
        }}
      >
        {/* Luces más suaves */}
        <ambientLight intensity={0.25} />
        
        <hemisphereLight 
          intensity={0.2} 
          color="#e1e5eb" 
          groundColor="#080808" 
        />
        
        <spotLight 
          position={[3, 4, 3]} 
          intensity={0.6} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
          angle={0.4}
          penumbra={0.7}
          decay={1.5}
        />
        
        <spotLight 
          position={[-4, 3, -2]} 
          intensity={0.25} 
          castShadow 
          color="#B0C4DE"
          angle={0.3}
          penumbra={0.5}
        />
        
        {/* Luz de relleno desde abajo para detalles */}
        <pointLight 
          position={[0, -2, 2]} 
          intensity={0.05} 
          distance={5} 
          decay={2}
        />
        
        {/* Modelo de zapatilla */}
        <Suspense fallback={null}>
          <Shoe 
            color={color} 
            customText={customText} 
            textPosition={textPosition as 'side' | 'back' | 'tongue'} 
          />
        </Suspense>
        
        {/* Controladores mejorados */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8} 
          minPolarAngle={Math.PI / 6}
          rotateSpeed={0.8}
          dampingFactor={0.1}
          enableDamping={true}
          autoRotate={false}
        />
          {/* Efectos visuales más sutiles */}
        <EffectComposer>
          <SMAA />
          <Bloom
            intensity={0.25}
            luminanceThreshold={0.65}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
        
        {/* Sombras y entorno mejorados */}
        <ContactShadows 
          position={[0, -0.235, 0]} 
          opacity={0.45} 
          scale={12} 
          blur={2.5} 
          far={1.2} 
          color="#202020"
          resolution={1024} 
        />
        
        {/* Entorno profesional de estudio */}
        <Environment 
          preset="studio" 
          resolution={256}
        />
        
        {/* Plataforma con superficie refinada */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial 
            color="#f2f2f2" 
            roughness={0.9}
            metalness={0.05}
            envMapIntensity={0.2}
          />
        </mesh>
      </Canvas>
      
      {/* Loader personalizado para mejor experiencia de usuario */}
      <Loader 
        containerStyles={{ background: 'rgba(244, 244, 244, 0.6)' }}
        innerStyles={{ background: '#ff6b35' }}
        barStyles={{ background: '#ff6b35' }}
        dataInterpolation={(p) => `Cargando modelo 3D... ${Math.round(p)}%`}
        dataStyles={{ color: '#222', fontSize: '0.9em' }}
      />
    </div>
  )
}
