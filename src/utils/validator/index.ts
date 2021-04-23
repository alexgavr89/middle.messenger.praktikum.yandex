export default function isValid(type: string, value: string): boolean {
    if (type === 'email') {
        return isEmail(value);
    }

    if (type === 'filled') {
        return isFilled(value);
    }

    if (type === 'password') {
        return isPassword(value);
    }
}

function isEmail(value: string): boolean {
    return !!value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

function isFilled(value: string): boolean {
    return value.length > 0;
}

function isPassword(value: string): boolean {
    return value.length >= 6;
}
