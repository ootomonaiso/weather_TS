import { useState } from 'react';
import { Grid } from '@mui/material';
import App from './App';
import Header from './header';
import Footer from './footer';
import { locationList } from './location_list';

const Layout = () => {
  const [location, setLocation] = useState(locationList[0]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header setLocation={setLocation} />
      </Grid>
      <Grid item xs={12} m={2}>
        <App location={location} />
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}

export default Layout
