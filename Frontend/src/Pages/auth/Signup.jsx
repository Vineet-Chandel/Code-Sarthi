import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { BASE_URL } from "./baseURL";


const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newError, setNewError] = useState(false);
  const [errorisOpen, errorsetIsOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    FirstName: '',
    MiddleName: '',
    LastName: '',
    username: '',
    gender: '',
    age: '',
    Gmail: '',
    password: '',
    profession: '',
    college: '',
    termsAccepted: false,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    // ✅ 1. VALIDATION FIRST
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "MiddleName" && !formData[key]) {
        console.error("This field is required");
      }
      if (!formData["termsAccepted"]) {
        console.error("Please accept terms and conditions");
      }
    });



    try {
      // ✅ 2. START LOADING
      setIsSubmitting(true);
      const res = await axios.post(
        `${BASE_URL}/SignUpDB`,
        formData,
        { withCredentials: true }
      );

      // ✅ 3. SAVE USER
      dispatch(addUser(res.data)); // or res.data.user

      // ✅ 4. NAVIGATE
      navigate("/app");

    } catch (err) {
      setNewError(err.response.data || err.message);
      errorsetIsOpen(true);
    } finally {
      // ✅ 5. ALWAYS RESET LOADING 
      setIsSubmitting(false);
    }
  };


  // UI state
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);



  const validatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }

    if (id === 'password') {
      validatePasswordStrength(value);
    }
  };



  const generateUsername = () => {
    const FirstName = formData.FirstName.toLowerCase();
    const LastName = formData.LastName.toLowerCase();
    const randomNum = Math.floor(Math.random() * 1000);
    const username = `${FirstName}_${LastName}${randomNum}`;

    setFormData(prev => ({ ...prev, username }));
    setErrors(prev => ({ ...prev, username: '' }));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-600';
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[linear-gradient(135deg,#0c2461,#1e3799,#4a69bd)] p-4">
      <div className="w-full bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 flex flex-col md:flex-row gap-6 overflow-hidden hover:shadow-3xl transition-all duration-500">

        {/* LEFT - Signup Form */}
        <div className="flex flex-col gap-8 p-8 md:p-12 w-full md:w-[50%] text-white">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-300 text-lg md:text-xl animate-pulse">
              Enter your details to join the smart developers community! 🚀
            </p>
          </div>



          <div className="space-y-2">
            <div className={`${errorisOpen ? "block" : "hidden "} flex items-center rounded-2xl px-4 py-3 border border-red-600 bg-red/50  transition-all duration-30 `} >
              <span className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FF6F6F" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z" /></svg>
              </span>
              <div className="text-red-500 ml-2">
                {newError}
              </div>
            </div>
          </div>
          <form onSubmit={handleUpdate} className="space-y-8 flex flex-col">

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 ">
                <label htmlFor="FirstName" className="text-md ml-3 block">
                  First Name <span className="text-red-400 ml-1">*</span>
                </label>
                <div className={"flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50"}>
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    id="FirstName"
                    type="text"
                    placeholder="Vinay"
                    className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                    value={formData['FirstName']}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="FirstName" className="text-md ml-3 block">
                  Middle Name
                </label>
                <div className={"flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50"}>
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    id="MiddleName"
                    type="text"
                    placeholder="Singh"
                    className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                    value={formData['MiddleName']}
                    onChange={handleChange}
                    required={false}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="FirstName" className="text-md ml-3 block">
                  Last Name <span className="text-red-400 ml-1">*</span>
                </label>
                <div className={"flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50"}>
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    id="LastName"
                    type="text"
                    placeholder="Chandel"
                    className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                    value={formData['LastName']}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
            </div>

            {/* Username with Generator */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="username" className="text-md ml-3 block">
                  Username <span className="text-red-400 ml-1">*</span>
                </label>
                <button
                  type="button"
                  onClick={generateUsername}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
                  disabled={!formData.FirstName || !formData.LastName}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 16h5v5" />
                  </svg>
                  Generate
                </button>
              </div>
              <div className={`flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50`}>
                <span className="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 14 14">
                    <g fill="none">
                      <path stroke="#4147d5" d="M13.5 10.5v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2" />
                      <path fill="#d7e0ff" d="M7 6.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4m3.803 4.5a3.994 3.994 0 0 0-7.606 0z" />
                    </g>
                  </svg>
                </span>
                <input
                  id="username"
                  type="text"
                  placeholder="vinay_chandel"
                  className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                  value={formData.username}
                  onChange={handleChange}
                  required={true}
                />
              </div>

            </div>

            {/* Gender & Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="gender" className="text-md ml-3 block">
                  Gender <span className="text-red-400 ml-1">*</span>
                </label>
                <div className={`flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50`}>
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2v10M12 22v-10M2 12h10M22 12H12" />
                    </svg>
                  </span>
                  <select
                    id="gender"
                    className="w-full outline-none text-gray-200 bg-transparent text-base appearance-none cursor-pointer"
                    value={formData.gender}
                    onChange={handleChange}
                    required={true}
                  >
                    <option value="" disabled hidden className="text-gray-500">Select Gender</option>
                    <option value="male" className="bg-gray-900 text-white">Male</option>
                    <option value="female" className="bg-gray-900 text-white">Female</option>
                    <option value="other" className="bg-gray-900 text-white">Other</option>

                  </select>
                  <svg className="ml-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="age" className="text-md ml-3 block">
                  Age <span className="text-red-400 ml-1">*</span>
                </label>
                <div className={`flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50`}>
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <input
                    id="age"
                    type="number"
                    min="10"
                    max="100"
                    placeholder="25"
                    className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={formData.age}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="Gmail" className="text-md ml-3 block">
                Email <span className="text-red-400 ml-1">*</span>
              </label>
              <div className={`flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50`}>
                <span className="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  id="Gmail"
                  type="email"
                  placeholder="vinay@example.com"
                  className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-lg"
                  value={formData.Gmail}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* Password with Strength Meter */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-md ml-3 block">
                  Password <span className="text-red-400 ml-1">*</span>
                </label>
                <div className={`flex items-center rounded-2xl px-4 py-3 border transition-all duration-300 bg-black/50 ${passwordStrength <= 2 ? 'border-red-400' : passwordStrength === 3 ? 'border-yellow-400' : 'border-green-400'}`}>
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-lg"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" y1="2" x2="22" y2="22" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Password Strength Meter */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Password strength:</span>
                  <span className={`font-medium ${passwordStrength <= 2 ? 'text-red-400' : passwordStrength === 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {passwordStrength <= 2 ? 'Weak' : passwordStrength === 3 ? 'Medium' : 'Strong'}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                    style={{ width: `${passwordStrength * 25}%` }}
                  />
                </div>
                <ul className="text-xs text-gray-400 space-y-1 ml-3">
                  <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-green-400' : ''}`}>
                    <span>{formData.password.length >= 8 ? '✓' : '○'}</span>
                    At least 8 characters
                  </li>
                  <li className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? 'text-green-400' : ''}`}>
                    <span>{/[A-Z]/.test(formData.password) ? '✓' : '○'}</span>
                    One uppercase letter
                  </li>
                  <li className={`flex items-center gap-2 ${/[0-9]/.test(formData.password) ? 'text-green-400' : ''}`}>
                    <span>{/[0-9]/.test(formData.password) ? '✓' : '○'}</span>
                    One number
                  </li>
                  <li className={`flex items-center gap-2 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-400' : ''}`}>
                    <span>{/[^A-Za-z0-9]/.test(formData.password) ? '✓' : '○'}</span>
                    One special character
                  </li>
                </ul>
              </div>
            </div>


            <div className='flex justify-between items-center w-full'>
              <div className="space-y-2 w-[48.5%]">
                <label htmlFor="college" className="text-md ml-3 block ">
                  College or Company <span className="text-red-400 ml-1">*</span>
                </label>
                <div className={`flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50`}>
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
                        <path stroke="#306cfe" d="M33.333 8.333A2.083 2.083 0 0 0 31.25 6.25h-12.5a2.083 2.083 0 0 0-2.083 2.083v6.25h16.666zM43.75 41.667v-25a2.083 2.083 0 0 0-2.083-2.084H8.333a2.083 2.083 0 0 0-2.083 2.084v25a2.083 2.083 0 0 0 2.083 2.083h33.334a2.083 2.083 0 0 0 2.083-2.083" />
                        <path stroke="#344054" d="M22.917 29.167H18a8.33 8.33 0 0 1-7.583-5.042l-3.792-8.646a2.08 2.08 0 0 1 1.708-.896h33.334a2.08 2.08 0 0 1 1.708.896l-3.792 8.646A8.33 8.33 0 0 1 32 29.167h-4.917" />
                        <path stroke="#306cfe" d="M27.083 27.083h-4.166v4.167h4.166z" />
                      </g>
                    </svg>
                  </span>
                  <input
                    id="college"
                    type="text"
                    placeholder="IIIT Hyderabad | Microsoft"
                    className="outline-none w-full text-gray-200 bg-transparent placeholder-gray-500 text-base"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2  w-[48.5%]">
                <label htmlFor="profession" className="text-md ml-3 block">
                  Professionaly what you are !  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className={`flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50`}>
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
                        <path stroke="#306cfe" d="M33.333 8.333A2.083 2.083 0 0 0 31.25 6.25h-12.5a2.083 2.083 0 0 0-2.083 2.083v6.25h16.666zM43.75 41.667v-25a2.083 2.083 0 0 0-2.083-2.084H8.333a2.083 2.083 0 0 0-2.083 2.084v25a2.083 2.083 0 0 0 2.083 2.083h33.334a2.083 2.083 0 0 0 2.083-2.083" />
                        <path stroke="#344054" d="M22.917 29.167H18a8.33 8.33 0 0 1-7.583-5.042l-3.792-8.646a2.08 2.08 0 0 1 1.708-.896h33.334a2.08 2.08 0 0 1 1.708.896l-3.792 8.646A8.33 8.33 0 0 1 32 29.167h-4.917" />
                        <path stroke="#306cfe" d="M27.083 27.083h-4.166v4.167h4.166z" />
                      </g>
                    </svg>
                  </span>
                  <input
                    id="profession"
                    type="text"
                    placeholder="Student | Developer | Designer"
                    className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>



            {/* Links */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-3 px-2">
              <div className="text-gray-400">
                Already have an account?{" "}
                <a href="/login" className="text-blue-400 hover:text-blue-300 transition-colors font-medium underline hover:no-underline">
                  Sign in
                </a>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      termsAccepted: e.target.checked
                    }))
                  }
                  className="accent-blue-500"
                />
                <span>
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-400 underline hover:no-underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-400 underline hover:no-underline">
                    Privacy Policy
                  </a>.
                </span>
              </label>

            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl transition-all duration-300 text-lg font-semibold shadow-lg flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'} `}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>



          </form>


        </div>

        {/* RIGHT - Content Panel */}
        <div className="w-full md:w-[50%] p-6">
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden group">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full translate-y-20 -translate-x-20 group-hover:scale-125 transition-transform duration-1000 delay-300" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000 delay-150" />

            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  What Developers Say
                </h1>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 leading-tight animate-gradient">
                  About CodeSarthi
                </h1>
                <span className="text-7xl md:text-8xl opacity-20 block animate-bounce">"</span>
              </div>

              <div className="space-y-6">
                <p className="text-lg md:text-xl lg:text-2xl text-gray-300 italic leading-relaxed group-hover:text-white transition-colors duration-300">
                  "From collaboration and project tracking to career growth and learning,
                  CodeSarthi supports developers at every stage of their journey."
                </p>
              </div>

              {/* Interactive Feature Cards */}
              <div className="space-y-4">
                {[
                  { title: "Real-time Collaboration", desc: "Code together with live editing and chat" },
                  { title: "Smart Project Tracking", desc: "AI-powered insights for your projects" },
                  { title: "Career Growth Path", desc: "Personalized learning and mentorship" }
                ].map((feature, index) => (
                  <div
                    key={feature.title}
                    className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-4 border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer group/card"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover/card:rotate-12 transition-transform">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-300">1K+</div>
                  <div className="text-sm text-gray-400">Active Developers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300">2K+</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300">95%</div>
                  <div className="text-sm text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10 mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                All efforts go to the,<br />
                <span className="text-blue-300">Team Axonic !!</span>
              </h2>
              <p className="text-gray-300 text-lg">
                <b>Built in India, for the world.</b>   <br />
                Our team works relentlessly to deliver a fast, reliable platform —
                empowering developers, strengthening India’s tech ecosystem, and proving that world-class innovation proudly comes from India.

              </p>


            </div>
          </div>
        </div>

      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .shake {
          animation: shake 0.3s ease-in-out;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Signup;