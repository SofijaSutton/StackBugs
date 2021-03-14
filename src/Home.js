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
    //ADD Your 3D Models here
    addModels() {
        const geometry = new THREE.SphereGeometry(1, 30, 30, 0, Math.PI, 0) //, Math.PI /2 add to make cut in half
        const material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide})
        this.mesh = new THREE.Mesh(geometry, material)

        this.scene.add(this.mesh)

        //LOAD texture from Web and on completion apply it on SPHERE
        new THREE.TextureLoader().load(
            'https://images.unsplash.com/photo-1529256082460-40d68ec500da?ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODF8fHB1cnBsZSUyMGdyZWVuJTIwY29sb3J8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',

            texture => {
                //Update Texture
                this.mesh.material.map = texture
                this.mesh.material.needsUpdate = true
            },
            xhr => {
                //Download Progress
                console.log(xhr.loaded / xhr.total * 100 + '% loaded')
            },
            error => {
                //Error CallBack
                console.log('An error happened' + error)
            }
        )

        // -----Step 4--------
        //Loading 3d Models
        //Load Material First // not working MTL
        const mtlLoader = new MTLLoader();
        mtlLoader.setTexturePath("./3Dobj/");
        mtlLoader.load("./3Dobj/LadybugSample.mtl", materials => {
        materials.preload();
        console.log("Material loaded");

        //Load Object Now and Set Material
        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials);
        objLoader.load('./3Dobj/LadybugSample.obj', object => {
            this.backMesh = object
            this.backMesh.position.setY(3) //or  this
            this.backMesh.scale.set(0.02, 0.02, 0.02)
            this.scene.add(this.backMesh)
        })
        });
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