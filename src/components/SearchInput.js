// src/components/SearchInput.js

import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { fetchSearchSuggestions } from '../services/SearchService';
import Form from 'react-bootstrap/Form';

const SearchInput = ({ searchTerm, onSearchTermChange }) => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.length > 0) {
                const suggestions = await fetchSearchSuggestions(searchTerm);
                console.log('Fetched suggestions:', suggestions);
                setSuggestions(suggestions);
            } else {
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [searchTerm]);

    const onSuggestionsFetchRequested = ({ value }) => {
        onSearchTermChange(value);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion) => {
        console.log('Getting suggestion value for:', suggestion);
        return suggestion.name;
    };

    const renderSuggestion = (suggestion) => {
        console.log('Rendering suggestion:', suggestion);
        return (
            <div>
                {suggestion.name}
            </div>
        );
    };

    const inputProps = {
        placeholder: 'Type a book title',
        value: searchTerm,
        onChange: (_, { newValue }) => {
            onSearchTermChange(newValue);
        }
    };

    return (
        <Form.Control as={Autosuggest}
            className="my-2"
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    );
};

export default SearchInput;