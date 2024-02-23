import { useEffect, useState } from 'react';
import { loginApi } from '../../services/UserServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      // mình thấy nên ko cho click vào chớ ko nên quay về trang hôm hoặc cả 2
      navigate('/');
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Email/Password is required!');
      return;
    }
    setIsRequesting(true);
    setLoadingApi(true);
    let res = await loginApi(email, password);
    if (res && res.token) {
      localStorage.setItem('token', res.token);
      navigate('/');
    } else if (res && res.status === 400) {
      toast.error(res.data.error);
    }
    setLoadingApi(false);
    setIsRequesting(false);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login_container col-4 col-sm-4">
      <div className="title">Login</div>
      <div className="text">Email or username (eve.holt@reqres.in)</div>
      <div className="username">
        <input
          type="text"
          placeholder="Email or username..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="password">
        <input
          type={isShowPassword ? 'text' : 'password'}
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="icon">
          <i
            className={isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}
            onClick={() => {
              setIsShowPassword(!isShowPassword);
            }}
          ></i>
        </span>
      </div>
      <button
        disabled={email && password ? false : true}
        className={(email && password ? 'active' : '') + ' ' + (isRequesting ? 'is_active' : '')}
        onClick={() => handleLogin()}
      >
        {loadingApi && <i class="loading fas fa-sync fa-spin"></i>}
        Login
      </button>
      <p className="back">
        <i className="fa-solid fa-angles-left"></i> Go back
      </p>
    </div>
  );
}

export default Login;
