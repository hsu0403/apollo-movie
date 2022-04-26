import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LIKE_MOVIE = gql`
  mutation likeMovie($id: ID!) {
    likeMovie(id: $id) @client
  }
`;

const Container = styled.div`
  height: 400px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
  background-color: transparent;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

const Button = styled.button`
  color: black;
  background-color: aliceblue;
`;

const Movie = ({ id, bg, isLiked }) => {
  const [likeM] = useMutation(LIKE_MOVIE, { variables: { id: String(id) } });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <Button onClick={likeM}>{isLiked ? "Unlike" : "Like"}</Button>
    </Container>
  );
};

export default Movie;
