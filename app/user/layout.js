import { AuthProvider } from "../contexts/AuthContext";
import "../global.css";

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <div>{children}</div>
    </AuthProvider>
  );
}
