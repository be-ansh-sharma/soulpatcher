import headerconfig from 'config/header.json';
import categoryconfig from 'config/widgets.json';
import Grid from 'containers/grid/Grid';

export default function Widgets() {
  return (
    <>
      <Grid list={categoryconfig} />
    </>
  );
}
