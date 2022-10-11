
const BASEURL = "https://register.nomoreparties.co";
const HEADERS = {"Content-Type": "application/json"}

const processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`); //same as throwing error- except the object that goes into the catch block is a string, not an error object
  };

export function signUp(info) {
    const url = BASEURL + "/signup";
    return fetch(url, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(info),
    })
      .then(processResponse)
      .catch((err) => {
        console.log(err); // log the error to the console
        return Promise.reject(err); //pass the error along to the next .catch as if we hadn't caught it
      });
  }

  export function signIn(info) {
    const url = BASEURL + "/signin";
    return fetch(url, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(info),
    })
    .then(processResponse)
      .catch((err) => {
        console.log(err); // log the error to the console
        return Promise.reject(err); //pass the error along to the next .catch as if we hadn't caught it
      });
  }



