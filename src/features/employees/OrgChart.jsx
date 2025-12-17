import { useState } from 'react';
import { ChevronDown, ChevronRight, User, MapPin } from 'lucide-react';

const ORG_DATA = {
    id: 1, name: 'Robert Fox', role: 'CEO', img: 'RF', children: [
        {
            id: 2, name: 'Jane Cooper', role: 'VP of Engineering', img: 'JC', children: [
                {
                    id: 3, name: 'Bob Jones', role: 'Engineering Manager', img: 'BJ', children: [
                        { id: 4, name: 'Alice Smith', role: 'Senior Engineer', img: 'AS' },
                        { id: 5, name: 'John Doe', role: 'Frontend Dev', img: 'JD' },
                    ]
                },
                { id: 6, name: 'Sarah Lee', role: 'QA Lead', img: 'SL' }
            ]
        },
        {
            id: 7, name: 'Guy Hawkins', role: 'VP of Product', img: 'GH', children: [
                { id: 8, name: 'Diana Prince', role: 'Product Manager', img: 'DP' }
            ]
        }
    ]
};

const TreeNode = ({ node }) => {
    const [expanded, setExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="flex flex-col items-center">
            <div className={`p-4 rounded-xl border bg-white shadow-sm flex flex-col items-center min-w-[180px] relative z-10 transition-all hover:shadow-md hover:border-black/20 group`}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center font-bold text-indigo-700 mb-2 border-2 border-white shadow-sm">
                    {node.img}
                </div>
                <p className="font-bold text-gray-900 text-sm">{node.name}</p>
                <p className="text-xs text-muted-foreground font-medium">{node.role}</p>

                {hasChildren && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="absolute -bottom-3 w-6 h-6 bg-white border rounded-full flex items-center justify-center text-gray-500 hover:text-black shadow-sm z-20"
                    >
                        {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </button>
                )}
            </div>

            {hasChildren && expanded && (
                <>
                    <div className="w-px h-8 bg-gray-300"></div>
                    <div className="flex gap-8 relative">
                        {/* Connecting horizontal line */}
                        {node.children.length > 1 && (
                            <div className="absolute top-0 left-1/2 -ml-[calc(50%-1px)] w-[calc(100%-1px)] h-px bg-gray-300"></div>
                        )}

                        {node.children.map((child, index) => (
                            <div key={child.id} className="flex flex-col items-center relative">
                                {/* Vertical connector from parent line */}
                                <div className={`w-px h-8 bg-gray-300 -mt-8 ${index === 0 ? 'ml-[50%] w-[50%]' :
                                        index === node.children.length - 1 ? 'mr-[50%] w-[50%]' : ''
                                    }`}></div>

                                <TreeNode node={child} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default function OrgChart() {
    return (
        <div className="h-[calc(100vh-200px)] bg-gray-50/50 rounded-xl border border-border p-8 overflow-auto flex justify-center">
            <TreeNode node={ORG_DATA} />
        </div>
    );
}
