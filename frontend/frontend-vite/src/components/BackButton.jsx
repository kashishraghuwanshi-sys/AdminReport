import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BackButton = ({ fallback = "/", label = "← Back" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // ✅ If we came from inside app, go there
    const from = location.state?.from;

    if (from) {
      navigate(from);
      return;
    }

    // ✅ Otherwise never go "browser back" (it can exit the app)
    navigate(fallback);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50"
    >
      {label}
    </button>
  );
};

export default BackButton;