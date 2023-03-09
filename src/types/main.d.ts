
interface TreeNodeProps {
  employee: Employe
  onExpand: (nodeId: number) => void
  onExpandDeep: (employee: Employee) => void
  expandedNodes: number[]
  handleAddClick: (parentId: number) => void
}
interface Employee {
  id: number
  name: string
  title: string
  department?: string
  phone?: string
  email: string
  children?: Employee[]
}
interface AddEmployeePayload {
  employee: Employee
  parentId?: number
}

interface OrganizationTreeState {
  status: AppStatus
  employees: Employee[]
}

interface AddEmployeePopupProps {
  onAdd: (employee: Employee) => void
  onClose: () => void
}

interface AddEmployeeForm {
  name: string
  title: string
  department?: string
  phone?: string
  email: string
}
