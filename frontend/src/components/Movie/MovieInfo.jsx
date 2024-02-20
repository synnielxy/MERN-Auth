import Table from 'react-bootstrap/Table';

function MovieInfo(props) {
  const { movie } = props;

  return (
    <>
      <h2>Movie Info</h2>
      <Table bordered hover>
        <tbody>
          <tr>
            <td>Title</td>
            <td>{movie.original_title}</td>
          </tr>
          <tr>
            <td>Release Date</td>
            <td>{movie.release_date}</td>
          </tr>
          <tr>
            <td>Revenue</td>
            <td>{movie.revenue}</td>
          </tr>
          <tr>
            <td>Runtime</td>
            <td>{movie.runtime} minutes</td>
          </tr>
          <tr>
            <td>Vote Average</td>
            <td>{movie.vote_average}</td>
          </tr>
          <tr>
            <td>Vote Count</td>
            <td>{movie.vote_count}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{movie.status}</td>
          </tr>
          <tr>
            <td>Popularity</td>
            <td>{movie.popularity}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default MovieInfo;