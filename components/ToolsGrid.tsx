import React from 'react';
import { type Tool } from '../types';
import ToolCard from './ToolCard';

interface ToolsGridProps {
  tools: Tool[];
  onSelectTool: (tool: Tool) => void;
  title: React.ReactNode;
}

const ToolsGrid: React.FC<ToolsGridProps> = ({ tools, onSelectTool, title }) => {
  return (
    <div className="py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-brand-dark">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 stagger-in">
        {tools.map((tool, index) => (
          <div key={tool.id} style={{ '--stagger-delay': `${index * 50}ms` } as React.CSSProperties}>
            <ToolCard tool={tool} onSelectTool={onSelectTool} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsGrid;
