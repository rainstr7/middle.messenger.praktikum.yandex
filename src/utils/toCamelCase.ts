export default <T>(s: T): T => (s as string).replace(/[_,-]./g, x => x[1].toUpperCase()) as T;
