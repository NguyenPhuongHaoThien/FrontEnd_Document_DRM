// src/components/SearchInput.js

import React, { useState, useEffect, useCallback } from 'react';
import Autosuggest from 'react-autosuggest';
import { fetchSearchSuggestions } from '../services/SearchService';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const SearchInput = ({ searchTerm, onSearchTermChange, onSuggestionSelected }) => {
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const fetchSuggestions = useCallback(async (value) => {
        if (value.length > 0) {
            const suggestions = await fetchSearchSuggestions(value);
            setSuggestions(suggestions);
        } else {
            setSuggestions([]);
        }
    }, []);

    useEffect(() => {
        fetchSuggestions(searchTerm);
    }, [searchTerm, fetchSuggestions]);

    const onSuggestionsFetchRequested = ({ value }) => {
        onSearchTermChange(value);
        fetchSuggestions(value);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion) => suggestion.name;

    const renderSuggestion = (suggestion) => (
        <div
            style={{ cursor: 'pointer' }}
            onClick={() => onSuggestionSelected(suggestion)}
        >
            {suggestion.name}
        </div>
    );
    

    const inputProps = {
        placeholder: 'Tìm kiếm tên tài liệu...',
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