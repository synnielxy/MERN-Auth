import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';

const MovieCard = ({ movieId, title, description, imageUrl, releaseYear, rating }) => {
  return (
    <Link to={`/movie/${movieId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Card
      style={{
        width: "100%",
      }}
    >
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            // height: '100px', // You might need to adjust this based on your font size and line-height
            lineHeight: "20px",
          }}
        >
          {description}
        </Card.Text>
        <Card.Text>Release Year: {releaseYear}</Card.Text>
        <Card.Text>Rating: {rating}</Card.Text>
      </Card.Body>
    </Card>
    </Link>
  );
};

export default MovieCard;
