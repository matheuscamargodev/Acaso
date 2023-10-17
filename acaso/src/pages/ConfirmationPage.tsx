import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import { confirmEmail, resendConfirmationCode } from "../services/authService"; // Importe os serviços apropriados
import { useLocation } from "react-router-dom";

const ConfirmationPage: React.FC = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(120); // Inicialize o countdown com 2 minutos (em segundos)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  useEffect(() => {
    if (countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [countdown]);

  const handleConfirmEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await confirmEmail(confirmationCode, email); // Implemente a função confirmEmail no serviço

      // Lida com a resposta da confirmação do email, como redirecionar o usuário ou exibir uma mensagem de sucesso
      console.log("Email confirmado com sucesso: ", response);
      setError("");
    } catch (error) {
      // Lida com erros da API e exibe uma mensagem de erro ao usuário
      setError("Erro durante a confirmação do email: " + error.message);
    }
  };

  const handleResendCode = async () => {
    try {
      // Implemente a função para reenviar o código de confirmação no serviço
      await resendConfirmationCode(email);

      // Inicialize o countdown novamente
      setCountdown(120);
      setError("");
    } catch (error) {
      setError("Erro ao reenviar o código: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#030446]">
      <div className="w-full max-w-md p-4">
        <div className="justify-center p-4 flex mb-10">
          <img src="src/assets/acaso.png" alt="Imagem" />
        </div>
        <h2 className="text-5xl mb-24 fs-10">Confirmar E-mail</h2>
        <form onSubmit={handleConfirmEmail}>
          <InputField
            label="Código de Confirmação"
            type="text"
            placeholder="Digite o código recebido..."
            value={confirmationCode}
            onChange={setConfirmationCode}
          />
          <button
            type="submit"
            className="bg-white mt-8 text-black rounded-full"
          >
            <span className="p-4">Confirmar E-mail</span>
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <p className="text-white mt-4">
          Não recebeu seu código?{" "}
          {countdown > 0 ? (
            `Reenviar em ${Math.floor(countdown / 60)}:${countdown % 60}`
          ) : (
            <button
              onClick={handleResendCode}
              className="text-blue-500 underline cursor-pointer"
            >
              Reenviar Código
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
