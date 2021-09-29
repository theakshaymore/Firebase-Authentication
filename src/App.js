import { useState } from "react";
import firebase from "./firebase/firebaseConfig";
import { google } from "./firebase/authProviders";
import socialMediaAuth from "./firebase/auth";

function App() {
  const [isSignin, setIsSignin] = useState(false);
  const [data, setData] = useState("");

  const handleClick = async (provider) => {
    const res = await socialMediaAuth(provider);
    setData(res);
    setIsSignin(true);
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        setIsSignin(false);
        console.log("LOGOUT SUCCESSFULLY");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-5 is-flex is-justify-content-center is-align-content-center is-flex-direction-column">
      <div className="notification is-primary">
        Firebase Authentication using <strong>React Js</strong>
      </div>
      {!isSignin && (
        <div className="box is-flex is-justify-content-center is-align-content-center mt-5">
          <button
            class="button is-primary is-large"
            onClick={() => handleClick(google)}
          >
            Signin with Google
          </button>
        </div>
      )}

      {isSignin && (
        <div className="container">
          <div class="notification is-link">Login Successfully!</div>
          <div className="box">
            <h2 className="is-size-1">Welcome {data.displayName}</h2>
            <img src={data.photoURL} alt="profile_img" />
            <h5 className="is-size-4">{data.displayName}</h5>
            <p className="is-size-5">{data.email}</p>
            <p className="is-size-5">{data.phoneNumber}</p>
            <button className="button is-danger mt-5" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
