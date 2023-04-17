import { useState, useEffect, useCallback } from 'react';
import { Country } from '../types/country';
import { CardList } from '../components/CardList';
import { Loader } from '../components/Loader';
import { useAppSelector } from '../store/hooks';
import { useSearchParams } from 'react-router-dom';
import { Alert, styled } from '@mui/material';

export const HomePage: React.FC = () => {
  const { savedCountries } = useAppSelector(state => state.savedCountries);

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [countryFromServer, setCountryFromServer] = useState<Country[]>([]);
  const [visibleCountry, setVisibleCountry] = useState<Country[]>([]);

  const fetchData = useCallback(async (value: string) => {
    const URL = `https://restcountries.com/v3.1/name/${value}`;
    const response = await fetch(URL);
    const data = await response.json();

    
    try {
      if (data.status === 404) {
        setIsError(true);
        return;
      }

      setCountryFromServer(data);
      setIsError(false);

    } catch (error: any) {
      alert(error.message);
      window.location.reload();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filterCountryFromServer = useCallback((country: Country) => {
    setCountryFromServer(prevState => prevState.filter(item => item.name.official !== country.name.official));
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [isError])

  useEffect(() => {
    if (!name) {
      setCountryFromServer([]);
      setIsLoading(false);
      setIsError(false);
      return;
    }

    const data = setTimeout(() => {
      setIsLoading(true);

      if (name) {
        fetchData(name);
      }

    }, 1000);

    return () => {
      clearTimeout(data);
    }
  }, [name]);

  useEffect(() => {
    if (!Array.isArray(countryFromServer)) {
      return;
    }
  
    const newList = countryFromServer.filter(country => {
      return !savedCountries.some(savedCountry => savedCountry.name.official === country.name.official);
    });
  
    setVisibleCountry([...savedCountries, ...newList])
  }, [countryFromServer, savedCountries]);

  const AlertContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
  });

  return (
    <div style={{ position: 'relative' }}>
      {!isError && !name && !isLoading && Boolean(!visibleCountry.length) && (
        <AlertContainer>
          <Alert variant="outlined" severity="success">
            Enter characters to retrieve and display a list of countries.
          </Alert>
        </AlertContainer>
      )}
      {isError && name && !isLoading && (
        <AlertContainer>
          <Alert variant="outlined" severity="warning">
            Incorrect input, no country found!
          </Alert>
        </AlertContainer>
      )}
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <CardList
          list={visibleCountry}
          updateList={filterCountryFromServer}
        />
      )}
    </div>
  );
};
