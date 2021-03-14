import React from 'react';
import * as THREE from 'three';
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

/**
 * COMPONENT
 */
class Home extends React.Component {
    componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        this.scene = new THREE.Scene()

        //Add Renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setClearColor('#ffffff')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)

        //add Camera
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        this.camera.position.z = 8
        this.camera.position.y = 5

        //LIGHTS
        var lights = []
        lights[0] = new THREE.PointLight(0x304ffe, 1, 0)
        lights[1] = new THREE.PointLight(0xffffff, 1, 0)
        lights[2] = new THREE.PointLight(0xffffff, 1, 0)
        lights[0].position.set(0, 200, 0)
        lights[1].position.set(100, 200, 100)
        lights[2].position.set(-100, -200, -100)
        this.scene.add(lights[0])
        this.scene.add(lights[1])
        this.scene.add(lights[2])

        this.addModels()
        this.renderScene()
        this.start()
    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    render() {
        return (
            <div
                style={{width: '800px', height: '800px'}}
                ref={mount => {
                    this.mount = mount
                }}
            >
                <h1>Welcome to StackBug!</h1>
            </div>
        )
    }
}

export default Home