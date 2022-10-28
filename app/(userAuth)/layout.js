import Navbar from "../components/Navbar";
import { AuthProvider } from "../contexts/AuthContext";
import "../global.css";

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <Navbar />
      <div>{children}</div>
    </AuthProvider>
  );
}
