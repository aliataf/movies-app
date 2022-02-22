import Layout from "components/Layout";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { User } from "pages/api/user";

import { InferGetServerSidePropsType } from "next";

import * as config from "../../config";
import { Movie } from "components/Movie";
import styled from "styled-components";
import { useEffect, useState } from "react";

const MoviesWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export default function Movies({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    let moviesUrl = `${config.BASE_API_URL}/movie/popular${config.API_KEY}&page=1`;

    let genresListUrl = `${config.BASE_API_URL}/genre/movie/list${config.API_KEY}&language=en-US`;

    fetch(moviesUrl)
      .then((response1) => response1.json())
      .then((response1) => {
        // fetch the list of genres and update the state
        fetch(genresListUrl)
          .then((response2) => response2.json())
          .then((response2) => {
            setMovies(
              response1.results.map((movie: any) => {
                const genres = response2.genres
                  .filter((genre: any) =>
                    movie.genre_ids.find((id: any) => id === genre.id)
                  )
                  .map((genre: any) => genre.name);
                return {
                  ...movie,
                  genres: genres ? genres : [],
                };
              })
            );

            setTimeout(() => {
              console.log("a", movies);
            }, 1000);
          });
      });
  }, []);

  return (
    <Layout>
      {user?.isLoggedIn && (
        <>
          <h1>Movies</h1>
          <MoviesWrapper>
            {movies.map((movie: any) => (
              <Movie key={movie.id} movie={movie} />
            ))}
          </MoviesWrapper>
        </>
      )}
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: { isLoggedIn: false, login: "", avatarUrl: "" } as User,
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
},
sessionOptions);
