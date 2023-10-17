import React, { useState } from "react";
import InputField from "../components/InputField";
import { signupUser } from "../services/authService"; // Importe o serviço
import { useNavigate } from 'react-router-dom';




const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      
      const response = await signupUser(firstName, lastName, email, password);
      setError("");
      // Faça o redirecionamento para a página de confirmação após o sucesso
      navigate(`/confirmation-email?email=${email}`);
    } catch (error) {
      // Lida com erros da API e exibe uma mensagem de erro ao usuário
      setError("Erro durante o cadastro: " + error.message);
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

      <div className="w-full max-w-md p-4">
        <div className="justify-center p-4 flex  mb-10">
          <img src="src/assets/acaso.png" alt="Imagem" />
        </div>
        <h2 className="text-5xl mb-24 fs-10">Cadastro</h2>
        <form onSubmit={handleSignup}>
          <div className="flex flex-row mb-4">
            <div className="w-1/2 pr-2">
              <InputField
                label="Nome"
                type="text"
                placeholder="Primeiro nome"
                value={firstName}
                onChange={setFirstName}
              />
            </div>
            <div className="w-1/2 pl-2">
              <InputField
                label="Sobrenome"
                type="text"
                placeholder="Último nome"
                value={lastName}
                onChange={setLastName}
              />
            </div>
          </div>
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
          <InputField
            label="Confirme a Senha"
            type="password"
            placeholder="******"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          <button
            type="submit"
            className="bg-white mt-16 text-black  rounded-full"
          >
            <span className="p-4">Criar minha conta aca.so</span>
          </button>
          <button
            type="button"
            className="bg-black bg-transparentx mt-6 text-white  rounded-full"
          >
            <span className="p-14 text-sm">Voltar ao login</span>
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
