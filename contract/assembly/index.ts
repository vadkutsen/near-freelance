import { Project, listedProjects } from './model';
import { ContractPromiseBatch, context } from 'near-sdk-as';

export function setProject(project: Project): void {
    let storedProject = listedProjects.get(project.id);
    if (storedProject != null) {
        throw new Error(`A project with ${project.id} already exists.`);
    }
    listedProjects.set(project.id, Project.fromPayload(project));
}

export function getProject(id: string): Project | null {
    return listedProjects.get(id);
}

export function getProjects(): Project[] {
    return listedProjects.values();
}

export function applyForProject(projectId: string): void {
    const project = getProject(projectId);
    if (project == null) {
        throw new Error(`Project not found.`)
    }
    project.addAssignee();
    listedProjects.set(project.id, project);
}

export function completeProject(projectId: string, result: string): void {
    const project = getProject(projectId);
    if (project == null) {
        throw new Error(`Project not found.`)
    }
    if (project.assignee != context.sender) {
        throw new Error(`You are not the project assignee.`)
    }
    if (!result || result == '') {
        throw new Error(`Result is required.`)
    }
    project.complete(result);
    listedProjects.set(project.id, project);
}

export function payForProject(projectId: string): void {
    const project = getProject(projectId);
    if (project == null) {
        throw new Error(`Project not found.`)
    }
    if (project.price.toString() != context.attachedDeposit.toString()) {
        throw new Error("Attached deposit should equal to the project's price");
    }
    ContractPromiseBatch.create(project.assignee).transfer(context.attachedDeposit);
    project.updatePaidState();
    listedProjects.set(project.id, project);
}