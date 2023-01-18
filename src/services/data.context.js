//filter function
/*
 * dlc/creation club - filter this last
 */
//search function
/*
 * for effect
 * for ingredient
 * not affected by filters
 */
//create function
/*
 * select ingredients to create effect - done
 * select effects to find ingredients - done
 * filter results from create
 */

/**
 * display all
 * filter before showing on screen
 */

/**
 *
 * filter at end
 * need to apply filter each page update
 * can easily filter results after create functions
 */

import React, { createContext, useState, useEffect } from "react";

export const PotionsContext = createContext();

export const PotionsContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(["base"]);

  const potions = []; //get from data

  const onSearch = (searchKeyword) => {
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (!keyword || keyword.trim().length === 0) {
      //return original potions array
      return;
    }
    potionRequest(keyword.toLowerCase())
      .then((result) => {
        //update potions array
      })
      .catch((error) => {
        setError(error);
      });
  }, [keyword]);

  return (
    <PotionsContextProvider
      value={{
        keyword,
        search: onSearch,
        potions,
        filters,
        error,
      }}
    >
      {children}
    </PotionsContextProvider>
  );
};
