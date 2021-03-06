import MyPokemonDetail from "src/screens/MyPokemonDetail";

export default MyPokemonDetail;

export async function getServerSideProps(ctx) {
  const name = ctx.query.name;
  const id = ctx.query.id;

  return {
    props: { name, id },
  };
}
