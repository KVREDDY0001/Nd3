import * as THREE from 'three';

export class ThemeToggle {
    private toggleButton: HTMLElement;
    private body: HTMLElement;
    private currentTheme: 'dark' | 'light';
    private scene?: THREE.Scene;

    constructor(scene?: THREE.Scene) {
        this.toggleButton = document.getElementById('theme-toggle')!;
        this.body = document.body;
        this.scene = scene;
        
        // Load saved theme
        this.currentTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
        
        this.init();
    }

    private init(): void {
        // Apply saved theme
        this.applyTheme(this.currentTheme, false);

        // Toggle button click
        this.toggleButton.addEventListener('click', () => {
            this.toggle();
        });

        // Keyboard shortcut (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    private toggle(): void {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme, true);
    }

    private applyTheme(theme: 'dark' | 'light', animate: boolean): void {
        // Update body attribute
        this.body.setAttribute('data-theme', theme);
        
        // Save to localStorage
        localStorage.setItem('theme', theme);

        // Update Three.js scene background if provided
        if (this.scene) {
            const color = theme === 'dark' ? 0x000000 : 0xF5F5F5;
            
            if (animate) {
                this.animateColorChange(this.scene.background as THREE.Color, new THREE.Color(color));
            } else {
                this.scene.background = new THREE.Color(color);
            }
        }

        // Add transition effect
        if (animate) {
            this.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
            setTimeout(() => {
                this.body.style.transition = '';
            }, 500);
        }
    }

    private animateColorChange(currentColor: THREE.Color, targetColor: THREE.Color): void {
        const duration = 500; // ms
        const startTime = Date.now();
        const startColor = currentColor.clone();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Lerp between colors
            currentColor.lerpColors(startColor, targetColor, progress);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    public setTheme(theme: 'dark' | 'light'): void {
        this.currentTheme = theme;
        this.applyTheme(theme, true);
    }

    public getTheme(): 'dark' | 'light' {
        return this.currentTheme;
    }
}