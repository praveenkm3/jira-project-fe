export function initials(name: string) {
  return name.trim().charAt(0).toUpperCase();
}
export function toTitleCase(s: string): string {
    if (s.length <= 1) {
      return s;
    }
    return s[0].toUpperCase() + s.slice(1);
  }