import { useState } from 'react';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiClock } from 'react-icons/fi';
// Importamos las funciones de autenticación necesarias de Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config.ts'; // Asegúrate de que este archivo configure correctamente Firebase
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  //const [error, setError] = useState(null); // Para manejar errores
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga
  const navigate = useNavigate(); // Hook para navegación
  // Manejar cambios en los campos del formulario
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        // Lógica para iniciar sesión
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
        );
        console.log('Inicio de sesión exitoso');
        const user = userCredential.user;

        const { data } = await axios.get(
          `http://localhost:3001/usersdata/${user.uid}`
        );

        navigate("/dashboard", {
          state: {
            name: data.name || "User", // Usa `displayName` si está configurado, o un valor por defecto.
            email: user.email,
            uid: user.uid,
          },
        })
        //console.log(data)
        
      } else {
        // Lógica para registrar un nuevo usuario
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log('Registro exitoso');
        const user = userCredential.user; // Usuario autenticado por Firebase.
  
        // Enviar datos adicionales al backend para guardarlos en PostgreSQL.
        await axios.post("http://localhost:3001/register", {
          name: formData.name,
          email: user.email,
          firebaseUid: user.uid,
        });
  
        console.log('Usuario guardado en la base de datos.');
  
        // Navegar al dashboard después del registro.
        navigate("/dashboard", {
          state: {
            name: formData.name, // Nombre proporcionado al registrarse.
            email: user.email,
            uid: user.uid,
          },
        });
      }
    } catch (err:any) {
      if (err.code === "auth/email-already-in-use") {
        setError("El correo electrónico ya está registrado. Por favor, prueba con otro.");
      } else {
        setError("Ocurrió un error al registrarte. Por favor, inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Alternar entre formulario de login y registro
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setError(null);
  };

  // Alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {+
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <FiClock className="h-12 w-12 text-indigo-500" aria-hidden="true" />
          <h1 className="mt-2 text-center text-3xl font-extrabold text-white">Deadline</h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-white">
            {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">Nombre</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">Correo electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 ${
                    isLogin ? 'rounded-t-md' : ''
                  } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10`}
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10 pr-12"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-10">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-300 focus:outline-none z-10"
                  >
                    {showPassword ? <FiEyeOff className="h-5 w-5" aria-hidden="true" /> : <FiEye className="h-5 w-5" aria-hidden="true" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Mostrar errores */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-300 hover:text-white hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              disabled={loading} // Desactivar botón mientras está cargando
            >
              {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-400">
            {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
            <button
              onClick={toggleForm}
              className="font-medium text-indigo-400 hover:text-indigo-300 ml-2 underline"
            >
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;