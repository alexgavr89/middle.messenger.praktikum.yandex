export default function validator(type: string | undefined, value: string): boolean {
    if (type === 'email') {
        return isEmail(value);
    }

    if (type === 'filled') {
        return isFilled(value);
    }

    if (type === 'password') {
        return isPassword(value);
    }

    return true;
}

function isEmail(value: string): boolean {
    return !value.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i);
}

function isFilled(value: string): boolean {
    return value.length === 0;
}

function isPassword(value: string): boolean {
    return value.length < 6;
}
