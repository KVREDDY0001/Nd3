import * as THREE from 'three';

export class Scene {
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;
    private mouse: THREE.Vector2;
    private targetMouse: THREE.Vector2;

    constructor(canvas: HTMLCanvasElement) {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 8;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Mouse tracking
        this.mouse = new THREE.Vector2(0, 0);
        this.targetMouse = new THREE.Vector2(0, 0);

        // Lighting setup
        this.setupLights();

        // Event listeners
        this.setupEventListeners();
    }

    private setupLights(): void {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Main directional light
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(5, 5, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);

        // Rim light (Ice Blue)
        const rimLight = new THREE.DirectionalLight(0x87CEEB, 0.6);
        rimLight.position.set(-5, 3, -5);
        this.scene.add(rimLight);

        // Accent light (Orange)
        const accentLight = new THREE.DirectionalLight(0xFF8C00, 0.4);
        accentLight.position.set(-3, -2, 2);
        this.scene.add(accentLight);
    }

    private setupEventListeners(): void {
        // Mouse move for parallax
        window.addEventListener('mousemove', (event) => {
            this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    public updateParallax(): void {
        // Smooth lerp for mouse following
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        // Apply parallax to camera
        this.camera.position.x = this.mouse.x * 0.5;
        this.camera.position.y = this.mouse.y * 0.3;
        this.camera.lookAt(this.scene.position);
    }

    public render(): void {
        this.renderer.render(this.scene, this.camera);
    }
}