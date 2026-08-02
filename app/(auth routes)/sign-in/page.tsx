'use client';

import SignInForm from '@/components/SignInForm/SignInForm';

import css from './SignInPage.module.css';

export default function SignInPage() {
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign in</h1>

      <SignInForm />
    </main>
  );
}