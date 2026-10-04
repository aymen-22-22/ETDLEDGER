const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const u = (path: string) => base + path;

export const stripBase = (path: string) => (base && path.startsWith(base) ? path.slice(base.length) : path) || "/";
