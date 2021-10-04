import React, { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER, LOGIN } from '../queries'
import AuthContext from '../context/auth-context';
import Error from '../components/Error';
import Spinner from '../components/Spinner';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const value = useContext(AuthContext);
    const [alert, setAlert] = useState("");

    function Auth() {
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [auth, { loading, data }] = useMutation(isLogin ? LOGIN : CREATE_USER, {
            onError: (error) => setAlert(error.message),
            onCompleted: () => {
                if (!isLogin) {
                    setAlert("تم إنشاء الحساب بنجاح");
                    setIsLogin(true)
                }
            }
        });
        useEffect(() => {
            if (isLogin && !loading && data) {
                value.login(data.login.token, data.login.userId);
                const token = data.login.token;
                localStorage.setItem("token", token);
                const userId = data.login.userId;
                localStorage.setItem("userId", userId);
            }
        }, [data, loading]);

        if (loading) return <Spinner />;

        return (
            <form className='auth-form' onSubmit={() =>
                auth({ variables: !isLogin ? { username: username, email: email, password: password } : { email: email, password: password } })
            }>
                <Error error={alert} />
                {!isLogin &&
                    <div className='form-control'>
                        <label htmlFor='username'>اسم المستخدم</label>
                        <input
                            id="username"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                            required
                        />
                    </div>}
                <div className='form-control'>
                    <label htmlFor='email'>البريد الالكتروني</label>
                    <input
                        id="email"
                        type= "email"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        required
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>كلمة المرور</label>
                    <input
                        id="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        type="password"
                        required
                    />
                </div>
                <div className='form-actions'>
                    <button type='submit' className="submit-btn">إرسال</button>
                    <button type='button' onClick={() => { setIsLogin(!isLogin); }}>
                        انتقل إلى {isLogin ? 'إنشاء حساب' : 'تسجيل الدخول'}
                    </button>
                </div>
            </form>
        );
    }

    return (
        <Auth />
    )
}

