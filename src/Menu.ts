export class Menu {
    private hamburger: HTMLElement;
    private navOverlay: HTMLElement;
    private isOpen: boolean;

    constructor() {
        this.hamburger = document.getElementById('hamburger')!;
        this.navOverlay = document.getElementById('nav-overlay')!;
        this.isOpen = false;

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // Toggle menu
        this.hamburger.addEventListener('click', () => {
            this.toggle();
        });

        // Close on link click
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close if it's a parent menu item with submenu
                const parent = (e.target as HTMLElement).closest('.has-submenu');
                if (parent && !link.hasAttribute('data-section')) {
                    e.preventDefault();
                    // Toggle submenu visibility
                    const submenu = parent.querySelector('.submenu');
                    if (submenu) {
                        submenu.classList.toggle('active');
                    }
                } else {
                    this.close();
                }
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    private toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    private open(): void {
        this.isOpen = true;
        this.hamburger.classList.add('active');
        this.navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    private close(): void {
        this.isOpen = false;
        this.hamburger.classList.remove('active');
        this.navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}