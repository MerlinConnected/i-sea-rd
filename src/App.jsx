import { OrbitControls, useGLTF, useTexture, Environment, Sky, BakeShadows, useHelper, Stage } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { EffectComposer, N8AO } from '@react-three/postprocessing'

const Model = () => {
	const ref = useRef()
	const { nodes } = useGLTF('/landscape.glb')
	const texture = useTexture('/tex/sprite.png')

	const [camActive, set] = useState(true)

	useFrame((state) => {
		state.camera.position.lerp({ x: camActive ? 0.25 : -0.35, y: camActive ? 0.1 : 0, z: camActive ? -0.15 : 0.45 }, 0.03)
		state.camera.lookAt(camActive ? 0.5 : -0.25, camActive ? -0.15 : 0.13, camActive ? 0.12 : -0.45)
	})

	return (
		<>
			<group dispose={null}>
				<points geometry={nodes.landscape.geometry}>
					<pointsMaterial color='#9fcdd8' size={0.002} sizeAttenuation={true} map={texture} transparent={true} />
				</points>
				<mesh castShadow receiveShadow ref={ref} geometry={nodes.landscape.geometry} position={[0, -0.0005, 0]} onClick={() => set(!camActive)}>
					<meshPhysicalMaterial color='white' wireframe={false} flatShading={true} castShadow receiveShadow />
				</mesh>
			</group>
		</>
	)
}

const Scene = () => {
	return (
		<>
			<Canvas shadows camera={{ position: [0, 0, 0], fov: 30, near: 0.01 }}>
				<Stage
					intensity={0.5}
					preset='rembrandt'
					shadows={{ type: 'accumulative', color: 'skyblue', colorBlend: 2, opacity: 1 }}
					environment='city'
					center={false}
				>
					<Model castShadow receiveShadow />
				</Stage>
				{/* <Tracker /> */}
				{/* <OrbitControls enableZoom={true} /> */}
				{/* <EffectComposer disableNormalPass multisampling={0}>
					<N8AO aoRadius={0.1} intensity={2} aoSamples={6} denoiseSamples={4} />
				</EffectComposer> */}
				<Sky />
			</Canvas>
		</>
	)
}

export default Scene
