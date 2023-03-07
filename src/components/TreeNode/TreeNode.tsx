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
        <div>
            <div onClick={() => onExpand(employee.id)} onDoubleClick={() => onExpandDeep(employee)}>
                {hasChildren && (
                    <span>{isExpanded ? '▼' : '►'}</span>
                )}
                <span>{employee.title}</span>
            </div>

            {isExpanded && hasChildren && (
                <div>
                    {employee.children !== undefined &&  employee.children.map((child: Employee) => (
                        <TreeNode
                            key={child.id}
                            employee={child}
                            onExpand={onExpand}
                            onExpandDeep={onExpandDeep}
                            expandedNodes={expandedNodes}
                        />
                    ))}
                </div>
            )}
            {isExpanded && (
                <div onClick={() => console.log('add popup')}>
                    <span>+</span>
                </div>
            )}
        </div>
    );
};

export default TreeNode;