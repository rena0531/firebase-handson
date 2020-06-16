import React, { useState } from "react";

interface Comment {
  id: number;
  user: string;
  body: string;
  time: string;
}

interface Form {
  user: string;
  body: string;
}

const App: React.FC = () => {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ user: "", body: "" });

  const handleSubmitForm = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const { comments, form } = this.state;
    comments.unshift({
      id: uuid(),
      time: moment().format("YYYY/MM/DD HH:mm:ss"),
      ...form,
    });
    form.body = "";
    this.setState({
      comments,
      form,
    });
  };

  const updateForm = (key: string, value: string) => {
    
    const { form } = this.state;
    form[key] = value;
    this.setState({
      form,
    });
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
                  onInput={(event) => updateForm("user", event.target.value)}
                  value={form.user}
                />
              </p>
              <p>
                <label>Body</label>
                <textarea
                  onInput={(event) => updateForm("body", event.target.value)}
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
