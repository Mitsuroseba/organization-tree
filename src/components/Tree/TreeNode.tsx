import React, { useState } from 'react';
import {useAppDispatch} from "../../app/hooks";

const TreeNode: React.FC<TreeNodeProps> = ({
                                               employee,
                                               onExpand,
                                               onExpandDeep,
                                               expandedNodes,
                                           }) => {
    const hasChildren = employee.children && employee.children.length > 0;
    const isExpanded = expandedNodes.includes(employee.id);
    const dispatch = useAppDispatch();
    return (
        <li>
            <div onClick={() => onExpand(employee.id)} onDoubleClick={() => onExpandDeep(employee)}>
                {hasChildren && (
                    <span>{isExpanded ? '▼' : '►'}</span>
                )}
                {employee.title}
            </div>

            {isExpanded && hasChildren && (
                <ul>
                    {employee.children !== undefined &&  employee.children.map((child: Employee) => (
                        <TreeNode
                            key={child.id}
                            employee={child}
                            onExpand={onExpand}
                            onExpandDeep={onExpandDeep}
                            expandedNodes={expandedNodes}
                        />
                    ))}
                </ul>
            )}
            {isExpanded && (
                <div onClick={() => console.log('add popup')}>
                    <span>+</span>
                </div>
            )}
        </li>
    );
};

export default TreeNode;