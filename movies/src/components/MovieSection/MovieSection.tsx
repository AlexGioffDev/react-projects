type PropsPage = {
  title: string;
  children: JSX.Element[] | JSX.Element;
};

export const MovieSection = ({ title, children }: PropsPage) => {
  return (
    <>
      <h3 className="text-xl font-bold uppercase">{title}</h3>
      {children}
    </>
  );
};
