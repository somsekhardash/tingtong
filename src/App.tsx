import React, { useEffect, useState } from "react";
import "./App.scss";
import TingWrapper from "./components/TingWrapper";
import { TongWrapper } from "./components/TongWrapper";

function LoginForm({ onSubmit }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [check, setCheck] = React.useState(true);

  React.useEffect(() => {
    if (check && username.length && password.length) {
      setCheck(false);
    }
    if (!username.length || !password.length) {
      setCheck(true);
    }
  }, [check, username, password]);

  const loginSubmit = () => {
    if (!check && username.length && password.length) {
      onSubmit({ username, password });
    }
  };

  return (
    <div>
      <input
        type="text"
        id="username-input"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        id="password-input"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        id="login-button"
        disabled={check}
        onClick={() => loginSubmit()}
      >
        submit{" "}
      </button>
    </div>
  );
}

function App() {
  const [tongs, setTongs] = useState([] as any);
  const [tings, setTings] = useState([] as any);
  const [open, setOpen] = useState(false);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10

  const createTong = (state) => {
    Array.isArray(tongs) && setTongs([...tongs, state]);
    setOpen(!open);
  };
  const createTing = (state) => {
    Array.isArray(tings) && setTings([...tings, state]);
  };

  useEffect(() => {
    fetch("https://api.jsonbin.io/b/60d6cdbf8ea8ec25bd15e76c/latest", {
      headers: {
        "secret-key":
          "$2b$10$fBRiC60HbH5FFQPVhl5gQOLho8OWj4TMCL1vC.pJxmnWnbM35IBai",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTongs(res.filter((node) => node.id));
      });

    fetch("https://api.jsonbin.io/b/60d86696af8fbc2c76aae526/latest", {
      headers: {
        "secret-key":
          "$2b$10$fBRiC60HbH5FFQPVhl5gQOLho8OWj4TMCL1vC.pJxmnWnbM35IBai",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTings(res.filter((node) => node.id));
      });
  }, []);

  const saveTong = (tong?, isDelete?) => {
    let body = [...tongs] as any[];
    if (tong) {
      if (isDelete)
        body = [...tongs.filter((node) => node.id && node.id !== tong.id)];
      else {
        body = tongs.map((node) => {
          if (node.id === tong.id) {
            return Object.assign({}, { ...tong });
          }
          return node;
        });
      }
      if (body.length === 0) {
        body = [""];
      }
    }

    fetch("https://api.jsonbin.io/b/60d6cdbf8ea8ec25bd15e76c", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "secret-key":
          "$2b$10$fBRiC60HbH5FFQPVhl5gQOLho8OWj4TMCL1vC.pJxmnWnbM35IBai",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      setTongs([...body]);
      console.log(res);
    });
  };

  const saveTing = (ting?, isDelete?) => {
    let body = [...tings] as any[];
    if (ting) {
      if (isDelete)
        body = [...tings.filter((node) => node.id && node.id !== ting.id)];
      else {
        body = tings.map((node) => {
          if (node.id === ting.id) {
            return Object.assign({}, { ...ting });
          }
          return node;
        });
      }
      if (body.length === 0) {
        body = [""];
      }
    }

    fetch("https://api.jsonbin.io/b/60d86696af8fbc2c76aae526", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "secret-key":
          "$2b$10$fBRiC60HbH5FFQPVhl5gQOLho8OWj4TMCL1vC.pJxmnWnbM35IBai",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      setTings([...body]);
    });
  };

  return (
    <div className="App">
      <TongWrapper
        createTong={createTong}
        tongs={tongs}
        saveTong={saveTong}
        createTing={createTing}
      />
      <TingWrapper tings={tings} />
      <button onClick={() => saveTing()}>save ting</button>
      <LoginForm onSubmit={(res) => console.log(res)} />
    </div>
  );
}

export default App;
