import React, { useState } from "react";
import { sendOtpApi, verifyOtpApi } from "../../service/loginService";
import { useNavigate } from "react-router-dom";


export default function LoginWithOTP() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState("mobile");
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);

      // Auto focus next
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const sendOtp = async () => {
    try {
      setLoading(true);
      const res = await sendOtpApi(mobile);

      // expecting: { sessionId: "xxxx-xxx", message: "Otp sent" }
      setSessionId(res.sessionId);
      setStep("otp");

    } catch (err) {
      console.error("Send OTP Error:", err);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const code = otp.join("");
      const res = await verifyOtpApi(sessionId, code, mobile);
      localStorage.setItem("authToken", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      
      console.log("Verified:", res);

      alert("OTP Verified!");
      navigate("/")
      

    } catch (err) {
      console.error("Verify Error:", err);
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">
        
        {/* STEP: MOBILE */}
        {step === "mobile" && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>

            <label className="block mb-2 text-gray-700">Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              maxLength={10}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter mobile number"
            />

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP: OTP */}
        {step === "otp" && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Enter OTP</h2>

            <p className="text-gray-600 mb-4">
              OTP sent to <b>{mobile}</b>
            </p>

            <div className="flex justify-between gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-12 h-12 border rounded-lg text-center text-xl focus:ring focus:ring-blue-300"
                />
              ))}
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={sendOtp}
              className="w-full mt-3 text-blue-600 underline"
            >
              Resend OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
