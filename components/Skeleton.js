const LoadingSkeleton = () => (
  <div className="flex justify-center items-center w-full">
    <div className="w-full max-w-4xl p-6 space-y-6 bg-gray-300 dark:bg-gray-800 rounded-lg shadow-lg animate-pulse">
      {/* Header (Profile + Title) */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-400 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 bg-gray-400 dark:bg-gray-600 rounded-md"></div>
          <div className="h-3 w-1/3 bg-gray-400 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>

      {/* Image Placeholder */}
      <div className="w-full h-64 bg-gray-400 dark:bg-gray-700 rounded-lg"></div>

      {/* Title Placeholder */}
      <div className="h-6 w-2/3 bg-gray-400 dark:bg-gray-600 rounded-md"></div>

      {/* Subtitle Placeholder */}
      <div className="h-4 w-1/2 bg-gray-400 dark:bg-gray-600 rounded-md"></div>

      {/* Description Lines */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-400 dark:bg-gray-700 rounded-md"></div>
        <div className="h-3 w-5/6 bg-gray-400 dark:bg-gray-700 rounded-md"></div>
        <div className="h-3 w-4/6 bg-gray-400 dark:bg-gray-700 rounded-md"></div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <div className="h-10 w-28 bg-gray-400 dark:bg-gray-700 rounded-md"></div>
        <div className="h-10 w-28 bg-gray-400 dark:bg-gray-700 rounded-md"></div>
      </div>

      {/* Icons Placeholder */}
      <div className="flex space-x-6 pt-4">
        <div className="w-6 h-6 bg-gray-400 dark:bg-gray-700 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-400 dark:bg-gray-700 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-400 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  </div>
);

export default LoadingSkeleton;
