export default (s: string): string => s.replace(/[_,-]./g, x => x[1].toUpperCase());
