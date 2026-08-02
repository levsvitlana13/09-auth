'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

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
  } = useForm<SignUpFormValues>();

  // const onSubmit = async (data: SignUpFormValues) => {
  //   try {
  //     setError('');

  //     const user = await register(data);

  //     setUser(user);

  //     router.push('/profile');
  //   } catch {
  //     setError('Registration failed');
  //   }
  // };

const onSubmit = async (data: SignUpFormValues) => {
  console.log('=== SUBMIT START ===');
  console.log(data);

  try {
    setError('');

    console.log('Calling register...');

    const user = await register(data);

    console.log('Register success:', user);

    setUser(user);

    router.push('/profile');
  } catch (error) {
    console.error('Register error:', error);
    setError('Registration failed');
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
          Register
        </button>
      </div>

      {error && <p className={css.error}>{error}</p>}
    </form>
  );
}