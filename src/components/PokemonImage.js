import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import Image from "next/image";
import Router from "next/router";
import ModalNickname from "src/components/ModalNickname";
import { PokemonContext } from "src/contexts/PokemonContext";
import { capitalize, leadZero } from "src/utils/leadZero";

function PokemonImage({ pokemon, id, owned }) {
  const { releasePokemon, myPokemons } = useContext(PokemonContext);

  const [isCatching, setIsCatching] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [fail, setFail] = useState(false);

  const catchPokemon = () => {
    setIsCatching(true);
    setTimeout(() => {
      const stat = Math.random() > 0.5;

      if (stat) {
        setOpenModal(true);
      } else {
        setFail(true);

        setTimeout(() => {
          setFail(false);
        }, 1000);
      }

      setIsCatching(false);
    }, 2000);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Detail>
      <div className="info">
        <div className="back-btn" onClick={() => Router.back()}>
          <ArrowBackIosIcon />
        </div>
        <div>
          <div className="id">#{leadZero(pokemon.id, 3)}</div>
          <div className="title">
            {capitalize(pokemon.name)}{" "}
            <span className="nickname">
              {id && `[${myPokemons[id]?.nickname}]`}
            </span>
          </div>
        </div>
      </div>

      <div className="image pokemon">
        {isCatching ? (
          <Image
            alt=".."
            width={350}
            height={350}
            className="balls"
            src="/pokeball2.png"
          />
        ) : (
          <Image
            alt="pokemon"
            width={350}
            height={350}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          />
        )}
      </div>

      <Catch>
        {isCatching ? (
          <div className="catcing">Catching ...</div>
        ) : owned ? (
          <button className="btn red" onClick={() => releasePokemon(id)}>
            <CatchingPokemonIcon className="btn-icon" />
            Release
          </button>
        ) : fail ? (
          <div className="catcing helper">Catch Failed!! Don&#39;t give up</div>
        ) : (
          <button className="btn" onClick={catchPokemon}>
            <CatchingPokemonIcon className="btn-icon" />
            {!isCatching ? "Catch Pokemon" : "Catching"}
          </button>
        )}
      </Catch>

      <ModalNickname open={openModal} data={pokemon} close={handleClose} />
    </Detail>
  );
}

const Detail = styled.div`
  width: 100%;
  max-height: calc(100vh - 260px);

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

      @media only screen and (max-width: 600px) {
        display: none;
      }
    }

    .id {
      font-weight: bold;
      font-size: 20px;
      margin: 0px;
      color: white;
    }

    .title {
      font-size: 30px;
      font-weight: bold;
      color: white;
    }

    .nickname {
      color: yellow;
      font-size: 16px;
    }
  }

  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 50px;
  }

  .pokemon {
    position: relative;
    animation: float 3s ease-out infinite;
    filter: drop-shadow(0 0 0.75rem crimson);
  }

  .balls {
    filter: unset;
    animation: unset;
    -webkit-animation: spin 0.4s linear infinite;
    -moz-animation: spin 0.4s linear infinite;
    animation: spin 0.4s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes float {
    50% {
      transform: translate(0, 20px);
    }
  }
`;

const Catch = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    width: 100%;
    bottom: 0;
    position: fixed;
    background: #2a2a39;
    border-top: 1px solid #3a3f50;
    right: 0;
    left: 0;
    padding: 15px;
    z-index: 1000;
    .btn {
      width: 100%;
    }
  }

  .catcing {
    color: #ffffff;
    font-size: 15px;
    font-weight: 800;
    padding: 10px 0px;
  }

  .btn {
    color: white;
    padding: 10px 30px;
    font-weight: 800;
    border-radius: 8px;
    font-size: 15px;
    background: #046cfc;
    cursor: pointer;
    border: none;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    transition: 0.3s;

    &:hover {
      background: yellow;
      color: #000000;
    }

    &::disabled {
      background: #212121;
    }

    .btn-icon {
      font-size: 17px;
      margin-right: 5px;
    }
  }

  .red {
    background: red;
  }

  .helper {
    color: red;
  }
`;

export default PokemonImage;
