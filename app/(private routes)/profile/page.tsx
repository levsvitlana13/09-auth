import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getCurrentUser } from '@/lib/api/serverApi';

import css from './ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'User profile page',
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile page</h1>

          <Link
            href="/profile/edit"
            className={css.editProfileButton}
          >
            Edit profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>
            <strong>Username:</strong> {user.username}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </main>
  );
}