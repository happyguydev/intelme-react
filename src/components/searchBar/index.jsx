import React, { useState } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from '@reach/combobox';

import { ReactComponent as SearchEyeglass } from '../icons/search-eyeglass.svg';

import '@reach/combobox/styles.css';
import './styles.scss';

const SearchBar = () => {
  const [value, setValue] = useState('');

  return (
    <div className="search-container">
      <SearchEyeglass />
      <Combobox aria-label="custom option demo">
        <ComboboxInput
          placeholder="Search for anything..."
          onChange={(e) => setValue(e.target.value)}
        />
        {value ? <button className="searchButton">Search</button> : null}
        {/* <ComboboxPopover>
          <ComboboxList>
            <ComboboxOption value="Apple">
              🍎 <ComboboxOptionText />
            </ComboboxOption>
            <ComboboxOption value="Banana">
              🍌 <ComboboxOptionText />
            </ComboboxOption>
            <ComboboxOption value="Orange">
              🍊 <ComboboxOptionText />
            </ComboboxOption>
            <ComboboxOption value="Pineapple">
              🍍 <ComboboxOptionText />
            </ComboboxOption>
            <ComboboxOption value="Kiwi">
              🥝 <ComboboxOptionText />
            </ComboboxOption>
          </ComboboxList>
        </ComboboxPopover> */}
      </Combobox>
    </div>
  );
};

export default SearchBar;
