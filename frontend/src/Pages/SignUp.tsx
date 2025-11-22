import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Lock,
    ArrowRight,

    Eye,
    EyeOff,
    Loader2,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:9000/api/v1/user/signup",
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                },
            );

            if (response.status === 200 || response.status === 201) {
                toast.success("Account created successfully!");
                navigate("/signin");
            }
        } catch {
            toast.error("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 relative flex items-center justify-center p-4 overflow-hidden">
            {/* Animated Background Elements */}
            {/*<div className="fixed inset-0 pointer-events-none">
            {/*</div>*/}

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                {/* Glow Effect */}
                {/*<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-3xl" />*/}

                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mb-8"
                    >
                        {/*<motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="w-16 h-16 mx-auto mb-6 relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-sm opacity-75" />
                            <div className="relative w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-600">
                                <Sparkles size={28} className="text-cyan-400" />
                            </div>
                        </motion.div>*/}

                        <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-2">
                            Join SPEEDYTM
                        </h1>
                        <p className="text-slate-400">
                            Create your account to get started
                        </p>

                        {/* Decorative line */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-4"
                        />
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User
                                    size={18}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "username",
                                            e.target.value,
                                        )
                                    }
                                    onFocus={() => setFocusedField("username")}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Enter your username"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
                                />
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width:
                                            focusedField === "username"
                                                ? "100%"
                                                : "0%",
                                    }}
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                                />
                            </div>
                        </motion.div>

                        {/* Email Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "email",
                                            e.target.value,
                                        )
                                    }
                                    onFocus={() => setFocusedField("email")}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
                                />
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width:
                                            focusedField === "email"
                                                ? "100%"
                                                : "0%",
                                    }}
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                                />
                            </div>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "password",
                                            e.target.value,
                                        )
                                    }
                                    onFocus={() => setFocusedField("password")}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Enter your password"
                                    className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width:
                                            focusedField === "password"
                                                ? "100%"
                                                : "0%",
                                    }}
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                                />
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            type="submit"
                            disabled={loading}
                            className="w-full  text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] relative overflow-hidden group"
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                        >
                            <AnimatePresence mode="wait">
                                {loading ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center justify-center gap-3"
                                    >
                                        <Loader2
                                            size={20}
                                            className="animate-spin"
                                        />
                                        <span>Creating Account...</span>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center justify-center gap-3"
                                    >
                                        <span>Create Account</span>
                                        <ArrowRight
                                            size={20}
                                            className="group-hover:translate-x-1 transition-transform"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Button shimmer effect */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                            />
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-slate-400">
                            Already have an account?{" "}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/signin")}
                                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                            >
                                Sign In
                            </motion.button>
                        </p>

                        {/* Security note */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-6 p-3 bg-slate-800/30 border border-slate-700 rounded-lg"
                        >
                            <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
                                <Lock size={12} />
                                Your data is encrypted and secure
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;
