import { Outlet } from "react-router-dom";

const NoLayout = ({ children }) => {
  return (
    <main>{children}
          <Outlet />
    </main>
  );
};

export default NoLayout;
