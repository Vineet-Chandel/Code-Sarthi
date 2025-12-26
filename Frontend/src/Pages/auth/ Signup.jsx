import { useState, useEffect } from 'react';

const Signup = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    gender: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    profession: ''
  });

  // UI state
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Real-time validation
  useEffect(() => {
    validatePasswordStrength(formData.password);
    setPasswordMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'middleName' && !formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success animation
    const button = e.target.querySelector('button[type="submit"]');
    button.innerHTML = '✓ Account Created!';
    button.classList.add('bg-green-600', 'from-green-600', 'to-green-700');

    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        gender: '',
        age: '',
        email: '',
        password: '',
        confirmPassword: '',
        profession: ''
      });
      button.innerHTML = 'Create Account';
      button.classList.remove('bg-green-600', 'from-green-600', 'to-green-700');
      alert('Account created successfully! Redirecting to dashboard...');
    }, 2000);
  };

  const generateUsername = () => {
    const firstName = formData.firstName.toLowerCase();
    const lastName = formData.lastName.toLowerCase();
    const randomNum = Math.floor(Math.random() * 1000);
    const username = `${firstName}_${lastName}${randomNum}`;

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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#345957] via-[#2a4746] to-[#1e3534] p-4">
      <div className="w-full bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 flex flex-col md:flex-row gap-6 overflow-hidden hover:shadow-3xl transition-all duration-500">

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

          <form onSubmit={handleSubmit} className="space-y-8 flex flex-col">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['firstName', 'middleName', 'lastName'].map((field, index) => (
                <div key={field} className="space-y-2">
                  <label htmlFor={field} className="text-md ml-3 block">
                    {field === 'firstName' ? 'First Name' : field === 'middleName' ? 'Middle Name' : 'Last Name'}
                    {field !== 'middleName' && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  <div className={`flex items-center rounded-2xl px-4 py-3 border transition-all duration-300 ${errors[field] ? 'border-red-500 shake' : 'border-gray-700 focus-within:border-blue-500'} bg-black/50`}>
                    <span className="mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      id={field}
                      type="text"
                      placeholder={field === 'firstName' ? 'Vinay' : field === 'middleName' ? 'Singh' : 'Chandel'}
                      className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                      value={formData[field]}
                      onChange={handleChange}
                      required={field !== 'middleName'}
                    />
                  </div>
                  {errors[field] && <p className="text-red-400 text-sm ml-3 animate-fadeIn">{errors[field]}</p>}
                </div>
              ))}
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
                  disabled={!formData.firstName || !formData.lastName}
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
              <div className={`flex items-center rounded-2xl px-4 py-3 border transition-all duration-300 ${errors.username ? 'border-red-500' : 'border-gray-700 focus-within:border-blue-500'} bg-black/50`}>
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
                  required
                />
              </div>
              {errors.username && <p className="text-red-400 text-sm ml-3">{errors.username}</p>}
            </div>

            {/* Gender & Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="gender" className="text-md ml-3 block">
                  Gender <span className="text-red-400 ml-1">*</span>
                </label>
                <div className={`flex items-center rounded-2xl px-4 py-3 border transition-all duration-300 ${errors.gender ? 'border-red-500' : 'border-gray-700 focus-within:border-blue-500'} bg-black/50`}>
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
                    required
                  >
                    <option value="" disabled hidden className="text-gray-500">Select Gender</option>
                    <option value="male" className="bg-gray-900 text-white">Male</option>
                    <option value="female" className="bg-gray-900 text-white">Female</option>
                    <option value="other" className="bg-gray-900 text-white">Other</option>
                    <option value="prefer-not-to-say" className="bg-gray-900 text-white">Prefer not to say</option>
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
                <div className={`flex items-center rounded-2xl px-4 py-3 border transition-all duration-300 ${errors.age ? 'border-red-500' : 'border-gray-700 focus-within:border-blue-500'} bg-black/50`}>
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <input
                    id="age"
                    type="number"
                    min="13"
                    max="100"
                    placeholder="25"
                    className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-md ml-3 block">
                Email <span className="text-red-400 ml-1">*</span>
              </label>
              <div className={`flex items-center rounded-2xl px-4 py-3 border transition-all duration-300 ${errors.email ? 'border-red-500' : 'border-gray-700 focus-within:border-blue-500'} bg-black/50`}>
                <span className="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="vinay@example.com"
                  className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-lg"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm ml-3">{errors.email}</p>}
            </div>

            {/* Password with Strength Meter */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-md ml-3 block">
                  Password <span className="text-red-400 ml-1">*</span>
                </label>
                <div className={`flex items-center rounded-2xl px-4 py-3 border transition-all duration-300 ${errors.password ? 'border-red-500' : passwordMatch ? 'border-green-500' : 'border-gray-700 focus-within:border-blue-500'} bg-black/50`}>
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



            {/* Profession */}
            <div className="space-y-2">
              <label htmlFor="profession" className="text-md ml-3 block">
                College or Company <span className="text-red-400 ml-1">*</span>
              </label>
              <div className={`flex items-center rounded-2xl px-4 py-3 border transition-all duration-300 ${errors.profession ? 'border-red-500' : 'border-gray-700 focus-within:border-blue-500'} bg-black/50`}>
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
                  placeholder="IIIT Hyderabad | Microsoft"
                  className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                />
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
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-blue-500" defaultChecked />
                  <span className="text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium underline hover:no-underline">
                  Terms & Conditions
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl transition-all duration-300 text-lg font-semibold shadow-lg flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'} ${isHovered ? 'scale-[1.02]' : ''}`}
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
                Collab with diverse teams <br />
                <span className="text-blue-300">accelerate your growth</span>
              </h2>
              <p className="text-gray-300 text-lg">
                Be among the first developers to experience effortless collaboration
                and efficient team management.
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