import * as THREE from 'three';

export class Spheres {
    public marbleSphere: THREE.Mesh;
    public concreteSphere: THREE.Mesh;
    private clock: THREE.Clock;
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;
    private camera: THREE.Camera;
    private canvas: HTMLCanvasElement;
    private sphereText: HTMLElement;
    private hoveredSphere: THREE.Mesh | null = null;

    constructor(scene: THREE.Scene, camera: THREE.Camera) {
        this.clock = new THREE.Clock();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.camera = camera;
        this.canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
        this.sphereText = document.getElementById('sphere-text')!;

        // Create Marble Sphere (Interior)
        this.marbleSphere = this.createMarbleSphere();
        this.marbleSphere.position.set(-2.5, 0, 0);
        this.marbleSphere.userData = { type: 'interior', text: 'INTERIOR' };
        scene.add(this.marbleSphere);

        // Create Concrete Sphere (Exterior)
        this.concreteSphere = this.createConcreteSphere();
        this.concreteSphere.position.set(2.5, 0, 0);
        this.concreteSphere.userData = { type: 'exterior', text: 'EXTERIOR' };
        scene.add(this.concreteSphere);

        // Setup interaction
        this.setupInteraction();
    }

    private createMarbleSphere(): THREE.Mesh {
        const geometry = new THREE.SphereGeometry(1.8, 64, 64);
        
        // Load marble texture
        const textureLoader = new THREE.TextureLoader();
        const marbleTexture = textureLoader.load('/textures/marble/marble.jpg', 
            () => console.log('Marble texture loaded'),
            undefined,
            () => {
                console.log('Marble texture failed, using procedural');
                // Fallback to procedural texture
            }
        );
        
        const material = new THREE.MeshStandardMaterial({
            color: 0xf5f5f5,
            roughness: 0.1,
            metalness: 0.1,
            map: marbleTexture || this.createMarbleTexture(),
            normalMap: this.createMarbleNormal(),
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

    private createConcreteSphere(): THREE.Mesh {
        const geometry = new THREE.SphereGeometry(1.8, 64, 64);
        
        const textureLoader = new THREE.TextureLoader();
        const concreteTexture = textureLoader.load('/textures/concrete/concrete.jpg',
            () => console.log('Concrete texture loaded'),
            undefined,
            () => {
                console.log('Concrete texture failed, using procedural');
            }
        );
        
        const material = new THREE.MeshStandardMaterial({
            color: 0x8c8c8c,
            roughness: 0.5,
            metalness: 0.9,
            map: concreteTexture || this.createConcreteTexture(),
            normalMap: this.createConcreteNormal(),
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

    private createMarbleTexture(): THREE.CanvasTexture {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d')!;

        // Base color
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, 1024, 1024);

        // Marble veins
        for (let i = 0; i < 50; i++) {
            ctx.strokeStyle = `rgba(${120 + Math.random() * 50}, ${120 + Math.random() * 50}, ${120 + Math.random() * 50}, ${0.3 + Math.random() * 0.3})`;
            ctx.lineWidth = 1 + Math.random() * 3;
            ctx.beginPath();
            ctx.moveTo(Math.random() * 1024, Math.random() * 1024);
            for (let j = 0; j < 5; j++) {
                ctx.quadraticCurveTo(
                    Math.random() * 1024, 
                    Math.random() * 1024,
                    Math.random() * 1024, 
                    Math.random() * 1024
                );
            }
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    private createConcreteTexture(): THREE.CanvasTexture {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d')!;

        ctx.fillStyle = '#7a7a7a';
        ctx.fillRect(0, 0, 1024, 1024);

        const imageData = ctx.getImageData(0, 0, 1024, 1024);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 50 - 25;
            data[i] += noise;
            data[i + 1] += noise;
            data[i + 2] += noise;
        }

        ctx.putImageData(imageData, 0, 0);

        for (let i = 0; i < 30; i++) {
            ctx.strokeStyle = `rgba(60, 60, 60, ${0.2 + Math.random() * 0.3})`;
            ctx.lineWidth = 1 + Math.random() * 2;
            ctx.beginPath();
            ctx.moveTo(Math.random() * 1024, Math.random() * 1024);
            ctx.lineTo(Math.random() * 1024, Math.random() * 1024);
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    private createMarbleNormal(): THREE.CanvasTexture {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#8080ff';
        ctx.fillRect(0, 0, 512, 512);
        return new THREE.CanvasTexture(canvas);
    }

    private createConcreteNormal(): THREE.CanvasTexture {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#8080ff';
        ctx.fillRect(0, 0, 512, 512);
        return new THREE.CanvasTexture(canvas);
    }

    private setupInteraction(): void {
        // Mouse move for hover detection
        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects([this.marbleSphere, this.concreteSphere]);

            if (intersects.length > 0) {
                const object = intersects[0].object as THREE.Mesh;
                if (this.hoveredSphere !== object) {
                    this.hoveredSphere = object;
                    this.showSphereText(object.userData.text);
                    this.canvas.style.cursor = 'pointer';
                }
            } else {
                if (this.hoveredSphere) {
                    this.hoveredSphere = null;
                    this.hideSphereText();
                    this.canvas.style.cursor = 'default';
                }
            }
        });

        // Click to navigate
        this.canvas.addEventListener('click', () => {
            if (this.hoveredSphere) {
                const type = this.hoveredSphere.userData.type;
                const section = document.getElementById(type);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    private showSphereText(text: string): void {
        this.sphereText.textContent = text;
        this.sphereText.classList.add('show');
    }

    private hideSphereText(): void {
        this.sphereText.classList.remove('show');
    }

    public animate(): void {
        const elapsedTime = this.clock.getElapsedTime();

        // Floating animation (marble - slower)
        this.marbleSphere.position.y = Math.sin(elapsedTime * 0.5) * 0.3;
        this.marbleSphere.rotation.y += 0.001;
        this.marbleSphere.rotation.x += 0.0005;

        // Floating animation (concrete - slightly faster)
        this.concreteSphere.position.y = Math.sin(elapsedTime * 0.6 + Math.PI) * 0.35;
        this.concreteSphere.rotation.y += 0.0015;
        this.concreteSphere.rotation.x += 0.0008;

        // Hover effect - scale up slightly
        if (this.hoveredSphere === this.marbleSphere) {
            this.marbleSphere.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
            this.concreteSphere.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        } else if (this.hoveredSphere === this.concreteSphere) {
            this.concreteSphere.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
            this.marbleSphere.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        } else {
            this.marbleSphere.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            this.concreteSphere.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
    }
}