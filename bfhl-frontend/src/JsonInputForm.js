import React, { useState } from 'react';
import axios from 'axios';

function JsonInputForm() {
    const [jsonData, setJsonData] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setJsonData(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedData = JSON.parse(jsonData);
            const response = await axios.post('https://your-api-url.com/bfhl', parsedData);
            setResponseData(response.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON or API Error');
            setResponseData(null);
        }
    };

    const handleFilterChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedFilters(value);
    };

    const renderResponse = () => {
        if (!responseData) return null;
        let result = {};
        if (selectedFilters.includes('Numbers')) result.Numbers = responseData.numbers.join(',');
        if (selectedFilters.includes('Alphabets')) result.Alphabets = responseData.alphabets.join(',');
        if (selectedFilters.includes('Highest lowercase alphabet')) result['Highest lowercase alphabet'] = responseData.highest_lowercase;
        return (
            <div>
                {Object.keys(result).map(key => (
                    <div key={key}>
                        <strong>{key}:</strong> {result[key]}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <h1>{responseData ? responseData.roll_number : 'Your Roll Number'}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    API Input:
                    <input type="text" value={jsonData} onChange={handleInputChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {responseData && (
                <div>
                    <label>
                        Multi Filter:
                        <select multiple={true} onChange={handleFilterChange}>
                            <option value="Numbers">Numbers</option>
                            <option value="Alphabets">Alphabets</option>
                            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                        </select>
                    </label>
                    <div>
                        Filtered Response:
                        {renderResponse()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default JsonInputForm;
