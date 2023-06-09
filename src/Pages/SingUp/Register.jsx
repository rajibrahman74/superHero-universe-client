import { Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";

const Register = () => {
  const { createUser, googleSigIn } = useContext(AuthContext);
  useTitle("Sign up")
  const [showPassword, setShowPassword] = useState(false);

  const handleSingUp = (e) => {
    e.preventDefault();

    const form = e.target;
    const displayName = form.displayName.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photoUrl.value;

    // Password validation regex pattern
    const passwordRegex = /^.{6,}$/;

    // Check for blank input fields
    if (!displayName || !email || !password || !photoUrl) {
      Swal.fire({
        position: "top-start",
        icon: "error",
        title: "A user cannot submit empty email and password fields",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    if (!passwordRegex.test(password)) {
      // sweet alert
      Swal.fire({
        position: "top-start",
        icon: "error",
        title: "The password is less than 6 characters",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    createUser(email, password, displayName, photoUrl)
      .then((result) => {
        // User create process, update profile
        const loggedUser = result.user;
        return updateProfile(loggedUser, {
          displayName: displayName,
          photoURL: photoUrl,
        }).then(() => {
          console.log("Profile updated successfully");
          console.log(loggedUser);

          // sweet alert
          Swal.fire({
            position: "top-start",
            icon: "success",
            title: "User created successfully",
            showConfirmButton: false,
            timer: 3000,
          });
          form.reset();
        });
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
        Swal.fire({
          position: "top-start",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  // toggle show password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // sign up with google
  const handleWithGoogleSingUp = () => {
    googleSigIn()
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "top-start",
          icon: "success",
          title: "User created successfully",
          showConfirmButton: false,
          timer: 3000,
        });
      })
      .catch((error) => {
        console.error(error.message);
        Swal.fire({
          position: "top-start",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  return (
    <section className="max-w-7xl flex flex-col sm:flex-row items-centert justify-between mx-auto px-4 py-12">
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);",
        }}
      />
      <div className="w-1/2">
        {/* Component: Card with form */}
        <form
          onSubmit={handleSingUp}
          className="max-w-[415px] h-[680px] mx-auto overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200"
        >
          {/* Body*/}
          <div className="p-6">
            <header className="mb-4 text-center">
              <h3 className="text-xl font-medium text-slate-700">Sign up</h3>
            </header>
            <div className="flex flex-col">
              {/* Input field */}
              <div className="relative my-6">
                <input
                  id="displayName"
                  type="text"
                  name="displayName"
                  placeholder="Your name"
                  className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-slate-200 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="id-b03"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-slate-400 font-semibold peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Your name
                </label>
                <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500">
                  <span>Type your name</span>
                </small>
              </div>
              <div className="relative my-6">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your name"
                  className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-slate-200 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="id-b03"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-slate-400 font-semibold peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Your email
                </label>
                <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500">
                  <span>Type your email address</span>
                </small>
              </div>
              {/* Input field */}
              <div className="relative my-6">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="your password"
                  className="relative w-full h-10 px-4 pr-12 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-slate-200 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="id-b13"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-slate-400 font-semibold peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Your password
                </label>
                <svg
                  onClick={toggleShowPassword}
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-2.5 right-4 h-5 w-5 stroke-slate-400 cursor-pointer peer-disabled:cursor-not-allowed"
                  fill={showPassword ? "none" : "currentColor"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
                <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500">
                  <span>Type your password</span>
                </small>
              </div>
              <div className="relative my-6">
                <input
                  id="photoUrl"
                  type="text"
                  name="photoUrl"
                  placeholder="Your photo url"
                  className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-slate-200 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="id-b03"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-slate-400 font-semibold peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Your photo url
                </label>
                <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500">
                  <span>Type your photo url</span>
                </small>
              </div>
            </div>
          </div>
          {/* Action base sized basic button */}
          <div className="flex justify-end p-6 -mt-5">
            <button
              type="submit"
              className="btn hover:bg-black border-0 inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded-none focus-visible:outline-none whitespace-nowrap bg-warning opacity-75 disabled:cursor-not-allowed disabled:borde"
            >
              <span>Sign up</span>
            </button>
          </div>
          <div className="-mt-1 text-center text-md transition text-slate-400 peer-invalid:text-pink-500">
            Already have an account?
            <Link
              className="ml-1 text-warning opacity-75 font-semibold"
              to="/login"
            >
              Sign in
            </Link>
          </div>
          <div className="w-full px-6 flex items-center text-center mx-auto py-5">
            <hr className="flex-1 border-t border-slate-200" />
            <span className="my-0 mx-[10px] font-bold text-slate-400">or</span>
            <hr className="flex-1 border-t border-slate-200" />
          </div>
          <div
            onClick={handleWithGoogleSingUp}
            className="flex items-center justify-center gap-[6px] w-ful; mx-6 h-[50px] border border-slate-200  cursor-pointer"
          >
            <img
              className="w-11 h-11 "
              src="https://i.ibb.co/WDm81SD/unnamed-removebg-preview.png"
              alt=""
            />
            <span>Continue with Google</span>
          </div>
        </form>
        {/* End Card with form */}
      </div>
      <div className="w-1/2">
        <img
          className="w-[75%]"
          src="https://i.ibb.co/vkNs1LY/wepik-export-20230520141316e-Fe-C.png"
          alt=""
        />
      </div>
    </section>
  );
};

export default Register;
