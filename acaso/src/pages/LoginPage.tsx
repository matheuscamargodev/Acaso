import React, { useState } from "react";
import InputField from "../components/InputField";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);

      localStorage.setItem("user", JSON.stringify(response));

      window.location.reload();

      setError("");
    } catch (error) {
      setError("Erro durante o login: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#030446]">
      <img
        src="src/assets/ring.png"
        alt="Imagem"
        style={{
          position: "absolute",
          top: -10,
          width: 300,
          right: -10,
          margin: "10px",
        }}
      />
      <img
        className="absolute w-full backover"
        src="src/assets/gas.png"
        alt="Imagem"
      />
      <div className="w-full max-w-md p-4 backoverup">
        <div className="justify-center p-4 flex  mb-10">
          <img src="src/assets/acaso.png" alt="Imagem" />
        </div>
        <h2 className="text-5xl mb-24 fs-10">Login</h2>
        <form onSubmit={handleLogin}>
          <InputField
            label="E-mail"
            type="email"
            placeholder="Seu@email.com"
            value={email}
            onChange={setEmail}
          />
          <InputField
            label="Senha"
            type="password"
            placeholder="******"
            value={password}
            onChange={setPassword}
          />
          <div className="inline-grid">
            <button
              type="submit"
              className="bg-white mt-16 text-black  rounded-full"
            >
              <span className="p-4">Entrar</span>
            </button>
            <Link to="/signup">
              <button
                type="button"
                className="bg-black bg-transparentx mt-6 text-white  rounded-full"
              >
                <span className="p-4">Criar minha conta aca.so</span>
              </button>
            </Link>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
