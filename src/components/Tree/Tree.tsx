import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import TreeNode from './TreeNode'
import { addEmployee, selectEmployees } from '../../slices/organizationTreeSlice'
import './Tree.scss'
import AddEmployeePopup from '../AddEmployeePopup/AddEmployeePopup'

const Tree: React.FC = () => {
  const employees = useAppSelector(selectEmployees)
  const dispatch = useAppDispatch()
  const [expandedNodes, setExpandedNodes] = useState<number[]>([])
  const [showPopup, setShowPopup] = useState(false)
  const [selectedParentId, setSelectedParentId] = useState<number | undefined>(undefined)

  const handleAddClick = (parentId: number): void => {
    setSelectedParentId(parentId)
    setShowPopup(true)
  }

  const handleNodeExpand = (nodeId: number): void => {
    setExpandedNodes((prevExpandedNodes) => {
      if (prevExpandedNodes.includes(nodeId)) {
        return prevExpandedNodes.filter((id) => id !== nodeId)
      } else {
        return [...prevExpandedNodes, nodeId]
      }
    })
  }

  // TODO Make recursive
  const handleNodeExpandDeep = (employee: Employee): void => {
    if (employee.children != null) {
      const childrenIds = employee.children.map((child) => child.id)
      setExpandedNodes((prevExpandedNodes) => {
        return [...prevExpandedNodes, ...childrenIds, employee.id]
      })
    }
  }

  const renderTree = (employees: Employee[]): JSX.Element[] => {
    return employees.map((employee) => (
            <TreeNode
                key={employee.id}
                employee={employee}
                onExpand={handleNodeExpand}
                onExpandDeep={handleNodeExpandDeep}
                expandedNodes={expandedNodes}
                handleAddClick={handleAddClick}
            />
    ))
  }

  return <div>
        <ul className="tree">{renderTree(employees)}</ul>
        {showPopup && (
            <AddEmployeePopup
                onClose={() => { setShowPopup(false) }}
                onAdd={(employee: Employee) => {
                  dispatch(addEmployee({ employee, parentId: selectedParentId }))
                }}
            />
        )}
    </div>
}

export default Tree
