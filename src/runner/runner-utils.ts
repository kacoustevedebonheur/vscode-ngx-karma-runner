
export function isWindows(): boolean {
        return process.platform.includes('win32');
}

export function  quote(s: string): string {
        const q = isWindows() ? '"' : `'`;
        return [q, s, q].join('');
}


export function normalizePath(path: string): string {
    return isWindows() ? path.replace(/\\/g, '/') : path;
  }
  
export function escapeRegExp(s: string): string {
    const escapedString = s.replace(/[.*+?^${}<>()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    return escapedString.replace(/\\\(\\\.\\\*\\\?\\\)/g, '(.*?)'); // should revert the escaping of match all regex patterns.
}
  
export function escapeRegExpForPath(s: string): string {
    return s.replace(/[*+?^${}<>()|[\]]/g, '\\$&'); // $& means the whole matched string
}