import React, {useState} from "react";
import {useAppSelector} from "../../app/hooks";
import TreeNode from "./TreeNode";
import {selectEmployees} from "../../slices/organizationTreeSlice";
import './Tree.scss';

const Tree: React.FC = () => {
    const employees = useAppSelector(selectEmployees);

    const [expandedNodes, setExpandedNodes] = useState<number[]>([]);


    // const dispatch = useAppDispatch();
    // const [incrementAmount, setIncrementAmount] = useState('2');
    //
    // const incrementValue = Number(incrementAmount) || 0;

    const handleNodeExpand = (nodeId: number) => {
        setExpandedNodes((prevExpandedNodes) => {
            if (prevExpandedNodes.includes(nodeId)) {
                return prevExpandedNodes.filter((id) => id !== nodeId);
            } else {
                return [...prevExpandedNodes, nodeId];
            }
        });
    };

    // TODO Make recursive
    const handleNodeExpandDeep = (employee: Employee) => {
        if (employee.children) {
            const childrenIds = employee.children.map((child) => child.id);
            setExpandedNodes((prevExpandedNodes) => {
                return [...prevExpandedNodes, ...childrenIds, employee.id];
            });
        }
    };

    const renderTree = (employees: Employee[]) => {
        return employees.map((employee) => (
            <TreeNode
                key={employee.id}
                employee={employee}
                onExpand={handleNodeExpand}
                onExpandDeep={handleNodeExpandDeep}
                expandedNodes={expandedNodes}
            />
        ));
    };

    return <div>
        <ul className="tree">{renderTree(employees)}</ul>
        </div>;
};

export default Tree;