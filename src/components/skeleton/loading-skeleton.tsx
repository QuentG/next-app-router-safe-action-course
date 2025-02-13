import React, { memo } from "react";

const LoadingSkeleton = memo(() => (
    <div className="w-full max-w-sm rounded-lg border p-4 shadow">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-full bg-gray-200 rounded" />
        
        <div className="h-36 w-full bg-gray-200 rounded" />
                
        <div className="space-y-2">
          <div className="h-4 w-1/5 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
);

export default LoadingSkeleton;