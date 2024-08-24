import { useState, useEffect } from "react";
import "./FeedbackForm.css";

function App() {
  const initialValues = { username: "", email: "", rating:
    "", comment: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.rating) {
      errors.rating = "Rating is required";
    } 

    if (!values.comment) {
      errors.comment = "Comment is required";
    } 

    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Submit successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit}>
      <div className='text'>Feedback Form</div>
      
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          
          <div className="field">
            <label>Rating</label>
            <div>
            <div>
            <input
              type="radio"
              name="rating"
              value="1"
              onChange={handleChange}
            />
            <label>*</label>
            </div>
            <div>
            <input
              type="radio"
              name="rating"
              value="2"
              onChange={handleChange}
            />
            <label>**</label>
            </div>
            <div>
            <input
              type="radio"
              name="rating"
              value="3"
              onChange={handleChange}
            />
            <label>***</label>
            </div>
            <div>
            <input
              type="radio"
              name="rating"
              value="4"
              onChange={handleChange}
            />
            <label>****</label>
            </div>
            <div>
            <input
              type="radio"
              name="rating"
              value="5"
              onChange={handleChange}
            />
            <label>*****</label>
            </div>
            </div>
          </div>
          <p>{formErrors.rating}</p>
          <div className="field">
            <textarea name="comment" value={formValues.comment} onChange={handleChange} placeholder="Comment..." rows="5"></textarea>
            
          </div>
          <p>{formErrors.comment}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;