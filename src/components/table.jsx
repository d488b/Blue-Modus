import { useState } from "react";

export const Table = (initialData) => {
  const [data, setData] = useState(initialData.initialData.body);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      if (key === "numberOfPets") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      } else if (key === "dob") {
        return direction === "asc"
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      } else {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {Object.keys(initialData.initialData.head).map((key) => (
              <th
                key={key}
                onClick={() => sortData(key)}
                tabIndex={0}
                role="button"
                aria-label={`Sort by ${initialData.initialData.head[key]}`}
                className={sortConfig.key === key ? "sorted" : ""}
              >
                {initialData.initialData.head[key]}{" "}
                {sortConfig.key === key
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td data-label="Name">{row.name}</td>
                <td data-label="Favorite Food">{row.favoriteFood}</td>
                <td data-label="Favorite Color">{row.favoriteColor}</td>
              <td data-label="Total # of Pets">{row.numberOfPets}</td>
              <td data-label="Birthday">
                {new Date(row.dob).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
