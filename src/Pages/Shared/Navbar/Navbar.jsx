import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProviders";
import { useContext } from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // toast.success("User logout successfully");
      })
      .catch((error) => {
        console.error(error.message);
        // toast.error(error.message);
      });
  };

  return (
    <header className="bg-[#eeeff1] sticky top-0 z-[100]">
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);",
        }}
      />
      <nav className="navbar max-w-7xl mx-auto flex justify-between items-center px-4 py-5">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="text-gray-900 font-medium">
              <NavLink
                exact
                activeclassName="active text-[#757575] font-semibold hover:text-warning"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="text-gray-900 font-medium">
              <NavLink
                activeclassName="active text-[#757575] font-semibold hover:text-warning"
                to="/blog"
              >
                Blog
              </NavLink>
            </li>
            <li className="text-gray-900 font-medium">
              <NavLink
                activeClassName="active text-[#757575] font-semibold hover:text-warning"
                to="/alltoys"
              >
                All Toys
              </NavLink>
            </li>
            {user && (
              <li className="text-gray-900 font-medium">
                <NavLink
                  activeClassName="active text-[#757575] font-semibold hover:text-warning"
                  to="/mytoys"
                >
                  My Toys
                </NavLink>
              </li>
            )}
            {user && (
              <li className="text-gray-900 font-medium">
                <NavLink
                  activeClassName="active text-[#757575] font-semibold hover:text-warning"
                  to="/addtoys"
                >
                  Add Toy
                </NavLink>
              </li>
            )}
            <li className="text-gray-900 font-medium">
              <NavLink
                activeClassName="active text-[#757575] font-semibold hover:text-warning"
                to="/login"
              >
                Sign in
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="my-auto">
          <Link to="/">
            <div className="logo flex items-center">
              <div className="flex justify-center items-center">
                <span className="superhero text-warning opacity-75 font-bold text-base md:text-[22px] -mr-5">
                  superHero
                </span>
                <img
                  className="logo-image mr-2 w-20 h-12"
                  src="https://i.ibb.co/r22wffD/logo.png"
                  alt="Logo"
                />
                <span className="universe text-[#c3ad42] text-base md:text-[22px] -ml-7 font-extrabold">
                  Universe
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className={`hidden lg:flex ${user ? "mx-auto" : "ms-auto"}`}>
          <ul className="flex items-center gap-6 px-1">
            <li className="text-gray-900 font-medium">
              <NavLink
                activeClassName="active text-[#757575] font-semibold hover:text-warning"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="text-gray-900 font-medium">
              <NavLink
                activeClassName="active text-[#757575] font-semibold hover:text-warning"
                to="/blog"
              >
                Blog
              </NavLink>
            </li>
            <li className="text-gray-900 font-medium">
              <NavLink
                activeClassName="active text-[#757575] font-semibold hover:text-warning"
                to="/alltoys"
              >
                All Toys
              </NavLink>
            </li>
            {user && (
              <li className="text-gray-900 font-medium">
                <NavLink
                  activeClassName="active text-[#757575] font-semibold hover:text-warning"
                  to="/mytoys"
                >
                  My Toys
                </NavLink>
              </li>
            )}
            {user && (
              <li className="text-gray-900 font-medium">
                <NavLink
                  activeClassName="active text-[#757575] font-semibold hover:text-warning"
                  to="/addtoys"
                >
                  Add Toy
                </NavLink>
              </li>
            )}
            <li className="text-gray-900 font-medium">
              <NavLink
                activeClassName="active text-[#757575] font-semibold hover:text-warning"
                to="/login"
              >
                Sign in
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <div className="flex items-center justify-center">
            {/* conditional rendaring */}
            {user && (
              <div className="flex items-center justify-center gap-6">
                <img
                  title={user.displayName}
                  className="w-12 h-12 rounded-full"
                  src={user.photoURL}
                  alt=""
                />
                <button
                  onClick={handleLogOut}
                  className="btn border-0 text-white bg-warning opacity-75 px-6 py-2 font-bold  flex items-center gap-1 rounded-none"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;