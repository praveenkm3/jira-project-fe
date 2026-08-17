import dayjs from "dayjs";

export function initials(name: string) {
  return name.trim().charAt(0).toUpperCase();
}
export function toTitleCase(s: string): string {
    if (s.length <= 1) {
      return s;
    }
    return s[0].toUpperCase() + s.slice(1);
  }
export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 60%, 55%)`;
};
export const getCurrentHours = (date: string) => {
    const hrs = dayjs().diff(dayjs(date), "hour");
    if (hrs >= 24) {
      return `${dayjs().diff(dayjs(date), "days")} days`;
    }
    return `${hrs} hrs`;
  };