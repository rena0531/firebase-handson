import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { firebase, database } from "../functions/src/utils/firebase";

interface Comment {
  id: string;
  user: string;
  body: string;
  time: string;
}

interface Form {
  user: string | string[] | number;
  body: string;
}

const initialFormState = { user: "", body: "" };

const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [form, setForm] = useState<Form>(initialFormState);
  const [isLoadedUser, setIsLoadedUser] = useState(false);
  const [isConnectedToDatabase, setIsConnectedToDatabase] = useState(false);
  const [user, setUser] = useState<string | null>("");

  const handleClickLogin = () => {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = `${moment().unix()}${uuidv4().substr(0, 9).replace("-", "")}`;
    const payload = {
      id: id,
      time: moment().format("YYYY/MM/DD HH:mm:ss"),
      user: form.user,
      body: form.body,
    };
    //setComments((comments) => [payload, ...comments]);
    database.ref(`comments/${id}/${user}`).set(payload);
    //修正
    setForm({ user: payload.user, body: "" });
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = event.target;
    const newForm = { ...form, [input.name]: input.value };
    setForm(newForm);
  };

  const handleClickLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        location.href = location.href;
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
        setForm({ user: user.email, body: "" });
      }
      setIsLoadedUser(true);
    });

    database.ref("comments/").on("value", (snapshot) => {
      const comments = Object.values(snapshot.val() || {}) || [];
      setComments(comments);
      setIsConnectedToDatabase(true);
    });
  }, []);

  if (!isLoadedUser || !isConnectedToDatabase) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="container">
        <h1>React Application</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="four columns">
            {user ? (
              <form onSubmit={handleSubmitForm}>
                <p>
                  <label>User ID</label>
                  <input
                    readOnly
                    type="text"
                    name="user"
                    onChange={handleChange}
                    value={form.user}
                  />
                </p>
                <p>
                  <label>Body</label>
                  <textarea
                    name="body"
                    onChange={handleChange}
                    value={form.body}
                  />
                </p>
                <button className="button button-primary">投稿</button>
                <hr />
                <button
                  type="button"
                  onClick={handleClickLogout}
                  className="button button-default"
                >
                  ログアウト
                </button>
              </form>
            ) : (
              <p>
                <button
                  type="button"
                  onClick={handleClickLogin}
                  className="button button-primary"
                  style={{ width: "100%" }}
                >
                  Google アカウントでログイン
                </button>
              </p>
            )}
          </div>
          <div className="eight columns">
            <ul>
              {comments.map((commentData, i) => {
                const comment = Object.values(commentData || {})[0];
                if (!comment) return null;
                return (
                  <li key={i}>
                    <strong>{comment.user}</strong>
                    <p>{comment.body}</p>
                    <p style={{ textAlign: "right" }}>{comment.time}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
