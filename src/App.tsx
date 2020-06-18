import React, { useState } from "react";

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

const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "",
      user: "",
      body: "",
      time: "",
    },
  ]);
  const [form, setForm] = useState<Form>({ user: "", body: "" });

  //eventの型
  const handleSubmitForm = (event: any) => {
    event.preventDefault();
  };

  //eventの型
  const updateForm = (event: any) => {
    switch (event.target.name) {
      case "user":
        setForm(event.target.value);
        break;
      case "body":
        setForm(event.target.value);
        break;
      default:
        console.log("key not found");
    }
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
                <input type="text" onInput={updateForm} value={name} />
              </p>
              <p>
                <label>Body</label>
                <textarea onInput={updateForm} value={name} />
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
/*
 

  handleSubmitForm(event) {
    event.preventDefault()
    const { comments, form } = this.state
    comments.unshift({
      id: uuid(),
      time: moment().format('YYYY/MM/DD HH:mm:ss'),
      ...form
    })
    form.body = ''
    this.setState({
      comments,
      form
    })
  }

  updateForm(key, value) {
    const { form } = this.state
    form[key] = value
    this.setState({
      form
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1>React Application</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="four columns">
              <form onSubmit={this.handleSubmitForm}>
                <p>
                  <label>User ID</label>
                  <input type="text" onInput={(event)=>this.updateForm('user', event.target.value)} value={this.state.form.user} />
                </p>
                <p>
                  <label>Body</label>
                  <textarea onInput={(event) => this.updateForm('body', event.target.value)} value={this.state.form.body} />
                </p>
                <button className="button button-primary">
                  投稿
                </button>
              </form>
            </div>
            <div className="eight columns">
              <ul>
                { this.state.comments.map((comment) => (
                  <li key={comment.id}>
                    <strong>{comment.user}</strong>
                    <p>
                      {comment.body}
                    </p>
                    <p style={{textAlign: 'right'}}>
                      {comment.time}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
    */
