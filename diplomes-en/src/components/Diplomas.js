import React, { useState, useEffect } from "react";
import diplomasData from "../data/diplomasData.json"; // ajustez le chemin selon votre structure de fichiers
import './Diplomas.css';

const Diplomas = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(6);

  useEffect(() => {
    setData(diplomasData);
    setSortedData(diplomasData);
    setIsLoading(false);
  }, []);

  const handleSort = () => {
    if (sortBy && data.length > 0) {
      const sorted = [...sortedData].sort((a, b) => {
        const valueA = a.fields[sortBy] || "";
        const valueB = b.fields[sortBy] || "";

        return valueA.localeCompare(valueB);
      });

      setSortedData(sorted);
    }
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);

    const filteredData =
      value === ""
        ? data
        : data.filter(
            (item) => item.fields.sous_secteur_de_rattachement === value
          );
    setSortedData(filteredData);
  };

  const handleSortByChange = (event) => {
    const value = event.target.value;
    setSortBy(value);

    // Reset the filter when changing the sorting attribute
    setFilterValue("");

    setSortedData([...data]);
  };

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 6);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <label htmlFor="sortDropdown">Trier par :</label>
          <select
            id="sortDropdown"
            onChange={handleSortByChange}
            value={sortBy}
          >
            <option value="">Aucun tri</option>
            {data.length > 0 &&
              Object.keys(data[0].fields).map((key, index) => (
                <option key={index} value={key}>
                  {key}
                </option>
              ))}
          </select>
          <label htmlFor="filterDropdown">Filtrer par sous-secteur :</label>
          <select
            id="filterDropdown"
            onChange={handleFilterChange}
            value={filterValue}
          >
            <option value="">Tous les sous-secteurs</option>
            {Array.from(
              new Set(
                data.map((item) => item.fields.sous_secteur_de_rattachement)
              )
            ).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button onClick={handleSort}>Trier</button>
          <ul className="diplomas__tiles">
            {sortedData.slice(0, visibleItems).map((item) => (
              <li
                key={item.recordid}
                className="diplomas__list__item diplomas__tile"
              >
                <div className="diplomas__list__sorted_title">
                  {item.fields.intitule_de_la_specialite_du_diplome_et_options}
                </div>
                <div className="diplomas__tile__details">
                  <span className="diplomas__list__sorted_subtitle">
                    Niveau du diplôme:
                  </span>
                  <span>{item.fields.niveau_du_diplome}</span>
                </div>
                <div className="diplomas__tile__details">
                  <span className="diplomas__list__sorted_subtitle">
                    Code RNCDP:
                  </span>
                  <span>{item.fields.ndeg_rncp}</span>
                </div>
                <div className="diplomas__tile__details">
                  <span className="diplomas__list__sorted_subtitle">
                    Code du diplôme:
                  </span>
                  <span>{item.fields.code_diplome}</span>
                </div>
                <div className="diplomas__tile__details">
                  <span className="diplomas__list__sorted_subtitle">
                    Type de diplôme:
                  </span>
                  <span>{item.fields.diplome}</span>
                </div>
                <div className="diplomas__tile__details">
                  <span className="diplomas__list__sorted_subtitle">
                    Commission professionnelle consultative:
                  </span>
                  <span>
                    {item.fields.commission_professionnelle_consultative}
                  </span>
                </div>
                <div className="diplomas__tile__details">
                  <span className="diplomas__list__sorted_subtitle">
                    Date de la première session:
                  </span>
                  <span>{item.fields.date_de_1ere_session}</span>
                </div>
              </li>
            ))}
          </ul>

          {visibleItems < sortedData.length && (
            <button onClick={handleShowMore}>Afficher plus</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Diplomas;
