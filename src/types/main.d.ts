
interface TreeNodeProps {
    employee: Employe;
    onExpand: (nodeId: number) => void;
    onExpandDeep: (employee: Employee) => void;
    expandedNodes: number[];
}
interface Employee {
    id: number;
    name: string;
    title: string;
    department?: string;
    phone?: string;
    email: string;
    children?: Employee[];
}
interface OrganizationTreeState {
    value: number;
    status: AppStatus;
    employees: Employee[];
}