import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import {
  useGetFavoredMoviesMutation,
  useRemoveFromFavoriteMutation,
} from "../slices/favoriteApiSlice";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../Config";

function FavoriteScreen(props) {
  const { userInfo } = useSelector((state) => state.auth);

  const [favorites, setFavorites] = useState([]);

  let variable = { userFrom: userInfo._id };

  const [getFavoredMovies, { isLoading }] =
    useGetFavoredMoviesMutation(variable);

  const [removeFromFavorite] = useRemoveFromFavoriteMutation();

  const fetchFavoredMovie = async () => {
    const favoredMovies = await getFavoredMovies(variable);
    setFavorites(favoredMovies.data.favorites);
  };
  
  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const onClickDelete = async (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
    };
    const res = await removeFromFavorite(variables);
    console.log(res);
    fetchFavoredMovie();
  };

  const renderCards = favorites.map((favorite, index) => {
    const popover = (
      <Popover id="popover-basic" style={{ maxWidth: "none" }}>
        <Popover.Header as="h3">{favorite.movieTitle}</Popover.Header>
        <Popover.Body>
          {favorite.moviePost ? (
            <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePost}`} />
          ) : (
            "no image"
          )}
        </Popover.Body>
      </Popover>
    );

    return (
      <tr key={index}>
        <OverlayTrigger
          trigger={["hover", "focus"]}
          placement="right"
          overlay={popover}
        >
          <td>{favorite.movieTitle}</td>
        </OverlayTrigger>

        <td>{favorite.movieRunTime} mins</td>
        <td>
          <Button
            variant="secondary"
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            {" "}
            Remove{" "}
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "1rem auto" }}>
      <h3>Favorite Movies By Me</h3>
      <hr />
      {!userInfo ? (
        <div
          style={{
            width: "100%",
            fontSize: "2rem",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Please Log in first...</p>
          <LinkContainer to="/login">Go to Login page</LinkContainer>
        </div>
      ) : (
        !isLoading && (
          <Table>
            <thead>
              <tr>
                <th>Movie Title</th>
                <th>Movie RunTime</th>
                <td>Remove from favorites</td>
              </tr>
            </thead>
            <tbody>{renderCards}</tbody>
          </Table>
        )
      )}
    </div>
  );
}

export default FavoriteScreen;
