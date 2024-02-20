import { Container } from "react-bootstrap";

const Hero = (props) => {
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
            url('${props.image}'), #1c1c1c`,
        height: "500px",
        backgroundSize: "100%, cover",
        backgroundPosition: "center, center",
        width: "100%",
        position: "relative",
      }}
      className="mt-4 mb-4"
    >
      <Container>
        <div
          style={{
            position: "absolute",
            maxWidth: "500px",
            bottom: "2rem",
            marginLeft: "2rem",
            color: "white",
          }}
        >
          <h2>{props.title}</h2>
          <p>{props.text}</p>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
