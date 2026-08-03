'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from '@/app/(auth routes)/sign-up/SignUpPage.module.css';

interface SignUpFormValues {
  email: string;
  password: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [error, setError] = useState('');

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setError('');

      console.log('========== SIGN UP ==========');
      console.log('Form data:', data);

      const user = await register(data);

      console.log('Registration successful');
      console.log(user);

      setUser(user);

      router.push('/profile');
    } catch (err) {
      console.error('========== SIGN UP ERROR ==========');

      if (err instanceof AxiosError) {
        console.error('Status:', err.response?.status);
        console.error('Response:', err.response?.data);
      } else {
        console.error(err);
      }

      setError('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
              message: 'Password must contain at least 8 characters',
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
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </div>

      {error && <p className={css.error}>{error}</p>}
    </form>
  );
}