import React, {useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import useEssayDataService from "../services/useEssayDataService";


const Essay = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {getEssay, updateEssay, deleteEssay} = useEssayDataService();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [message, setMessage] = useState("");

  useEffect( () => {
    getEssay(id)
        .then(response => {
          setTitle(response.data.title)
          setDescription(response.data.description)
          setPublished(response.data.published)
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
       }, [])

  const handleChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title)
  }

  const handleChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description)
  }

  const handleUpdatePublished = (status) => {
    const data = {
      id,
      title,
      description,
      published: status
    };

    updateEssay(id, data)
      .then(response => {
        setPublished(status)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const handleUpdateEssay= () => {
    updateEssay(
      id,
        {
          id,
          title,
          description,
          published
        }
    )
      .then(response => {
        console.log(response.data);
        setMessage("The essay was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  }

  const handleDeleteEssay= () => {
    deleteEssay(id)
      .then(response => {
        console.log(response.data);
        navigate('/essays');
      })
      .catch(e => {
        console.log(e);
      });
  }

    return (
      <div>
        {id !== "" ? (
          <div className="edit-form">
            <h4>Essay</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={handleChangeTitle}

                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={handleChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {published ? "Published" : "Pending"}
              </div>
            </form>

            {published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => handleUpdatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => handleUpdatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={handleDeleteEssay}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={handleUpdateEssay}
            >
              Update
            </button>
            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Essay...</p>
          </div>
        )}
      </div>
    )
}

export default Essay;