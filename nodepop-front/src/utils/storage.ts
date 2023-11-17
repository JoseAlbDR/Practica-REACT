export const storage = {
  get(key: string) {
    const value = localStorage.getItem(key);
    return value ? value : null;
  },

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};
