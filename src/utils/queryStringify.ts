function queryStringify(data: unknown = {}) {
    if (!(data instanceof Object)) {
        return null;
    }
    const keys = Object.keys(data);
    if (keys.length === 0) {
        return '';
    }
    return keys.reduce((queryString, key, index, keys) => (
        `${queryString}${key}=${(data as any)[key]}${index < keys.length - 1 ? '&' : ''}`
    ), '?');
}

export default queryStringify;
