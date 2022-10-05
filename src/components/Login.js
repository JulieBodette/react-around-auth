

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
        <span className="modal__error username-error">error here</span>
        <input
          type="password" //This causes the text to look like dots
          className="login__input-text"
          name="password"
          placeholder="Password"
          id="password"
          required
        />
        <span className="modal__error password-error">error here</span>

        <button type="submit" className="login__submit-button">
          Log in
        </button>
      </form>
      );


        }