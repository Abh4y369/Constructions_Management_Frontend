import { useState } from "react";
import { MdConstruction } from "react-icons/md";
import { signupApi, signinApi } from "../Services/allApis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Register
  const handleRegister = async () => {
    const { username, email, password } = user;
    if (!username || !email || !password) {
      toast.warning("Please fill all fields");
      return;
    }
    const result = await signupApi(user);
    console.log(result);
    if (result.status === 201 || result.status === 200) {
      toast.success("Registration Successful");
      setUser({ username: "", email: "", password: "", });
      setIsLogin(true);
    } else {
      toast.error(result?.data?.message || "Registration Failed");
    }
  };

  // Login
  const handleLogin = async () => {
    const { email, password } = user;
    if (!email || !password) {
      toast.warning("Please fill all fields");
      return;
    }
    const result = await signinApi({ email, password, });
    console.log(result);
    if (result.status === 200) {
      localStorage.setItem("token", result.data.token);
      toast.success("Login Successful");
      setUser({ username: "", email: "", password: "", });
      navigate("/dashboard");
    } else {
      toast.error(result?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#14532D] via-[#166534] to-[#0F5132] flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section - Hidden on mobile, visible on medium screens and above */}
        <div className="hidden md:flex md:w-2/5 lg:w-1/2 bg-gradient-to-br from-[#14532D] via-[#166534] to-[#1B5E20] text-white flex-col justify-center items-center p-6 lg:p-10">
          <h1 className="text-5xl lg:text-6xl mb-4 lg:mb-5">🏗️</h1>
          <h2 className="text-2xl lg:text-3xl font-bold text-center">
            Construction Management
          </h2>
          <p className="text-center mt-4 lg:mt-6 text-sm lg:text-base">
            Manage Projects
            <br />
            Track Workers
            <br />
            Monitor Site Progress
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-3/5 lg:w-1/2 p-6 sm:p-8 lg:p-10">
          <div className="flex justify-center mb-3 sm:mb-4">
            <MdConstruction className="text-5xl sm:text-6xl text-[#14532D]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#14532D]">
            {isLogin ? "Login" : "Register"}
          </h2>
          <p className="text-center text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">
            {isLogin
              ? "Sign in to manage your projects"
              : "Create your construction workspace"}
          </p>

          <div className="space-y-3 sm:space-y-4">
            {!isLogin && (
              <input 
                type="text"
                placeholder="Username"
                className="w-full bg-green-50 border border-green-100 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 text-sm sm:text-base"
                value={user.username} 
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            )}

            <input 
              type="email"
              placeholder="Email"
              className="w-full bg-green-50 border border-green-100 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 text-sm sm:text-base"
              value={user.email} 
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <input 
              type="password"
              placeholder="Password"
              className="w-full bg-green-50 border border-green-100 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 text-sm sm:text-base"
              value={user.password} 
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <p className="text-xs text-gray-500">
              Your credentials are securely encrypted.
            </p>

            {isLogin ? (
              <button 
                onClick={handleLogin}
                className="w-full bg-[#15803D] hover:bg-[#166534] text-white py-2.5 sm:py-3 rounded-xl font-semibold transition text-sm sm:text-base"
              >
                LOGIN
              </button>
            ) : (
              <button 
                onClick={handleRegister}
                className="w-full bg-[#14532D] hover:bg-[#166534] text-white py-2.5 sm:py-3 rounded-xl font-semibold transition text-sm sm:text-base"
              >
                REGISTER
              </button>
            )}
          </div>

          <div className="text-center mt-5 sm:mt-6">
            {isLogin ? (
              <p className="text-sm sm:text-base">
                Don't have an account?{" "}
                <button 
                  onClick={() => { setUser({ username: "", email: "", password: "" }); setIsLogin(false); }}
                  className="text-[#15803D] font-semibold hover:underline"
                >
                  Register
                </button>
              </p>
            ) : (
              <p className="text-sm sm:text-base">
                Already have an account?{" "}
                <button 
                  onClick={() => { setUser({ username: "", email: "", password: "" }); setIsLogin(true); }}
                  className="text-[#15803D] font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;