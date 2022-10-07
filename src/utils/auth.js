//TO DO: TEST THIS CODE!!!

const BASEURL = "https://register.nomoreparties.co";
const HEADERS = {"Content-Type": "application/json"}

const processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

//TO DO: manually set info to the username and password for testing
//ie {"password": "somepassword", "email": "email8@email.com"}
export function SignUp(info) {
    const url = BASEURL + "/signup";
    return fetch(url, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(info),
    })
      .then(processResponse)
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }

  export function SignIn(info) {
    const url = BASEURL + "/signin";
    return fetch(url, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(info),
    })
      .then(processResponse())
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }



