import axios from "axios";

const BASE_URL = "https://api.staging.aca.so";

export async function signupUser(firstName, lastName, email, password) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/sign-up`, {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Erro durante o cadastro");
    }
  } catch (error) {
    throw new Error("Erro na chamada da API: " + error.message);
  }
}

export async function confirmEmail(confirmationCode, email) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/confirm-sign-up`, {
      confirmation_code: confirmationCode,
      email,
    });

    if (response.status === 200) {
      return true;
    } else {
      throw new Error("Erro ao confirmar o email");
    }
  } catch (error) {
    throw new Error("Erro na chamada da API: " + error.message);
  }
}

export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      const refreshResponse = await axios.post(
        `${BASE_URL}/auth/refresh-token`,
        {
          refresh_token: response.data.token.refresh_token,
        },
        {
          headers: {
            Authorization: `Bearer ${response.data.token.id_token}`,
          },
        }
      );

      if (refreshResponse.status === 200) {
        const profileResponse = await axios.get(`${BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${refreshResponse.data.id_token}`,
          },
        });

        if (profileResponse.status === 200) {
          return profileResponse.data;
        } else {
          throw new Error("Erro ao obter o perfil do usuário");
        }
      } else {
        throw new Error("Erro ao atualizar o token de atualização");
      }
    } else {
      throw new Error("Erro durante o login");
    }
  } catch (error) {
    throw new Error("Erro na chamada da API: " + error.message);
  }
}

export async function resendConfirmationCode(email) {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/resend-confirmation-code`,
      {
        email,
      }
    );

    if (response.status === 200) {
      return true;
    } else {
      throw new Error("Erro ao reenviar o código de confirmação");
    }
  } catch (error) {
    throw new Error("Erro na chamada da API: " + error.message);
  }
}
