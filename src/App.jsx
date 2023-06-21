import { Sky, ScrollControls, Gltf, useScroll } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, N8AO } from '@react-three/postprocessing'
import { getProject, val } from '@theatre/core'
import { SheetProvider, PerspectiveCamera, useCurrentSheet } from '@theatre/r3f'

export default function App() {
	const sheet = getProject('Fly Through').sheet('Scene')

	return (
		<Canvas gl={{ preserveDrawingBuffer: true }}>
			<ScrollControls pages={5}>
				<SheetProvider sheet={sheet}>
					<Scene />
				</SheetProvider>
			</ScrollControls>
			<EffectComposer disableNormalPass multisampling={0}>
				<N8AO aoRadius={0.1} intensity={2} aoSamples={6} denoiseSamples={4} />
			</EffectComposer>
			<Sky />
		</Canvas>
	)
}

function Scene() {
	const sheet = useCurrentSheet()
	const scroll = useScroll()

	useFrame(() => {
		const sequenceLength = val(sheet.sequence.pointer.length)
		sheet.sequence.position = scroll.offset * sequenceLength
	})

	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[-5, 5, -5]} intensity={1.5} />
			<Gltf src='landscape.glb' castShadow receiveShadow />
			<PerspectiveCamera theatreKey='Camera' makeDefault position={[0, 0, 0]} fov={90} near={0.1} far={70} />
		</>
	)
}
