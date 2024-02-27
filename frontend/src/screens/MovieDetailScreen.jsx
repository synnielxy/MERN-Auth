import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetMovieQuery, useGetCastsQuery } from "../slices/tmdbApiSlice";
import { useGetCommentsQuery } from "../slices/commentApiSlice";
import Hero from "../components/Hero";
import MovieInfo from "../components/Movie/MovieInfo";
import GridCards from "../components/Movie/GridCard";
import Favorite from "../components/Favorite";
import Comments from "../components/Comment/Comments";
import { IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from "../Config";

function MovieDetailScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const { movieId } = useParams();
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);
  const movieVariable = {
    movieId: movieId,
  };

  const { data: movie } = useGetMovieQuery(movieId);
  const { data: casts } = useGetCastsQuery(movieId);
  const { data: comments } = useGetCommentsQuery(movieVariable);

  useEffect(() => {
    if (movie) {
      setMovie(movie);
      setLoadingForMovie(false);
    }
  }, [movie]);

  useEffect(() => {
    if (comments) {
      setCommentLists(comments.comments);
    }
  }, [comments]);

  useEffect(() => {
    if (casts) {
      setCasts(casts.cast);
      setLoadingForCasts(false);
    }
  }, [casts]);

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* Header */}
      {!LoadingForMovie ? (
        <Hero
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      ) : (
        <div>loading...</div>
      )}

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            userFrom={userInfo._id}
            movieId={movieId}
            movieInfo={Movie}
          />
        </div>

        {/* Movie Info */}
        {!LoadingForMovie ? <MovieInfo movie={Movie} /> : <div>loading...</div>}
        <br />

        {/* Actors Grid*/}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <Button variant="outline-dark" onClick={toggleActorView}>
            Toggle Actor View{" "}
          </Button>
        </div>
        {ActorToggle && (
          <Row xs={1} md={2} lg={4} className="g-4">
            {!LoadingForCasts ? (
              Casts.map(
                (cast, index) =>
                  cast.profile_path && (
                    <Col key={index}>
                      <GridCards
                        name={cast.name}
                        imageUrl={
                          cast.profile_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${cast.profile_path}`
                            : null
                        }
                      />
                    </Col>
                  )
              )
            ) : (
              <Col>
                <div>Loading...</div>
              </Col>
            )}
          </Row>
        )}

        {/* Comments */}
        <Comments
          movieTitle={Movie.original_title}
          CommentLists={CommentLists}
          postId={movieId}
          refreshFunction={updateComment}
        />
      </div>
    </div>
  );
}

export default MovieDetailScreen;