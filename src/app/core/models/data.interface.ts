import { Employee } from "./employee";
import { Project } from './project';

export interface IAdminData {
    workload: Employee[];
    projects: Project[];
}

