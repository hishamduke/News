import Router from "next/router";
import { logout } from "../../lib/logout";
export default function Logout() {
  return (
    <>
      <button
        style={{ margin: "10px" }}
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        logout
      </button>
    </>
  );
}
