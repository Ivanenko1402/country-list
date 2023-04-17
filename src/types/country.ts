export type Country = {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  status: string;
  continents: string[];
  population: number,
  unMember: boolean;
  currencies: {
    code: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    code: string;
  };
  translations: {
    code: {
      official: string;
      common: string;
    };
  };
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  flag: string;
  flags: {
    svg: string;
    png: string;
  };
  demonyms: {
    code: {
      f: string;
      m: string;
    };
  };
  callingCodes: string[];
  startOfWeek: string;
  capitalInfo: {
    latlng: number[];
  };
  postalCode: {
    format: string;
    regex: string;
  };
  car: {
    signs: string[];
    side: string;
  };
  continent: string[];
  gini: {
    year: number;
  };
  timezones: string[];
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
};
