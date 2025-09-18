const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-muted rounded-full animate-spin-slow">
          <div className="absolute top-0 left-0 w-4 h-4 bg-gradient-primary rounded-full animate-pulse-glow"></div>
        </div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Loading Users</h3>
        <p className="text-muted-foreground">Please wait while we fetch the user data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;