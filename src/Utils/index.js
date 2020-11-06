export const cx = (...classes) => [...classes].filter(Boolean).join(' ');
export const generateUniqueId = () => Math.random().toString(36).substr(2, 9);
