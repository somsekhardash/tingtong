import React, { useEffect, useState } from "react";
import "./App.scss";
import { TongWrapper } from "./components/TongWrapper";

function App() {
  const [tongs, setTongs] = useState([] as any);
  const [open, setOpen] = useState(false);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10

  const createTong = (state) => {
    Array.isArray(tongs) && setTongs([...tongs, state]);
    setOpen(!open);
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
  }, []);

  const saveTingTong = (tong?, isDelete?) => {
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
      debugger;
      setTongs([...body]);
      console.log(res);
    });
  };

  return (
    <div className="App">
      <TongWrapper
        createTong={createTong}
        tongs={tongs}
        saveTingTong={saveTingTong}
      />
    </div>
  );
}

export default App;
