import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
  roles?: string[]; // allowed roles (optional)
}

export default function PrivateRoute({ children, roles }: PrivateRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // if not logged in
  if (!user) return <Navigate to="/signin" replace />;

  // if roles specified and user.role not allowed
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
