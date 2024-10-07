import React, {useState} from "react";
import useEssayDataService from "../services/useEssayDataService";

const AddEssay = () => {

    const {createEssay} = useEssayDataService();

    const [id, setId] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [published, setPublished] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSaveEssay = () => {
        const data = {
            title: title,
            description: description
        };

        createEssay(data)
            .then(response => {
                setId(response.data.id)
                setTitle(response.data.title)
                setDescription(response.data.description)
                setPublished(response.data.published)
                setSubmitted(true)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handleNewEssay = () => {
        setId(null)
        setTitle("")
        setDescription("")
        setPublished(false)
        setSubmitted(false)
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={handleNewEssay}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={title}
                            onChange={handleChangeTitle}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={description}
                            onChange={handleChangeDescription}
                            name="description"
                        />
                    </div>

                    <button onClick={handleSaveEssay} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddEssay;
