declare module 'react-select-country-list' {
  interface CountryData {
    value: string;
    label: string;
  }

  interface CountryList {
    getData(): CountryData[];
    getLabel(value: string): string | undefined;
    getValue(label: string): string | undefined;
    getLabels(): string[];
    getValues(): string[];
  }

  function countryList(): CountryList;

  export default countryList;
}
