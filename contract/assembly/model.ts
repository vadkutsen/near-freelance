import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Project {
    id: string;
    name: string;
    description: string;
    price: u128;
    owner: string;
    assignee: string;
    completed: boolean;
    result: string;
    paid: boolean;
    public static fromPayload(payload: Project): Project {
        const project = new Project();
        project.id = payload.id;
        project.name = payload.name;
        project.description = payload.description;
        project.price = payload.price;
        project.owner = context.sender;
        project.paid = false;
        return project;
    }

    public addAssignee(): void {
        this.assignee = context.sender;
    }

    public updatePaidState(): void {
        this.paid = true;
    }

    public complete(result: string): void {
        this.completed = true;
        this.result = result;
    }
}

export const listedProjects = new PersistentUnorderedMap<string, Project>("LISTED_PROJECTS");