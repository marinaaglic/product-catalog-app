import { useState } from "react";
import Input from "../components/reusable/Input";
import "../styles/_loginPage.scss";
import { loginUser } from "../utils/api/api";
import { LoginCredentials } from "../utils/types/user";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/reusable/Button";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuthenticated } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.preventDefault();
    const credentials: LoginCredentials = { username, password };
    try {
      await loginUser(credentials, setAuthenticated);
      alert("You have succefully logged in!");
      navigate("/");
    } catch (error) {
      alert("Username or password incorrect.");
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login form</h2>
        <Input
          label="Username:"
          id="username"
          type="text"
          className="login-input"
          onChange={(e) => setUsername(e.target.value)}
        />{" "}
        <Input
          label="Password:"
          id="password"
          type="password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="primary">
          Login
        </Button>
      </form>
    </div>
  );
}
