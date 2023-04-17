import React, { useEffect, useState } from 'react';
import { Box, Stack, TablePagination, styled } from "@mui/material";
import { Country } from "../../types/country"
import { CardItem } from "../CardItem/";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addCountry, removeCountry } from '../../store/slices/countriesSlice';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";

type Props = {
  list: Country[];
  updateList: (country: Country) => void;
}

export const CardList: React.FC<Props> = ({
  list,
  updateList}) => {
  const { savedCountries } = useAppSelector(state => state.savedCountries);
  const dispatch = useAppDispatch();

  const [count, setCount] = useState(initCount);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newCardCount = Math.floor((width - 20) / 210);

      setCount(newCardCount > 5 ? 5 : newCardCount);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const [correctList, setCorrectList] = useState<Country[]>([])
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const start = (currentPage) * rowsPerPage;
  const end = (
    (currentPage) * rowsPerPage + rowsPerPage > list.length - 1
      ? list.length
      : (currentPage) * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    setCorrectList(list.slice(start, end));
  }, [list, currentPage, rowsPerPage]);

  const isCountryInStore = (country: Country) => {
    return savedCountries.some(item => item.name.official === country.name.official);
  }

  const addCardToStore = (country: Country) => {
    isCountryInStore(country)
      ? dispatch(removeCountry(country))
      : dispatch(addCountry(country));
  }

  const removeCardFromList = (country: Country) => {
    dispatch(removeCountry(country));
    updateList(country);
  }

  function moveCards(
    sourceId: string,
    sourceIndex: number,
    targetIndex: number
  ) {
    const nextState = swap(correctList, sourceIndex, targetIndex);
    setCorrectList(nextState);
  }

  function initCount() {
    const width = window.innerWidth;
    const newCardCount = Math.floor((width - 20) / 210);

    return newCardCount > 5 ? 5 : newCardCount;
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const Pagination = styled(TablePagination)({
    display: 'block',
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    bottom: '52px',
    left: 0,
    transform: 'translate(0, 0)'
  });

  const rowHeight = 300;

  return (
    <>
      <GridContextProvider onChange={moveCards}>
        <GridDropZone
          id="items"
          boxesPerRow={count}
          rowHeight={rowHeight}
          style={{ height: 300 * Math.ceil(correctList.length / count) + 20, }}
        >
          {correctList.map((item) => (
            <GridItem key={item.name.official}>
              <CardItem
                country={item}
                checked={isCountryInStore(item)}
                addCardToStore={addCardToStore}
                removeCard={removeCardFromList}
              />
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
      {Math.ceil(list.length / 15) > 1 && (
        <Stack>
          <Pagination
            count={list.length}
            page={currentPage}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={'Countries per page'}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      )}
    </>
  )
}