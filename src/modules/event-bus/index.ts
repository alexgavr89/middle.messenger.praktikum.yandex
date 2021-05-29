interface IEventBus {
    on(event: string, callback: () => void): void;

    off(event: string, callback: () => void): void;

    emit<T>(event: string, ...args: T[]): void;
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

    emit<T>(event: string, ...args: T[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}
