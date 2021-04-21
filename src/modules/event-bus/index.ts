interface IEventBus {
    on(event: string, callback: () => void): void;

    off(event: string, callback: () => void): void;

    emit(event: string, ...args: any[]): void;
}

export default class EventBus implements IEventBus {
    private listeners = {};

    on(event: string, callback: () => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: () => void): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: any[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}
