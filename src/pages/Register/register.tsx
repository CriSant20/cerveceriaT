import React, { useState } from 'react';
import { UserFormData, FormErrors } from '../../interfaces/Register/Register.interface';

const Register: React.FC = () => {
  const [errors, setErrors] = useState<FormErrors | null>(null);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries()) as unknown as UserFormData;
    
    // Validaciones
    const newErrors: FormErrors = {};
    
    if (!payload.name.trim()) {
      newErrors.isNameInvalid = true;
    }
    
    if (!validateEmail(payload.email)) {
      newErrors.isInvalidEmail = true;
    }

    if (payload.password.length < 8) {
      newErrors.isPasswordTooShort = true;
    } else if (!/[A-Z]/.test(payload.password) || 
               !/[0-9]/.test(payload.password) || 
               !/[^A-Za-z0-9]/.test(payload.password)) {
      newErrors.isWeakPassword = true;
    }

    if (payload.password !== payload.repeatPassword) {
      newErrors.isRepeatPasswordNotEqual = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si no hay errores
    setErrors(null);
    console.log('Form data:', payload);
    // Aquí iría tu lógica de envío del formulario
  };

  return (
    <form 
      className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md" 
      onSubmit={handleSignUp}
      noValidate
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Crea una cuenta de Usuario</h2>
       <div className="mb-4">
        <label htmlFor="cedula" className="block text-gray-700 mb-2">Cédula*</label>
        <input 
          required 
          
          type="text" 
          id="name" 
          name="name" 
          className={`w-full px-3 py-2 border ${errors?.isNameInvalid ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500`} 
        />
        {errors?.isNameInvalid && (
          <p className="mt-1 text-sm text-red-600">Por favor ingresa tu nombre</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-2">Nombre *</label>
        <input 
          required 
          type="text" 
          id="name" 
          name="name" 
          className={`w-full px-3 py-2 border ${errors?.isNameInvalid ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500`} 
        />
        {errors?.isNameInvalid && (
          <p className="mt-1 text-sm text-red-600">Por favor ingresa tu nombre</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="surname" className="block text-gray-700 mb-2">Apellido</label>
        <input 
          type="text" 
          id="surname" 
          name="surname" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500" 
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">Email *</label>
        <input 
          required 
          type="email" 
          id="email" 
          name="email" 
          className={`w-full px-3 py-2 border ${errors?.isInvalidEmail ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500`}
        />
        {errors?.isInvalidEmail && (
          <p className="mt-1 text-sm text-red-600">Por favor ingresa un email válido</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña *</label>
        <input 
          required 
          type="password" 
          id="password" 
          name="password" 
          minLength={8}
          className={`w-full px-3 py-2 border ${errors?.isPasswordTooShort || errors?.isWeakPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500`} 
          placeholder="Mínimo 8 caracteres" 
        />
        {errors?.isPasswordTooShort ? (
          <p className="mt-1 text-sm text-red-600">La contraseña debe tener al menos 8 caracteres</p>
        ) : errors?.isWeakPassword ? (
          <p className="mt-1 text-sm text-red-600">
            La contraseña debe contener mayúsculas, números y caracteres especiales
          </p>
        ) : (
          <p className="mt-1 text-sm text-gray-500">
            Usa al menos 8 caracteres con mayúsculas, números y símbolos
          </p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="repeatPassword" className="block text-gray-700 mb-2">Confirmar Contraseña *</label>
        <input 
          required 
          type="password" 
          id="repeatPassword" 
          name="repeatPassword" 
          className={`w-full px-3 py-2 border ${errors?.isRepeatPasswordNotEqual ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500`} 
        />
        {errors?.isRepeatPasswordNotEqual && (
          <p className="mt-1 text-sm text-red-600">Las contraseñas no coinciden</p>
        )}
      </div>

      <button 
        type="submit" 
        className="w-full py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-md transition duration-200"
      >
        Registrar
      </button>
    </form>
  );
};

export default Register;