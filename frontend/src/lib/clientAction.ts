import { RegistrationInfo, ProductDataInfo } from "./interface";
import { LoginInfo } from "./interface";
import { authenticateUser, logOut } from "./authenticate";
async function userRegistration(formData: RegistrationInfo) {
  try {
    const {
      name,
      email,
      password,
      passwordConfirm,
    }: {
      name: string;
      email: string;
      password: string;
      passwordConfirm: string;
    } = formData;

    const res = await fetch("http://localhost:7890/api/v1/users/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
      }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    const user = await res.json();
    // store token into localstorage
    authenticateUser(user.token);
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      errorMsg: "",
    };
  } catch (error: any) {
    return {
      errorMsg: error.message,
    };
  }
}

async function userLogin(formData: LoginInfo) {
  try {
    const {
      email,
      password,
    }: {
      email: string;
      password: string;
    } = formData;

    const res = await fetch("http://localhost:7890/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    const user = await res.json();
    // store token into localstorage
    authenticateUser(user.token);
    return {
      email: "",
      password: "",
      errorMsg: "",
    };
  } catch (error: any) {
    return {
      errorMsg: error.message,
    };
  }
}

async function userLogout() {
  try {
    const res = await fetch("http://localhost:7890/api/v1/users/logout");
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const user = await res.json();
    logOut();
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// async function createCheckOutSession(cartData: any, token: string) {
//   try {
//     const res = await fetch(
//       "http://localhost:7890/api/v1/payment/checkout-session",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(cartData),
//       }
//     );
//     if (!res.ok) {
//       const error = await res.json();
//       throw new Error(error.message);
//     }
//     const session = await res.json();

//     return {
//       sessionUrl: session.session.url,
//       errorMsg: "",
//     };
//   } catch (error: any) {
//     return {
//       errorMsg: error.message,
//     };
//   }
// }
export { userRegistration, userLogin, userLogout };
