import React from 'react';

const SpeciesInput = ({ speciesId, setSpeciesId }) => {
    const handleChange = (event) => {
        setSpeciesId(event.target.value);
    };

    return (
        <div>
            <label htmlFor="speciesId">Species ID:</label>
            <input
                id="speciesId"
                type="number"
                value={speciesId}
                onChange={handleChange}
            />
        </div>
    );
};

export default SpeciesInput;
