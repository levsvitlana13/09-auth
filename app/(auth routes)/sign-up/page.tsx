'use client';

import SignUpForm from '@/components/SignUpForm/SignUpForm';

import css from './SignUpPage.module.css';

export default function SignUpPage() {
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <SignUpForm />
    </main>
  );
}