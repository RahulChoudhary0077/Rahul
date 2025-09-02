
import React from 'react';
import { type Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onSelectTool: (tool: Tool) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelectTool }) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
      onClick={() => onSelectTool(tool)}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-md ${tool.bgColor} ${tool.color}`}>
          {tool.icon}
        </div>
        <h3 className="text-lg font-bold text-brand-dark">{tool.name}</h3>
      </div>
      <p className="mt-4 text-gray-500 text-sm">
        {tool.description}
      </p>
    </div>
  );
};

export default ToolCard;
