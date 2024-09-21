import { useState } from "react";
import Input from "../components/reusable/Input";
import "../styles/_loginPage.scss";
import { loginUser } from "../utils/api/api";
import { LoginCredentials } from "../utils/types/user";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuthenticated } = useAuth();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.preventDefault();
    const credentials: LoginCredentials = { username, password };
    await loginUser(credentials, setAuthenticated);
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleLogin}>
        <Input
          label="Username"
          id="username"
          type="text"
          className="login-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
    </div>
  );
}
