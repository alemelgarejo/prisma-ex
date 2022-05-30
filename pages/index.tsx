import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Movie } from "../interfaces/Movie";
import { prisma, PrismaClient } from "@prisma/client";
import { useState } from "react";
import Link from "next/link";

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();
  const data = await prisma.movie.findMany();

  return {
    props: {
      data: data,
    },
  };
};

interface MovieProps {
  movies: Movie[];
}

const Home: React.FunctionComponent<MovieProps> = ({ data }: any) => {
  const [formData, setFormData] = useState({});
  const [movies, setMovies] = useState(data)

  async function saveMovie(e:React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setMovies([...movies, formData])
    const res = await fetch('/api/movies', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie List</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul className={styles.movielist}>
          {movies.map((movie, index) => (
            <li key={index}>
              <span>
                <strong>{movie.title}</strong>
              </span>
              <span>{movie.year}</span>
              <span>
                <i>{movie.description}</i>
              </span>
              <Link href={`/movies/${movie.slug}`}>
                <a className={styles.text}>More about the movie</a>
              </Link>
            </li>
          ))}
        </ul>

        <form className={styles.movieform} onSubmit={saveMovie}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={(e) =>
              setFormData({ ...formData, year: +e.target.value })
            }
          />
          <textarea
            name="description"
            id=""
            cols={30}
            rows={10}
            placeholder="Description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Slug"
            name="slug"
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
          <button type="submit">Add movie</button>
        </form>
      </main>
    </div>
  );
};

export default Home;
