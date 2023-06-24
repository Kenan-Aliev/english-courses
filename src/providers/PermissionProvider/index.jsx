import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ErrorComponent from "../../components/ErrorComponent";

const RequiredAuth = ({ children, roles }) => {
  const token = window.localStorage.getItem("token");
  const role = useSelector((s) => s.auth.user)?.role?.name;
  const userHasRequiredRole = roles.includes(role);

  if (token) {
    if (role && !userHasRequiredRole) {
      return <ErrorComponent type={403} />;
    } else if (!role && !userHasRequiredRole) {
      return <ErrorComponent type={403} />;
    }
    return children;
  }
  return <Navigate to="/login" />;
};
export default RequiredAuth;
