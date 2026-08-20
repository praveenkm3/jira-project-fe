import type { registerType } from "./auth.types";

export interface MemberType {
  name: string;
  email: string;
  password: string;
  role: {
    role_name:string,
    role_id?:string
  };
  id?:string
}

export interface ProjectMemberType {
  project_members_id: string;
  user: MemberType;
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
export type ProjectSearchType={
    project_id:string,
    project_name:string
}