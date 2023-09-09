type props = { size: "sm" | "md" | "lg" };

const sizeVariants = {
  sm: "h-8 w-8 border-b-2 border-t-2",
  md: "h-16 w-16 border-b-4 border-t-4",
  lg: "h-24 w-24 border-b-4 border-t-4",
};

const LoadingAnimation = ({ size }: props) => {
  return (
    <div
      className={`${sizeVariants[size]} animate-spin rounded-full border-solid border-violet-500`}
    />
  );
};
export default LoadingAnimation;
