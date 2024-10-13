import React from 'react';

function Countries({ countries, onCountryClick }) {
  return (
    <div>
      <ul>
        {countries.map(country => (
          <li key={country.alpha2Code}>
            <div>
              <h2>{country.name} <span className="add">+</span></h2>
              <button onClick={() => onCountryClick(country)}>Learn more</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Countries;
