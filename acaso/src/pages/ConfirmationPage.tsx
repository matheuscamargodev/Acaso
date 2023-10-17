import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import { confirmEmail, resendConfirmationCode } from "../services/authService";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ConfirmationPage: React.FC = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(120);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const navigate = useNavigate();

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
      const response = await confirmEmail(confirmationCode, email);
      setError("");
      if (response) navigate(`/login?confirmation=success`);
    } catch (error) {
      setError("Erro durante a confirmação do email: " + error.message);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendConfirmationCode(email);
      setCountdown(120);
      setError("");
    } catch (error) {
      setError("Erro ao reenviar o código: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-4  mt-20">
        <div className="justify-center p-4 flex mb-10">
          <img src="src/assets/acaso.png" alt="Imagem" />
        </div>
        <h2 className="text-5xl mb-24 fs-10 mt-40">Confirmar E-mail</h2>
        <form onSubmit={handleConfirmEmail}>
          <InputField
            label="Código de Confirmação"
            type="text"
            placeholder="Digite o código recebido..."
            value={confirmationCode}
            onChange={setConfirmationCode}
          />
          <div className="inline-grid">
            <button
              type="submit"
              className="bg-white mt-8 text-black rounded-full"
            >
              <span className="p-4">Confirmar E-mail</span>
            </button>
            <p className="text-white mt-4">
              Não recebeu seu código?{" "}
              {countdown > 0 ? (
                `Reenviar em ${Math.floor(countdown / 60)}:${countdown % 60}`
              ) : (
                <div>
                  <button
                    onClick={handleResendCode}
                    className="bg-black bg-transparentx mt-6 text-white  rounded-full"
                  >
                    <span className="p-4">Reenviar Código</span>
                  </button>
                </div>
              )}
            </p>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ConfirmationPage;
