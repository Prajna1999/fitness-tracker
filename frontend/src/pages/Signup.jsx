import React, { useState } from "react";
import { useSingup } from "../hooks/useSignup";
function Signup() {
  const [email, setEmail] = useState("");

  const [password, setPassWord] = useState("");

  const {signup, error, isLoadind}=useSingup()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(email, password);

    await signup(email, password)
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email:</label>

      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password</label>

      <input
        type="password"
        onChange={(e) => setPassWord(e.target.value)}
        value={password}
      />


      <button disabled={isLoadind}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Signup;
