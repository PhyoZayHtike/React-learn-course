import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <div style={{ backgroundColor: "#6F2CF4" }}>
      <nav className="navbar container navbar-expand px-2 navbar-light py-4">
        <Link className="navbar-brand text-white" to="/">
          Home
        </Link>
       
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="navbar-brand text-white" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="navbar-brand text-white" to="/createpost">
                  Create Post
                </Link>
              </li>
            )}
            {user && (
              <>
                <li className="nav-item">
                  <span
                    style={{ cursor: "pointer" }}
                    className="navbar-brand text-white"
                    onClick={signUserOut}
                  >
                    Logout
                  </span>
                </li>
              </>
            )}
          </ul>
          {auth.currentUser && (
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <p className="nav-link fw-bold text-white fs-5 mb-0 d-none d-md-block">
                  {auth.currentUser.displayName}
                </p>
              </li>
              <li className="nav-item">
                <img
                  src={auth.currentUser.photoURL || ""}
                  alt="User"
                  width="45px"
                  height="45px"
                  className="rounded-circle ml-2 border"
                />
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
