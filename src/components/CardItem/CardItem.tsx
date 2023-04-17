import { Country } from "../../types/country"
import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Checkbox,
  IconButton,
  Box,
  styled,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from "react-router-dom";

type Props = {
  country: Country;
  checked: boolean;
  addCardToStore: (country: Country) => void;
  removeCard: (country: Country) => void;
};

export const CardItem: React.FC<Props> = React.memo(({
  country, checked, addCardToStore, removeCard,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const CardConteiner = styled(Card)({
    width: 200,
    height: 280,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',

    '&:active': {
      cursor: 'grab',
    }
  });

  const CardLink = styled(NavLink)({
    textAlign: 'center',
    textDecoration: 'none',
    userSelect: 'none',
    color: '#333',
    paddingBottom: '5px',
    'border Bottom': '1px solid #333',

    ':hover': {
      color: '#2e8b57',
      borderColor: '#2e8b57',
    },
  });

  const Img = {
    objectFit: 'cover',
    pointerEvents: 'none',
    height: '110px',
  };

  const Title = styled(Typography)({
     textOverflow: 'ellipsis',
     overflow: 'hidden',
     whiteSpace: 'nowrap',
     fontWeight: 'bold',
     fontSize: '21px',
     padding: '10px 0',
  });

  const SmallText = styled(Typography)({
    padding: '10px 0',
    textAlign: 'center',
  });

  const ButtonsConteiner = styled(CardActions)({
    position: 'relative',
    bottom: '30px',
    justifyContent: 'space-between',
    opacity: isHovering ? 1 : 0,
  })


  return (
    <CardConteiner
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <CardLink to={`/countries/${country.cca2}`} draggable="false">
          <CardMedia
            component="img"
            alt={country.name.official}
            image={country.flags.png}
            sx={Img}
          />
          <CardContent>
            <Title>
              {country.name.common}
            </Title>
            <hr />
            <SmallText>
              <b>{country.cca2 + ' - ' + country.ccn3}</b>
            </SmallText>
          </CardContent>
        </CardLink>
        <ButtonsConteiner>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={checked}
              onClick={() => addCardToStore(country)}
              />
            <SmallText >
              Save
            </SmallText>
          </Box>
          <IconButton aria-label="delete" onClick={() => removeCard(country)}>
            <DeleteIcon />
          </IconButton>
        </ButtonsConteiner>
      </CardConteiner>
  );
});
