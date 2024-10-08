import React, { useContext, useEffect, useState } from "react";
import "../../components/table.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../../../context/Context";

const Projects = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const context = useContext(Context);
  const token = context.userDetails.token;
  const selectedLang = context.selectedLang;
  const language = context.language && context.language;

  function fetchData() {
    axios
      .get("http://localhost:8000/api/projects")
      .then((res) => setData(res.data.projects))
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setSearchData(data);
  }, [data]);

  const handleSearch = (e) => {
    const inpValue = e.target.value.toLowerCase();
    if (inpValue === "") {
      setSearchData(data);
    } else {
      const filteredData = data.filter(
        (item) =>
          item.headline[selectedLang].toLowerCase().includes(inpValue) ||
          item.summary[selectedLang].toLowerCase().includes(inpValue)
      );
      setSearchData(filteredData);
    }
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setOverlayVisible(true);
  };

  const handleConfirmDelete = async () => {
    setOverlayVisible(false);
    await axios.delete(
      `http://localhost:8000/api/projects/${selectedItem._id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    fetchData();
  };

  const handleCancelDelete = () => {
    setOverlayVisible(false);
    setSelectedItem(null);
  };
  document.body.addEventListener("click", (e) => {
    const overlay = document.querySelector("div.main-dashboard > div.overlay");
    if (e.target === overlay) {
      setOverlayVisible(false);
      setSelectedItem(null);
    } else return false;
  });

  const tableData =searchData&& searchData.map((item, index) => {
    return (
      <tr key={item._id}>
        <td>{index + 1}</td>
        <td className="align-left">{item.headline[selectedLang]}</td>
        <td>{item.summary[selectedLang]}</td>
        <td>
          <span
            data-content={language.activity && language.activity.delete}
            onClick={() => handleDeleteClick(item)}
          >
            <i className="fa-solid fa-trash"></i>
          </span>
          <span data-content={language.activity && language.activity.update}>
            <Link
              to={`${item._id}`}
              className="fa-regular fa-pen-to-square"
            ></Link>
          </span>
        </td>
      </tr>
    );
  });

  return (
    <div className="main-dashboard">
      {overlayVisible && (
        <div className="overlay">
          <div className="content">
            <h3>
              {language.dashbord_tables && language.dashbord_tables.delete_sure}
            </h3>
            <div className="center">
              <span className="flex-1 cancel" onClick={handleCancelDelete}>
                {language.dashbord_tables && language.dashbord_tables.cancel}
              </span>
              <span className="flex-1 delete" onClick={handleConfirmDelete}>
                <i className="fa-solid fa-trash"></i>
                {language.dashbord_tables && language.dashbord_tables.confirm}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-container">
        <div className="flex">
          <article className="search center no-wrap">
            <input
              onChange={handleSearch}
              type="text"
              placeholder="search"
              className="flex-1"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </article>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>
                  {language.dashbord_tables &&
                    language.dashbord_tables.headline}
                </th>
                <th>
                  {language.dashbord_tables && language.dashbord_tables.summary}
                </th>
                <th>
                  {language.dashbord_tables && language.dashbord_tables.action}
                </th>
              </tr>
            </thead>
            <tbody>{tableData}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Projects;
