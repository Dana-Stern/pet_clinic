import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  title: string;
  StartIcon?: JSX.Element;
  onClick?: () => void;
  variant?: "outlined" | "filled";
};
const classesByVariant = {
  filled: "bg-violet-600 text-white hover:bg-violet-700",
  outlined:
    "border border-violet-400 text-violet-400 hover:border-violet-500 hover:text-violet-500",
};
const Button = ({
  StartIcon,
  onClick,
  title,
  variant = "filled",
  type = "button",
}: props) => {
  return (
    <button
      className={`${classesByVariant[variant]} flex items-center rounded-full px-4 py-2 font-bold`}
      onClick={onClick}
      type={type}
    >
      {StartIcon}
      {title}
    </button>
  );
};

export default Button;
