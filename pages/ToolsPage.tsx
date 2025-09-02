import React from 'react';
import ToolsGrid from '../components/ToolsGrid';
import { TOOLS } from '../constants';
import { Tool } from '../types';

interface ToolsPageProps {
  onSelectTool: (tool: Tool) => void;
}

const ToolsPage: React.FC<ToolsPageProps> = ({ onSelectTool }) => {
  return (
    <div>
      <ToolsGrid
        title={<>All Our <span className="text-brand-green">PDF Tools</span></>}
        tools={TOOLS}
        onSelectTool={onSelectTool}
      />
    </div>
  );
};

export default ToolsPage;
