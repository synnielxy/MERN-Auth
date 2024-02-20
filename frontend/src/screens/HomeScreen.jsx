import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Hero from "../components/Hero";
import { useGetPopulerMovieQuery } from "../slices/tmdbApiSlice";
import MovieCard from "../components/Movie/MovieCard";
import { IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from "../Config";

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useGetPopulerMovieQuery(currentPage);

  useEffect(() => {
    if (data && data.results) {
      if (currentPage === 1) {
        setMovies(data.results);
        setMainMovieImage(mainMovieImage || data.results[0]);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
    }
  }, [data]);

  if (error) return <div>Error: {error.message}</div>;

  const loadMoreItems = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {mainMovieImage && (
        <Hero
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${mainMovieImage.backdrop_path}`}
          title={mainMovieImage.original_title}
          text={mainMovieImage.overview}
        />
      )}
      <Container>
        <h1>Movies by latest</h1>
        <hr />
        <Row className="mt-5">
          {movies &&
            movies.map((movie, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <MovieCard
                  key={index}
                  movieId={movie.id}
                  title={movie.original_title}
                  description={movie.overview}
                  imageUrl={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                      : null
                  }
                  releaseYear={movie.release_date}
                  rating={movie.vote_average}
                />
              </Col>
            ))}
        </Row>
        {isLoading && <div>Loading...</div>}

        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="primary" className="me-3" onClick={loadMoreItems}>
            Load More
          </Button>
        </div>
      </Container>
    </>
  );
};

export default HomeScreen;