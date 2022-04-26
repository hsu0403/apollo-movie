import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: ID!) {
    Movie(id: $id) {
      id
      language
      rating
      title
      medium_cover_image
      isLiked @client
    }
    Suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id },
  });
  console.log(data);
  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? "Loading..."
            : `${data.Movie.title} ${data.Movie.isLiked ? "❤️" : "😂"}`}
        </Title>
        <Subtitle>
          {data?.Movie?.language} · {data?.Movie?.rating}
        </Subtitle>
        <Description>{data?.Movie?.medium_cover_image}</Description>
        )}
      </Column>
      <Poster bg={data?.Movie?.medium_cover_image}></Poster>
    </Container>
  );
};

export default Detail;
