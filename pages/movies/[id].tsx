import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "components/Layout";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { User } from "pages/api/user";
import * as config from "../../config";
import { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import styled from "styled-components";

const MovieWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;
const Overview = styled.div`
  margin: 10px 0;
  text-align: center;
`;

export default function MovieById({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    let movieUrl = `${config.BASE_API_URL}/movie/${id}${config.API_KEY}`;

    fetch(movieUrl)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });
  }, []);

  return (
    <Layout>
      {user?.isLoggedIn && movie && (
        <>
          <h1>{movie.title}</h1>
          <MovieWrapper>
            <ImageWrapper>
              <Image
                src={`${config.IMAGE_BASE_URL}/${config.IMAGE_BACKDROP_SIZE}/${movie.poster_path}`}
                layout="responsive"
                width="100%"
                height="100%"
                objectFit="fill"
              />
            </ImageWrapper>
            <Overview>{movie.overview}</Overview>
          </MovieWrapper>
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
