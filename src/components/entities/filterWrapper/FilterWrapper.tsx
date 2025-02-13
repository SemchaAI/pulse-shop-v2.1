'use client';
import { type ReactNode, useRef, useState } from 'react';
import { ChevronDown, LoaderCircle } from 'lucide-react';

interface FilterWrapperProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  isLoading?: boolean;
}

export const FilterWrapper = ({
  title,
  children,
  defaultExpanded = false,
  isLoading = false,
}: FilterWrapperProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b pb-5 mb-5">
      <div className="flex justify-between items-center">
        <p className="font-bold typo-body-16">{title}</p>
        {isLoading ? (
          <LoaderCircle
            size={24}
            className="animate-spin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <ChevronDown
              size={24}
              className={`transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        )}
      </div>
      <div
        ref={contentRef}
        className={`transition-all duration-300 overflow-hidden h-0 ${
          isExpanded ? 'opacity-100 mt-5' : 'opacity-0'
        }`}
        style={
          isExpanded ? { height: `${contentRef.current?.scrollHeight}px` } : {}
        }
      >
        {children}
      </div>
    </div>
  );
};
