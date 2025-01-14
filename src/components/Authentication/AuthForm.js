import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo/logo.jpg";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Check if token exists and is valid when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("https://opinion-be.onrender.com/checkToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Token is valid") {
            navigate("/home");
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch((error) => {
          console.error("Error validating token:", error);
          localStorage.removeItem("token");
        });
    }
  }, [navigate]);

  // Validation function for form fields
  const validate = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (!isLogin && password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!isLogin && !username) errors.username = "Username is required";
    if (!isLogin && !fullname) errors.fullname = "Full name is required";
    return errors;
  };

  // Handle form submission for login or signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await fetch(
          `https://opinion-be.onrender.com/${isLogin ? "login" : "signup"}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              password,
              ...(isLogin ? {} : { username, fullname }),
            }),
          }
        );
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);

          // Define the target page based on admin credentials
          const targetPage =
            email === "admin@gmail.com" && password === "admin"
              ? "/admin"
              : "/home";

          onLogin(data.token, targetPage);
        } else {
          setErrors({ form: data.message });
        }
      } catch (err) {
        console.error("Error during form submission:", err);
        setErrors({ form: "Internal server error" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <div className="flex justify-center rounded-sm">
          <img src={Logo} alt="Logo" className="h-24 rounded-full" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2 text-black">
          {isLogin ? "Login" : "Signup to create an account"}
        </h2>
        <div className="mb-8 text-center">
          <p
            className="text-black cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"  // Add name attribute
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full p-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:border-black`}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs italic">{errors.username}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"  // Add name attribute
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className={`w-full p-2 border ${
                    errors.fullname ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:border-black`}
                />
                {errors.fullname && (
                  <p className="text-red-500 text-xs italic">{errors.fullname}</p>
                )}
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="text"  // Add name attribute for Selenium
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:border-black`}
            />
            {errors.email && (
              <p className="text-red-500 emailError text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="text"
              name="password"  // Add name attribute for Selenium
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:border-black`}
            />
            {errors.password && (
              <p className="text-red-500 passwordError text-xs italic">{errors.password}</p>
            )}
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"  // Add name attribute for Selenium
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-2 border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:border-black`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}
          {errors.form && (
            <p className="text-red-500 text-xs italic mb-4">{errors.form}</p>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition-colors"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
