import "./global.css";
import { AuthProvider } from "./contexts/AuthContext.js";
import NavWrapper from "./components/NavWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Psy-App</title>
      </head>

      <body>{children}</body>
    </html>
  );
}
