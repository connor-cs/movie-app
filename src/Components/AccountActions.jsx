import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./Context";

export default function AccountActions() {
  const navigate=useNavigate()
  const {deleteAccount} = useAuthContext()
  const [active, setActive] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  return (
    <div className="account-actions-page">
      <h1>Account actions</h1>
      <button onClick={() => setActive(!active)}>Update account info</button>
      {active ? (
        <div className="change-password-input">
          <input
            placeholder="Input a new password"
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>

          <input
            placeholder="Confirm new password"
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
          ></input>
        </div>
      ) : null}

      <button onClick={handleDeleteClick}>Delete your account</button>
    </div>
  );

  function handleDeleteClick(){
    let text = "Are you sure you want to delete your account?"
    if(window.confirm(text) == true){
      deleteAccount()
      navigate("/")
    }
  }
}
