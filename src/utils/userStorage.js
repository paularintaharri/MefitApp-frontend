export const setUserStorage = (key, value) => {
    const json = JSON.stringify(value);
    const encrypted = btoa(json);
    localStorage.setItem(key, encrypted);
}

export const getUserStorage = (key) => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) {
        return false;
    }
    return JSON.parse(atob(storedValue));
}

export const cleareUserStorage = () => {
    localStorage.clear();
}