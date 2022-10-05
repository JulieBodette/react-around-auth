

export function Login({ handleSubmit }) {


return(

<form name="avatarimage" className="login__form login" onSubmit={handleSubmit}>
  <h1>Log in</h1>
        <input
          className="login__input-text"
          name="username"
          placeholder="Username"
          id="username"
          required
        />
        {/*Could add an error field here- similar to the modal errors- maybe check to make sure the test is an email (has @ sign?) */}
        <input
          type="password" //This causes the text to look like dots
          className="login__input-text"
          name="password"
          placeholder="Password"
          id="password"
          required
        />

        <button type="submit" className="login__submit-button">
          Log in
        </button>
      </form>
      );


        }