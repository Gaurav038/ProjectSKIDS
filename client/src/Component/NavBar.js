import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar sticky-top navbar-dark bg-dark d-flex justify-content-space-around ">
      <Link className="navbar-brand" to="/">
        <button type="button" className="btn btn-md btn-primary fw-bold">
          Dashboard
        </button>
      </Link>

      <Link className="navbar-brand" to="/add">
        <button type="button" className="btn btn-md btn-primary fw-bold">
          ADD member
        </button>
      </Link>
    </nav>
  );
};

export default NavBar;
