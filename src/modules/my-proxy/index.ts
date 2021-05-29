const MyProxy = Proxy;

export default function makeProxyProps<T>(target: T): ProxyHandler<T> {
    return new MyProxy(target, {
        get(target, prop) {
            const value = target[prop];
            return (typeof value === 'function') ? value.bind(target) : value;
        },
        set(target, prop, value) {
            target[prop] = value;
            return true;
        },
        deleteProperty(target, prop) {
            delete target[prop];
            return true;
        }
    });
}
