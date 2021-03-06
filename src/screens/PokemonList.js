import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useContext, useMemo } from "react";
import Container from "src/components/Container";
import MetaTags from "src/components/MetaTags";
import PokemonBall from "src/components/PokemonBall";
import PokemonCard from "src/components/PokemonCard";
import { PokemonContext } from "src/contexts/PokemonContext";
import styled from "@emotion/styled";

const PokemonCaught = dynamic(() => import("src/components/PokemonCaught"), {
  ssr: false,
});

const InfiniteScroll = dynamic(() => import("react-infinite-scroller"), {
  ssr: false,
});

function PokemonList() {
  const { pokemons, hasMore, loadMore } = useContext(PokemonContext);

  const Loading = () => {
    return (
      <Grid container spacing={2}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Grid item lg={2} md={3} sm={6} xs={6} key={index}>
            <Skeleton />
          </Grid>
        ))}
      </Grid>
    );
  };

  const pokemonList = useMemo(() => {
    return pokemons.map((item, i) => <PokemonCard data={item} key={i} />);
  }, [pokemons]);

  return (
    <Container>
      <MetaTags title="Pokemons" />
      <PokemonCaught />

      <ScrollWrapper>
        <InfiniteScroll
          initialLoad={false}
          loadMore={loadMore}
          hasMore={hasMore}
          threshold={800}
          loader={<Loading key={0} />}
        >
          <Grid className="grid" container spacing={2}>
            {pokemonList}
          </Grid>
        </InfiniteScroll>
      </ScrollWrapper>

      <Link href="/mypokemons">
        <PokemonBall />
      </Link>
    </Container>
  );
}

const Skeleton = styled.div`
  border-radius: 8px;
  height: 247px;
  width: 100%;
  border: 1px solid #3a3f50;
  background: #1d1d27;
`;

const ScrollWrapper = styled.div`
  .grid {
    margin-bottom: 15px;
  }
`;

export default PokemonList;
