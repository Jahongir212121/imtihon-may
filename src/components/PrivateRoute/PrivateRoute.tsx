import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
