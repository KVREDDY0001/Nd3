export class Cursor {
    private cursorDot: HTMLElement;
    private cursorOutline: HTMLElement;
    private currentX: number = 0;
    private currentY: number = 0;
    private targetX: number = 0;
    private targetY: number = 0;

    constructor() {
        this.cursorDot = this.createCursorElement('cursor-dot');
        this.cursorOutline = this.createCursorElement('cursor-outline');
        
        this.init();
    }

    private createCursorElement(className: string): HTMLElement {
        let element = document.querySelector(`.${className}`) as HTMLElement;
        
        if (!element) {
            element = document.createElement('div');
            element.className = className;
            document.body.appendChild(element);
        }

        return element;
    }

    private init(): void {
        // Add styles
        this.addStyles();

        // Mouse move event
        window.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
        });

        // Hover effects on interactive elements
        this.setupHoverEffects();

        // Start animation loop
        this.animate();
    }

    private addStyles(): void {
        const styleId = 'cursor-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .cursor-dot,
                .cursor-outline {
                    position: fixed;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                    border-radius: 50%;
                    z-index: 10000;
                    mix-blend-mode: difference;
                }

                .cursor-dot {
                    width: 8px;
                    height: 8px;
                    background: #87CEEB;
                    transform: translate(-50%, -50%);
                    transition: width 0.2s, height 0.2s, background 0.2s;
                }

                .cursor-outline {
                    width: 40px;
                    height: 40px;
                    border: 2px solid #87CEEB;
                    transform: translate(-50%, -50%);
                    transition: width 0.3s, height 0.3s, border-color 0.3s;
                }

                .cursor-dot.hover {
                    width: 16px;
                    height: 16px;
                    background: #FF8C00;
                }

                .cursor-outline.hover {
                    width: 60px;
                    height: 60px;
                    border-color: #FF8C00;
                }

                @media (hover: none) {
                    .cursor-dot,
                    .cursor-outline {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    private setupHoverEffects(): void {
        const interactiveElements = 'a, button, .project-card, .service-card, .team-card, .blog-card, input, textarea';
        
        const addHoverClass = () => {
            this.cursorDot.classList.add('hover');
            this.cursorOutline.classList.add('hover');
        };

        const removeHoverClass = () => {
            this.cursorDot.classList.remove('hover');
            this.cursorOutline.classList.remove('hover');
        };

        // Use event delegation for dynamically added elements
        document.addEventListener('mouseover', (e) => {
            const target = e.target as HTMLElement;
            if (target.matches(interactiveElements)) {
                addHoverClass();
            }
        });

        document.addEventListener('mouseout', (e) => {
            const target = e.target as HTMLElement;
            if (target.matches(interactiveElements)) {
                removeHoverClass();
            }
        });
    }

    private animate = (): void => {
        // Smooth lerp for cursor following
        this.currentX += (this.targetX - this.currentX) * 0.15;
        this.currentY += (this.targetY - this.currentY) * 0.15;

        // Update cursor dot (fast)
        this.cursorDot.style.left = `${this.targetX}px`;
        this.cursorDot.style.top = `${this.targetY}px`;

        // Update cursor outline (smooth lag)
        this.cursorOutline.style.left = `${this.currentX}px`;
        this.cursorOutline.style.top = `${this.currentY}px`;

        requestAnimationFrame(this.animate);
    };

    public destroy(): void {
        this.cursorDot.remove();
        this.cursorOutline.remove();
    }
}