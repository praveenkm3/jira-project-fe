import { bubble_sort } from "./bubble_sort";
import type { ProjectSearchType } from "../utils/project.types";

export const sort_projects = (projects: ProjectSearchType[]) => {
  return bubble_sort(projects, (a, b) => {
    const s1:string = a.project_name.toLowerCase();
    const s2:string = b.project_name.toLowerCase();
    return s1.localeCompare(s2);
  });
};
export const binary_search = (
  target: string,
  array: ProjectSearchType[]
) => {
  if (!target || array.length === 0) {
    return -1;
  }

  const prefix = target.toLowerCase();

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = array[mid].project_name.toLowerCase();

    if (value.startsWith(prefix)) {
      return mid;
    }

    if (value < prefix) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};
export const find_prefix_matches = (
  target: string,
  projects: ProjectSearchType[],
) => {
    if (!target || projects.length === 0) {
        return [];
    }
    const result=sort_projects(projects);


  const prefix = target.toLowerCase();
  const index = binary_search(prefix, result);

  if (index === -1) {
    return [];
  }

  let left = index;
  let right = index;

  while (
    left > 0 &&
    result[left - 1].project_name.toLowerCase().startsWith(prefix)
  ) {
    left--;
  }

  while (
    right < result.length - 1 &&
    result[right + 1].project_name.toLowerCase().startsWith(prefix)
  ) {
    right++;
  }

  return result.slice(left, right + 1);
};
