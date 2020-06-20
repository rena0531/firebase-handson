import React, { useState, FormEvent, ChangeEvent, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

interface Comment {
  id: string;
  user: string;
  body: string;
  time: string;
}

interface Form {
  user: string;
  body: string;
}

const initialFormState = { user: "", body: "" };

const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [form, setForm] = useState<Form>(initialFormState);

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComments = {
      id: uuidv4(),
      time: moment().format("YYYY/MM/DD HH:mm:ss"),
      user: form.user,
      body: form.body,
    };
    setComments((comments) => [newComments, ...comments]);
    setForm({ user: "", body: "" });
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = event.target;
    const newForm = { ...form, [input.name]: input.value };
    setForm(newForm);
  };

  return (
    <>
      <div className="container">
        <h1>React Application</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="four columns">
            <form onSubmit={handleSubmitForm}>
              <p>
                <label>User ID</label>
                <input
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
            </form>
          </div>
          <div className="eight columns">
            <ul>
              {comments.map((comment: Comment) => (
                <li key={comment.id}>
                  <strong>{comment.user}</strong>
                  <p>{comment.body}</p>
                  <p style={{ textAlign: "right" }}>{comment.time}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
