import axios from "../../api/Client";

const REGISTER = "/registration";
const REGISTER_CONFIRMATION = "/registration/confirm";
const LOGIN = "/login";

export default {
  async signup(context, payload) {
    const response = await axios.post(REGISTER, {
      email: payload.email,
      password: payload.password,
      matchingPassword: payload.matchingPassword,
    });
    const result = await response.data;
    console.log("Result from signup : " + result);
  },

  async confirmEmailToken(context, payload) {
    const response = await axios.post(
      REGISTER_CONFIRMATION,
      {},
      { params: { token: payload.token, userId: payload.userId } }
    );
    const result = await response.data;
    console.log(result);
  },

  async login(context, payload) {
    const login = {
      email: payload.email,
      password: payload.password,
    };
    const response = await axios.post(LOGIN, {}, { params: login });
    const result = await response.data;
    setLocalStorage(result);
    setAuthentication(context, payload);
    pushHome(payload.router, response);
  },
  logout(context) {
    unsetAuthentication(context);
    localStorage.clear();
  },
};
function pushHome(router, response) {
  if (response.status === 200) {
    router.push({ name: "home" });
  }
}
function setLocalStorage(payload) {
  if (payload != null) {
    localStorage.setItem("token", payload.token);
    localStorage.setItem("user_id", payload.userId);
    localStorage.setItem("expiration", payload.expiration);
  }
}
function setAuthentication(context) {
  context.commit("setUser", {
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("user_id"),
    expiration: localStorage.getItem("expiration"),
  });
}
function unsetAuthentication(context) {
  context.commit("setUser", {
    token: null,
    userId: null,
    expiration: null,
  });
}
