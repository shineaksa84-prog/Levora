class ToastService {
    listeners = [];

    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    show(message, type = 'info', duration = 3000) {
        this.listeners.forEach(listen => listen(message, type, duration));
    }

    success(message) { this.show(message, 'success'); }
    error(message) { this.show(message, 'error'); }
    info(message) { this.show(message, 'info'); }
    warning(message) { this.show(message, 'warning'); }
}

export const toast = new ToastService();
export default toast;
