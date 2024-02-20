import Card from "react-bootstrap/Card";

function GridCards({name, imageUrl}) {
  return (
  <Card
    style={{
      width: "100%",
    }}
  >
    <Card.Img variant="top" src={imageUrl} />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
    </Card.Body>
  </Card>
  );

};

export default GridCards;
