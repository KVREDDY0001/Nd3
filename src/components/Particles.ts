export class Particles {
    private container: HTMLElement;
    private particleCount: number;

    constructor(containerId: string = 'particles-container', count: number = 50) {
        this.container = document.getElementById(containerId)!;
        this.particleCount = count;
        this.init();
    }

    private init(): void {
        // Clear existing particles
        this.container.innerHTML = '';

        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = 5 + Math.random() * 10;
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.5 + 0.1;

            // Apply styles
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = `rgba(135, 206, 235, ${opacity})`;
            particle.style.borderRadius = '50%';
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.animation = `floatParticle ${duration}s infinite ease-in-out`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.pointerEvents = 'none';

            this.container.appendChild(particle);
        }

        // Add animation keyframes if not exists
        this.addAnimationStyles();
    }

    private addAnimationStyles(): void {
        const styleId = 'particle-animation-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                @keyframes floatParticle {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.3;
                    }
                    25% {
                        transform: translate(20px, -30px) scale(1.2);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translate(-20px, -60px) scale(0.8);
                        opacity: 0.4;
                    }
                    75% {
                        transform: translate(30px, -30px) scale(1.1);
                        opacity: 0.5;
                    }
                }

                #particles-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    pointer-events: none;
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }
    }

    public destroy(): void {
        this.container.innerHTML = '';
    }

    public updateCount(count: number): void {
        this.particleCount = count;
        this.init();
    }
}