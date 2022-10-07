import {Link} from "react-router-dom";

export function Register({ handleSubmit }) {

    return(
    <form name="registerform" className="register__form register" onSubmit={handleSubmit}>
      <h1 className="register__title">Sign up</h1>
            <input
              className="register__input-text"
              name="email"
              placeholder="Email"
              id="email"
              required
            />
            {/*Could add an error field here- similar to the modal errors- maybe check to make sure the test is an email (has @ sign?) */}
            <input
              type="password" //This causes the text to look like dots
              className="register__input-text"
              name="password"
              placeholder="Password"
              id="password"
              required
            />
    
            <button type="submit" className="register__submit-button">
              Sign up
            </button>
            <Link to="/signin" className="register__text">Already a member? Log in here!</Link>
          </form>
          );
    
            }