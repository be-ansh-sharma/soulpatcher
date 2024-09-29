import headerconfig from 'config/header.json';
import categoryconfig from 'config/categories.json';
import Grid from 'containers/grid/Grid';

export default function Home() {
  return (
    <>
      <Grid list={categoryconfig} />
    </>
  );
}

