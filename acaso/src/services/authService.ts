import axios from "axios";

// URL base da sua API
const BASE_URL = "https://api.staging.aca.so";

// Função para cadastrar um usuário
export async function signupUser(firstName, lastName, email, password) {  
  try {
    const response = await axios.post(`${BASE_URL}/auth/sign-up`, {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    });

    if (response.status === 200) {
      return response.data; // Ou outra ação de sucesso
    } else {
      throw new Error("Erro durante o cadastro");
    }
  } catch (error) {
    throw new Error("Erro na chamada da API: " + error.message);
  }
}

// Função para confirmar o email
export async function confirmEmail(confirmationCode, email) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/confirm-sign-up`, {
      confirmation_code: confirmationCode,
      email
    });

    if (response.status === 200) {
      return true; // O email foi confirmado com sucesso
    } else {
      throw new Error("Erro ao confirmar o email");
    }
  } catch (error) {
    throw new Error("Erro na chamada da API: " + error.message);
  }
}

// Função para reenviar o código de confirmação
export async function resendConfirmationCode(email) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/resend-confirmation-code`, {
      email,
    });

    if (response.status === 200) {
      return true; // O código foi reenviado com sucesso
    } else {
      throw new Error("Erro ao reenviar o código de confirmação");
    }
  } catch (error) {
    throw new Error("Erro na chamada da API: " + error.message);
  }
}
