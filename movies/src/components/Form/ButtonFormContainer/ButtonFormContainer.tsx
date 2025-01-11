type Props = {
  children: JSX.Element | JSX.Element[] | string;
  type: "submit" | "reset" | "button";
};

export const ButtonFormContainer = ({ children, type }: Props) => {
  return (
    <button
      className="bg-slate-200 py-1 px-4 rounded-2xl border border-transparent hover:border-slate-200 hover:bg-slate-900 hover:text-slate-200 transition-all duration-300 ease-in"
      type={type}
    >
      {children}
    </button>
  );
};
