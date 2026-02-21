import { Scene } from './Scene';
import { Spheres } from './Spheres';
import { Menu } from './Menu';
import { Particles } from './components/Particles';
import { Cursor } from './components/Cursor';
import { Loader } from './components/Loader';
import { ThemeToggle } from './components/ThemeToggle';
import './style.css';

class App {
    private scene: Scene;
    private spheres: Spheres;
    private menu: Menu;
    private particles: Particles;
    private cursor: Cursor;
    private loader: Loader;
    private themeToggle: ThemeToggle;

    constructor() {
        // Initialize loader first
        this.loader = new Loader(() => {
            console.log('Loading complete!');
        });
        this.loader.start();

        // Get canvas
        const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;

        // Initialize Three.js components
        this.scene = new Scene(canvas);
        this.spheres = new Spheres(this.scene.scene, this.scene.camera);

        // Initialize UI components
        this.menu = new Menu();
        this.particles = new Particles('particles-container', 50);
        this.cursor = new Cursor();
        this.themeToggle = new ThemeToggle(this.scene.scene);

        // Initialize additional features
        this.initSmoothScroll();
        this.initScrollAnimations();
        this.initNewsletterForm();
        this.initProjectModal();

        // Start animation loop
        this.animate();
    }

    private initSmoothScroll(): void {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href')!);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    private initScrollAnimations(): void {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section, .project-card, .team-card, .service-card, .blog-card, .testimonial-card').forEach(el => {
            el.classList.add('fade-in-element');
            observer.observe(el);
        });

        const style = document.createElement('style');
        style.textContent = `
            .fade-in-element {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .fade-in-element.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    private initNewsletterForm(): void {
        const form = document.getElementById('newsletter-form') as HTMLFormElement;
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = form.querySelector('input') as HTMLInputElement;
                const email = input.value;
                
                // Simple email validation
                if (this.validateEmail(email)) {
                    alert(`Thank you for subscribing with ${email}!`);
                    input.value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            });
        }
    }

    private validateEmail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    private initProjectModal(): void {
        const modal = document.getElementById('project-modal')!;
        const modalClose = document.getElementById('modal-close')!;
        const viewProjectBtns = document.querySelectorAll('.view-project-btn');
        const modalImage = document.getElementById('modal-image') as HTMLImageElement;

        // Sample gallery images for Aish Farmhouse
        const aishGallery = [
            '/images/interior/aish-farmhouse/1.jpg',
            '/images/interior/aish-farmhouse/2.jpg',
            '/images/interior/aish-farmhouse/3.jpg',
            '/images/interior/aish-farmhouse/4.jpg'
        ];

        let currentImageIndex = 0;

        viewProjectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectCard = (e.target as HTMLElement).closest('.project-card');
                if (projectCard && projectCard.getAttribute('data-project') === 'aish-farmhouse') {
                    modal.classList.add('active');
                    currentImageIndex = 0;
                    modalImage.src = aishGallery[currentImageIndex];
                }
            });
        });

        // Gallery navigation
        const prevBtn = modal.querySelector('.gallery-prev');
        const nextBtn = modal.querySelector('.gallery-next');

        prevBtn?.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + aishGallery.length) % aishGallery.length;
            modalImage.src = aishGallery[currentImageIndex];
        });

        nextBtn?.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % aishGallery.length;
            modalImage.src = aishGallery[currentImageIndex];
        });

        // Close modal
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    prevBtn?.dispatchEvent(new Event('click'));
                } else if (e.key === 'ArrowRight') {
                    nextBtn?.dispatchEvent(new Event('click'));
                } else if (e.key === 'Escape') {
                    modalClose.dispatchEvent(new Event('click'));
                }
            }
        });
    }

    private animate = (): void => {
        requestAnimationFrame(this.animate);

        // Update spheres animation
        this.spheres.animate();

        // Update camera parallax
        this.scene.updateParallax();

        // Render scene
        this.scene.render();
    };
}

// Initialize app when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    new App();
});