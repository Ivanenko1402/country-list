import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Country } from "../types/country";
import { Grid, Typography, Box, Link, styled } from '@mui/material';
import { Loader } from '../components/Loader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppSelector } from '../store/hooks';

export const TargetCountryPage = () => {
  const { id = '' } = useParams();
  const { savedCountries } = useAppSelector(state => state.savedCountries)
  const [isLoading, setIsLoading] = useState(false)
  const [country, setCountry] = useState<Country | null>(null)

  const fetchFullNameData = async (str: string) => {
    const URL = `https://restcountries.com/v3.1/alpha/${str}`;
    setIsLoading(true);

    try {
      const response = await fetch(URL);
      const data = await response.json();
      setCountry(data[0]);
    } catch (error) {
      alert(error);
      window.location.reload();
    } finally {
      setIsLoading(false);
    }
  }

  const isAdded = () => {
    return savedCountries.some(item => item.name.official === country?.name.official)
  }

  useEffect(() => {
    if (id) {
      fetchFullNameData(id);
    }
  }, [id])

  const TextConteiner = styled(Typography)({
    textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '5px',
  });

  return (
    <>
      <Loader isLoading={isLoading} />
      {!isLoading && !country && <h1>Somesing went wrong</h1>}
      {!isLoading && country && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            {country.name.official}
            {isAdded() && (
              <Box display="flex" justifyContent="center">
                <FavoriteIcon color="success" />
                <Typography variant="body1">Added to store</Typography>
              </Box>
            )}
          </Typography>
          <Grid
            container
            spacing={6}
            justifyContent='center'
            height='100%'
            alignItems='center'
            padding='0 20px'
          >
            <Grid item xs={12} md={4}>
              <img
                src={country.coatOfArms.png}
                alt={country.name.official}
                style={{ maxHeight: '330px', display: 'flex', margin: '0 auto' }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextConteiner>
                <span>
                  Continents: <b>{country.continents[0]}</b>
                </span>
                <hr />
                <span>
                  Region: <b>{country.region}</b>
                </span>
                <hr />
                <span>
                  Subregion: <b>{country.subregion}</b>
                </span>
                <hr />
                <span>
                  Capital city: <b>{country.capital[0]}</b>
                </span>
                <hr />
                <span>
                  Languages: <b>{Object.values(country.languages)[0]}</b>
                </span>
                <hr />
                <span>
                  Population: <b>{(country.population).toLocaleString()} people</b>
                </span>
                <hr />
                <span>
                  Status: <b>{country.status}</b>
                </span>
                <hr />
                <span>
                  Google Maps: <Link href={country.maps.googleMaps} target='_blank' rel='noreferr'>Link</Link>
                </span>
                <hr />
              </TextConteiner>
            </Grid>
            <Grid item xs={12} md={4}>
              <img
                src={country.flags.png}
                alt={country.name.official}
                style={{ width: '100%'}}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}