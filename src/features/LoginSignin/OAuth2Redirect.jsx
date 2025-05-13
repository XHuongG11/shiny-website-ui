import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginGoogle } from "./store/authSlice";

const OAuth2RedirectHandler = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Hàm xử lý URL được chuyển hướng từ OAuth2
    const handleOAuthRedirect = () => {
      // Phân tích tham số từ URL
      const params = new URLSearchParams(location.search);
      const error = params.get("error");

      if (error) {
        setError(`Xác thực không thành công: ${error}`);
        setLoading(false);
        return;
      }

      // Lấy các thông tin từ URL
      const authorizationCode = params.get("code");
      // const state = params.get("state");
      // const scope = params.get("scope");
      // const authUser = params.get("authuser");
      // const hostedDomain = params.get("hd");

      if (!authorizationCode) {
        setError("Không có mã xác thực trong URL chuyển hướng");
        setLoading(false);
        return;
      }

      // Lưu thông tin xác thực
      // const authData = {
      //   code: authorizationCode,
      //   state,
      //   scope,
      //   authUser,
      //   hostedDomain,
      // };
      dispatch(loginGoogle(authorizationCode)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/");
        } else if (res.payload?.type === "NOT_REGISTERED") {
          navigate("/register", {
            state: {
              email: res.payload.email,
              message: "Email chưa được đăng ký. Vui lòng đăng ký.",
              from: "/login",
            },
          });
        } else {
          console.error(
            "Login failed:",
            res.payload?.message || "Không xác định"
          );
          setError("Tài khoản đã bị khóa.");
          setLoading(false);
          return;
        }
      });
    };

    handleOAuthRedirect();
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Đang xử lý xác thực...
          </h2>
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Lỗi xác thực
          </h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }
};

export default OAuth2RedirectHandler;
