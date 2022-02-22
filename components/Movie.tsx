// Movie card component using styled components
import { IMAGE_BASE_URL, IMAGE_POSTER_SIZE } from "config";
import Link from "next/link";
import styled from "styled-components";

export const MovieCardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

export const MovieCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

export const MovieCardGenres = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 10px 0;
  color: #999;
`;

export const MovieCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 300px;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  cursor: pointer;
`;

export function Movie({ movie }: { movie: any }) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <MovieCardWrapper>
        <MovieCardImage
          src={`${IMAGE_BASE_URL}/${IMAGE_POSTER_SIZE}/${movie.poster_path}`}
          alt=""
        />
        <MovieCardTitle>{movie.title}</MovieCardTitle>
        <MovieCardGenres>{movie.genres.join(" / ")}</MovieCardGenres>
      </MovieCardWrapper>
    </Link>
  );
}
