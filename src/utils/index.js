export const cn = (...classes) => [...classes].filter(Boolean).join(' ');
export const generateUniqueId = () => Math.random().toString(36).substr(2, 9);
