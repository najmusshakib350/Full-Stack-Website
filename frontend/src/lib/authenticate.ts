import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "./interface";
export const authenticateUser = (token: string) => {
  localStorage.setItem("jwt", JSON.stringify(token));
  return;
};

export const isAuthenticated = (): any => {
  const jwtToken = localStorage.getItem("jwt");

  if (jwtToken !== null) {
    const decoded: JwtPayload = jwtDecode(jwtToken);
    if (decoded.exp !== undefined) {
      if (new Date().getTime() <= decoded.exp * 1000) {
        const jwt = JSON.parse(jwtToken);
        return { ...decoded, token: jwt };
      }
      localStorage.removeItem("jwt");
      return false;
    }
  } else {
    return false;
  }
};

export const logOut = () => {
  localStorage.removeItem("jwt");
};
