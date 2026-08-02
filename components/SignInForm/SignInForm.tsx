'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from '@/app/(auth routes)/sign-in/SignInPage.module.css';

interface SignInFormValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [error, setError] = useState('');

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>();

  const onSubmit = async (data: SignInFormValues) => {
    try {
      setError('');

      const user = await login(data);

      setUser(user);

      router.push('/profile');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css.form}
    >
      <div className={css.formGroup}>
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          className={css.input}
          {...registerField('email', {
            required: 'Email is required',
          })}
        />

        {errors.email && (
          <p className={css.error}>{errors.email.message}</p>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          className={css.input}
          {...registerField('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Minimum 8 characters',
            },
          })}
        />

        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
      </div>

      <div className={css.actions}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={css.submitButton}
        >
          Log in
        </button>
      </div>

      {error && <p className={css.error}>{error}</p>}
    </form>
  );
}