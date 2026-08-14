import type{ registerType } from "./auth.types";

export interface ProjectMemberType {
  project_members_id: string;
  user: registerType;
}
export type ProjectStatus = "ACTIVE" | "COMPLETED";
export interface ProjectType {
  project_id: string;
  project_name: string;
  project_key: string;
  project_status: ProjectStatus;
  created_by: registerType;
  members: ProjectMemberType[];
}


export interface ProjectFormData {
  project_name: string;
  project_key: string;
  project_description: string;
  project_status: ProjectStatus
}