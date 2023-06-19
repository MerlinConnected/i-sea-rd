import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'

// const Model = () => {
// 	const points = useRef()
// 	const { nodes } = useGLTF('/landscape.glb')

// 	return (
// 		<group dispose={null}>
// 			<points ref={points}>
// 				<mesh castShadow receiveShadow geometry={nodes.landscape.geometry} />
// 				<pointsMaterial color='#9fcdd8' size={10} sizeAttenuation={false} />
// 			</points>
// 		</group>
// 	)
// }

function Model() {
	const { nodes } = useGLTF('/landscape.glb')
	return <mesh geometry={nodes.landscape.geometry} />
}

useGLTF.preload('/landscape.glb')

const BasicParticles = () => {
	const points = useRef()

	return (
		<points ref={points}>
			<Model />
			<boxGeometry />
			<pointsMaterial color='#9fcdd8' size={10} sizeAttenuation={false} />
		</points>
	)
}

const Test = () => {
	console.log(<Model />)
	console.log(<boxGeometry />)
}

const Scene = () => {
	return (
		<Canvas camera={{ position: [1.5, 1.5, 1.5] }}>
			<BasicParticles />
			<OrbitControls />
			<Test />
		</Canvas>
	)
}

export default Scene
