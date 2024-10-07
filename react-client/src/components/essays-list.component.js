import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useEssayDataService from "../services/useEssayDataService";

const EssayList = () => {
    const {getAll, deleteAll, findByTitle} = useEssayDataService();

    const [searchTitle, setSearchTitle] = useState('')
    const [essays, setEssays] = useState([])
    const [currentEssay, setCurrentEssay] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(-1)

    useEffect(() => {
        retrieveEssays()
    }, [])

    const retrieveEssays = () => {
        getAll()
            .then(response => {
                setEssays(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const refreshList = () => {
        retrieveEssays();
        setCurrentEssay(null)
        setCurrentIndex(-1)
    }

    const handleChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle)
    }

    const handleActiveTutorial = (essay, index) => {
        setCurrentEssay(essay)
        setCurrentIndex(index)
    }

    const handleRemoveAllTutorials = () => {
        deleteAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handleSearchTitle = () => {
        setCurrentEssay(null)
        setCurrentIndex(-1)

        findByTitle(searchTitle)
            .then(response => {
                setEssays(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={handleChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={handleSearchTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Essays List</h4>

                <ul className="list-group">
                    {essays &&
                        essays.map((essay, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => handleActiveTutorial(essay, index)}
                                key={index}
                            >
                                {essay.title}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={handleRemoveAllTutorials}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentEssay ? (
                    <div>
                        <h4>Essay</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentEssay.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentEssay.description}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentEssay.published ? "Published" : "Pending"}
                        </div>

                        <Link
                            to={"/essays/" + currentEssay.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Essay...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

 export default EssayList;
