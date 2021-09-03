import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { ReactComponent as SearchBarIcon } from '../../icons/tableSearchBar.svg';
import * as AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import * as AutosuggestHighlightParse from 'autosuggest-highlight/parse';

const SearchPeople = ({
  placeholder,
  data,
  onChange,
  searchValue,
  onSelectSuggestion,
}) => {
  const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const getSuggestions = (value) => {
    const inputValue = escapeRegexCharacters(value?.trim().toLowerCase());
    const inputLength = inputValue?.length;
    const regex = new RegExp('\\b' + inputValue, 'i');
    const names = [
      ...data.map((item) =>
        item?.name
          ? item?.name
          : !item?.firstName
          ? item?.username
          : `${item?.firstName} ${item?.lastName}`
      ),
    ];
    return inputLength === 0
      ? []
      : names.filter((value) => regex.test(getSuggestionValue(value)));
  };
  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion, { query }) => {
    const suggestionText = `${suggestion}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
      <p>
        {parts.map((part, index) => {
          const className = part.highlight
            ? 'react-autosuggest__suggestion-match'
            : null;

          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </p>
    );
  };

  const renderSuggestionsContainer = ({ containerProps, children, query }) => (
    <div {...containerProps}>
      {children}
      {
        <div className="suggestionFooter">
          <button onClick={() => onSuggestionsClearRequested()}>
            See all results for: <span>"{query}"</span>
          </button>
        </div>
      }
    </div>
  );

  const renderInputComponent = (inputProps) => (
    <div className="searchInputContainer">
      <SearchBarIcon />
      <input {...inputProps} />
      {/* {inputProps.value ? (
        <button className="searchButton">Search</button>
      ) : null} */}
    </div>
  );

  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: placeholder,
    value: searchValue,
    onChange: onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSelectSuggestion}
      getSuggestionValue={getSuggestionValue}
      highlightFirstSuggestion={true}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      renderInputComponent={renderInputComponent}
      renderSuggestionsContainer={renderSuggestionsContainer}
    />
  );
};

export default SearchPeople;
