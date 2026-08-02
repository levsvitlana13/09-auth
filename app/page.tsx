import css from './Home.module.css';

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>

        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing
          personal notes. It helps you organize your thoughts and keep them in
          one place, whether you&apos;re at home or on the go.
        </p>

        <p className={css.description}>
          The application offers an intuitive interface for creating, editing,
          and viewing notes. With keyword search support and structured
          organization, NoteHub provides a streamlined experience for anyone who
          values clarity and productivity.
        </p>
      </div>
    </main>
  );
}
