const Layout = ({ children, title }) => {
  return (
    <div className="h-screen bg-sky-900 flex justify-center items-center">
      <div className="bg-white w-1/2 rounded-md">
        <div className="bg-gray-100 shadow-lg  p-6">{title}</div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
