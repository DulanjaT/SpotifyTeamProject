import { useState } from "react";
import {
  TokenComponentState,
  requestToken,
} from "../../spotify/auth/requestToken";

// --- WORKING
export default function GetToken() {
  const [state, setState] = useState(TokenComponentState.init);
  const [error, setError] = useState(null);

  if (state === TokenComponentState.success) window.location.href = "/app";
  else if (state === TokenComponentState.init) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("code")) {
      setState(TokenComponentState.loading);
      requestToken(urlParams.get("code"), setState, setError);
      return <h1>Loading</h1>;
    }
    setState(TokenComponentState.error);
    //Missing parameters should probably trigger redirect to authorize again
    setError("Error: " + (urlParams.get("error") || "Params missing"));
  } else if (state === TokenComponentState.error) {
    return <h1>{error}</h1>;
  }
}

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   TokenComponentState,
//   requestToken,
// } from "../../spotify/auth/requestToken";

// export default function GetToken() {
//   const [state, setState] = useState(TokenComponentState.init);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (state === TokenComponentState.init) {
//       const urlParams = new URLSearchParams(window.location.search);
//       const code = urlParams.get("code");

//       if (code) {
//         setState(TokenComponentState.loading);
//         requestToken(code, setState, setError);
//       } else {
//         setState(TokenComponentState.error);
//         setError("Error: " + (urlParams.get("error") || "Params missing"));
//       }
//     } else if (state === TokenComponentState.success) {
//       navigate("/"); // Redirect to the base URL
//     }
//   }, [state, navigate]);

//   if (state === TokenComponentState.loading) {
//     return <h1>Loading...</h1>;
//   }

//   if (state === TokenComponentState.error) {
//     return <h1>{error}</h1>;
//   }

//   return null;
// }
