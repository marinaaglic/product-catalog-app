import Input from "../components/reusable/Input";
import "../styles/_loginPage.scss";

export default function LoginPage() {
  return (
    <div className="form-wrapper">
      <form>
        <Input label="Username" id="username" className="login-input" />
        <Input label="Password" id="password" className="login-input" />
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
    </div>
  );
}
