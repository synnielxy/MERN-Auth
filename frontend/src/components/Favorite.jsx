import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import {
  useGetFavoriteNumberMutation,
  useGetFavoritedMutation,
  useAddToFavoriteMutation,
  useRemoveFromFavoriteMutation,
} from "../slices/favoriteApiSlice";
import { toast } from "react-toastify";

function Favorite(props) {
  const { userInfo } = useSelector((state) => state.auth);

  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const variables = {
    movieId: movieId,
    userFrom: userFrom,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime,
  };

  const [getFavoriteNumber] = useGetFavoriteNumberMutation();
  const [getFavorited] = useGetFavoritedMutation();
  const [addToFavorite] = useAddToFavoriteMutation();
  const [removeFromFavorite] = useRemoveFromFavoriteMutation();

  const clickHandler = async () => {
    if (!userInfo) {
      toast.error("Please Log in first");
      return;
    }

    if (favorited) {
      try {
        const res = await removeFromFavorite(variables);
        toast.success("Remove From Favorite successfully");
        setFavoriteNumber(favoriteNumber - 1);
        setFavorited(!favorited);
      } catch (err) {
        toast.error("Failed to Remove From Favorite");
      }
    } else {
      try {
        const res = await addToFavorite(variables);
        toast.success("Add To Favorite successfully");
        setFavoriteNumber(favoriteNumber + 1);
        setFavorited(!favorited);
      } catch (err) {
        toast.error("Failed to Add To Favorite");
      }
    }
  };

  useEffect(() => {
    const fetchFavoriteNumber = async () => {
      try {
        const res = await getFavoriteNumber({ movieId });
        setFavoriteNumber(res.data.subscribeNumber);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchFavorited = async () => {
      try {
        const res = await getFavorited(variables);
        setFavorited(res.data.subcribed);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFavoriteNumber();
    fetchFavorited();
  }, [movieId]);

  return (
    <div>
      <Button
        variant={!favorited ? "secondary" : "primary"}
        onClick={clickHandler}
      >
        {!favorited ? "Add to Favorite" : "Not Favorite"} {favoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
