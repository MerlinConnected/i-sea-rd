import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

const Model = () => {
	const { nodes } = useGLTF('/landscape.glb')
	const texture = useTexture('/tex/sprite.png')

	return (
		<group dispose={null}>
			<points geometry={nodes.landscape.geometry}>
				<pointsMaterial color='#9fcdd8' size={0.002} sizeAttenuation={true} map={texture} transparent={true} />
			</points>
			{/* <mesh geometry={nodes.landscape.geometry}>
				<meshBasicMaterial color='#fff' wireframe={false} />
			</mesh> */}
		</group>
	)
}

const Scene = () => {
	return (
		<Canvas camera={{ position: [1.5, 1.5, 1.5] }}>
			<Model />
			<OrbitControls />
		</Canvas>
	)
}

export default Scene
