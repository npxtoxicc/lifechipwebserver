import React, { useState } from 'react';

interface SectionCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({ 
  title, 
  icon, 
  children,
  defaultExpanded = true
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <section className="section-card neumorphic bg-card p-5">
      <div 
        className="flex items-center justify-between mb-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="text-lg font-semibold flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <span className="material-icons text-primary">{icon}</span>
          </div>
          {title}
        </h2>
        <button className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
          <span className="material-icons text-muted-foreground">
            {expanded ? 'expand_more' : 'expand_less'}
          </span>
        </button>
      </div>
      
      {expanded && (
        <div className="pt-2">
          <div className="neumorphic-inset p-4 rounded-xl">
            {children}
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionCard;
