// src/components/SignInPopup.jsx
import { useState } from "react";

// Dữ liệu người dùng mẫu (giả lập database)
const MOCK_USERS = [
  {
    email: "user@example.com",
    password: "password123",
    first_name: "John",
    last_name: "Doe"
  },
  {
    email: "admin@example.com",
    password: "admin123",
    first_name: "Admin",
    last_name: "User"
  }
];

const SignInPopup = ({ setIsOpen, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Giả lập độ trễ của mạng
    setTimeout(() => {
      // Tìm người dùng trong danh sách mẫu
      const foundUser = MOCK_USERS.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        // Loại bỏ mật khẩu trước khi lưu vào localStorage
        const { password, ...userWithoutPassword } = foundUser;
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        setIsOpen(false);
      } else {
        setError("Email hoặc mật khẩu không chính xác");
      }

      setIsLoading(false);
    }, 500);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Đăng nhập</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {error && (
            <div className="p-2 mb-4 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Thông tin đăng nhập mẫu:</p>
            <p>Email: user@example.com</p>
            <p>Mật khẩu: password123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPopup;