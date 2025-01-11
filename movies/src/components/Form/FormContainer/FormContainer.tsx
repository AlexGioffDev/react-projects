type Props = {
  children: JSX.Element | JSX.Element[];
};

export const FormContainer = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center mx-auto w-[90vw] md:w-[50%] border rounded-2xl  p-8 gap-y-4 z-30 bg-white/20 backdrop-blur-md border-slate-50/2 ">
      {children}
    </div>
  );
};
