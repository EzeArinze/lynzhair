const LoadingSpinner = () => {
  return (
    <div className=" w-[80%] h-dvh mx-auto flex items-center justify-center">
      <div className=" ">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
