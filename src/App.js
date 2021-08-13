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
    <div className="App container m-5 p-5">
      {!isSignin && (
        <div>
          <button className="p-2" onClick={() => handleClick(google)}>
            Signin with Google <i class="fab fa-google p-2"></i>
          </button>
        </div>
      )}

      {isSignin && (
        <div className="container m-5 p-4">
          <h2 className="lead">Welcome {data.displayName}</h2>
          <div className="card">
            <img src={data.photoURL} className="card-img-top" alt="img" />
            <div className="card-body text-center">
              <h5 className="card-title">{data.displayName}</h5>
              <p className="card-text">{data.email}</p>
              <p className="card-text">{data.phoneNumber}</p>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
