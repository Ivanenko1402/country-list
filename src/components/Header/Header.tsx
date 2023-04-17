import { AppBar, Toolbar, Typography, Link, Container} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { SearchInput } from '../SearchInput';

const styles = {
  appBar: {
    backgroundColor: '#fff',
    position: 'relative',
    marginBottom: 3,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
};

export const Header = () => {
  return (
    <AppBar sx={styles.appBar}>
      <Toolbar>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link component={NavLink} to="/countries" underline="none" sx={styles.link}>
            <Typography variant="h5" component="div" sx={{ color: '#000', }}>
                My Test App
            </Typography>
          </Link>
          <SearchInput />
        </Container>
      </Toolbar>
    </AppBar>
  );
}