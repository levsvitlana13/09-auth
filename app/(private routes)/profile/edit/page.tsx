'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from '../ProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();

  const { user, setUser } = useAuthStore();

  const [username, setUsername] = useState(
    user?.username ?? '',
  );


  if (!user) {
    return null;
  }


  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      const updatedUser = await updateMe({
        username,
      });

      setUser(updatedUser);

      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };


  const handleCancel = () => {
    router.back();
  };


  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>

        <h1 className={css.formTitle}>
          Edit Profile
        </h1>


        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />


        <form
          className={css.profileInfo}
          onSubmit={handleSubmit}
        >

          <div className={css.usernameWrapper}>

            <label htmlFor="username">
              Username:
            </label>

            <input
              id="username"
              type="text"
              value={username}
              className={css.input}
              onChange={(event) =>
                setUsername(event.target.value)
              }
            />

          </div>


          <p>
            Email: {user.email}
          </p>


          <div className={css.actions}>

            <button
              type="submit"
              className={css.saveButton}
            >
              Save
            </button>


            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </main>
  );
}