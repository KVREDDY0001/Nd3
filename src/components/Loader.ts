export class Loader {
    private loadingScreen: HTMLElement;
    private progressFill: HTMLElement;
    private loadingPercentage: HTMLElement;
    private progress: number = 0;
    private targetProgress: number = 0;
    private onComplete?: () => void;

    constructor(onComplete?: () => void) {
        this.loadingScreen = document.getElementById('loading')!;
        this.progressFill = document.getElementById('progress-fill')!;
        this.loadingPercentage = document.getElementById('loading-percentage')!;
        this.onComplete = onComplete;
    }

    public start(): void {
        this.simulateLoading();
    }

    private simulateLoading(): void {
        const interval = setInterval(() => {
            // Random increment
            const increment = Math.random() * 15 + 5;
            this.targetProgress = Math.min(this.targetProgress + increment, 100);

            // Smooth animation
            this.animate();

            if (this.targetProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.complete();
                }, 500);
            }
        }, 200);
    }

    private animate(): void {
        // Smooth lerp to target progress
        this.progress += (this.targetProgress - this.progress) * 0.1;

        // Update UI
        this.progressFill.style.width = `${this.progress}%`;
        this.loadingPercentage.textContent = Math.floor(this.progress).toString();

        if (Math.abs(this.targetProgress - this.progress) > 0.5) {
            requestAnimationFrame(() => this.animate());
        }
    }

    private complete(): void {
        this.loadingScreen.classList.add('hidden');
        
        if (this.onComplete) {
            this.onComplete();
        }
    }

    public setProgress(value: number): void {
        this.targetProgress = Math.max(0, Math.min(100, value));
        this.animate();
    }

    public hide(): void {
        this.loadingScreen.classList.add('hidden');
    }

    public show(): void {
        this.loadingScreen.classList.remove('hidden');
    }
}