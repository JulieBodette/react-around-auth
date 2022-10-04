

export function Login({ handleSubmit }) {


return(
<form name="avatarimage" className="modal__form" onSubmit={handleSubmit}>
        {/*This modal uses placeholder , but the other one
  uses value*/}
        <input
          //ref={inputRef} 
          className="modal__input-text"
          name="username"
          placeholder="Username"
          id="username"
          required
        />
        <span className="modal__error username-error">error here</span>
        <input
          //ref={inputRef} 
          className="modal__input-text"
          name="password"
          placeholder="Password"
          id="password"
          required
        />
        <span className="modal__error password-error">error here</span>

        <button type="submit" className="modal__submit-button">
          Log in
        </button>
      </form>
      );


        }