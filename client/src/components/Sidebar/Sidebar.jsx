import React from "react";
import CreateAcc from "./CreateAcc/CreateAcc";
import SignIn from "./SignIn/SignIn";
import "./Sidebar.css";

function Sidebar({
  isSignInOpen,
  isCreateAccOpen,
  createAcc,
  handleOnCreateAccFormChange,
  handleCreateAccOpen,
  handleSignInOpen,
  handleOnSignInFormChange,
  signIn,
  handleOnSignInSubmit,
  handleOnCreateAccSubmit,
  createaccerror,
  signinerror,
  handleFacebookLoginResponse,
  createaccsuccess,
}) {
  return (
    <aside
      className={
        isCreateAccOpen
          ? "sidebar createaccopen"
          : isSignInOpen
          ? "sidebar signinopen"
          : "sidebar"
      }
    >
      {isCreateAccOpen ? (
        <CreateAcc
          createAcc={createAcc}
          handleOnCreateAccFormChange={handleOnCreateAccFormChange}
          handleCreateAccOpen={handleCreateAccOpen}
          handleOnCreateAccSubmit={handleOnCreateAccSubmit}
          createaccerror={createaccerror}
          createaccsuccess={createaccsuccess}
        />
      ) : isSignInOpen ? (
        <SignIn
          handleOnSignInSubmit={handleOnSignInSubmit}
          signIn={signIn}
          handleOnSignInFormChange={handleOnSignInFormChange}
          handleSignInOpen={handleSignInOpen}
          signinerror={signinerror}
          handleFacebookLoginResponse={handleFacebookLoginResponse}
        />
      ) : null}
    </aside>
  );
}

export default Sidebar;
