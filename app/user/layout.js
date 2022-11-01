import { Suspense } from "react";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../contexts/AuthContext";
import "../global.css";
import Loading from "./loading";

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <Navbar />

      <Suspense fallback={<Loading />}>
        <div>{children}</div>
      </Suspense>
    </AuthProvider>
  );
}
