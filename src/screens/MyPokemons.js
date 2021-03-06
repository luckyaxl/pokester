import styled from "@emotion/styled";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Grid from "@mui/material/Grid";
import Router from "next/router";
import React, { useContext } from "react";
import Container from "src/components/Container";
import MetaTags from "src/components/MetaTags";
import NavBar from "src/components/NavBar";
import PokemonCard from "src/components/PokemonCard";
import { PokemonContext } from "src/contexts/PokemonContext";

function PokemonDetail() {
  const { myPokemons } = useContext(PokemonContext);

  return (
    <Container>
      <MetaTags title="My Pokemons" />
      <NavBar title="My Pokemons" />
      <Header>
        <div className="info layout">
          <div className="back-btn" onClick={() => Router.back()}>
            <ArrowBackIosIcon />
          </div>
          <div>
            <div className="title">My Pokemons</div>
            <div className="caught">{myPokemons.length} Pokemons Caught</div>
          </div>
        </div>
      </Header>
      <Grid container spacing={2} className="layout">
        {myPokemons.map((item, i) => (
          <PokemonCard data={item} key={i} owned={true} index={i} />
        ))}
      </Grid>
    </Container>
  );
}

const Header = styled.div`
  @media only screen and (max-width: 600px) {
    display: none;
  }

  .info {
    margin-bottom: 30px;
    display: flex;
    align-items: flex-start;
    align-items: center;

    .back-btn {
      cursor: pointer;
      color: #ffffff;
      margin-right: 10px;

      &:hover {
        color: #a5a5a5;
      }
    }

    .title {
      font-weight: bold;
      font-size: 24px;
      margin: 0px 0px 4px;
      color: white;
    }

    .caught {
      font-size: 18px;
      color: yellow;
    }
  }
`;

export default PokemonDetail;
