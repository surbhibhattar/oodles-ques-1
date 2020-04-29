import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons'

function App() {

  let url = "https://api.github.com/users/andrew/repos";

  const [data, setData] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(res => {
        const repos = res.data;
        console.log(repos);
        setData(repos);
        setUserName(repos[0].owner.login);
        setUserAvatar(repos[0].owner.avatar_url);
      })
  }, [])

  return (
    <div className="App">
      <header style={{ margin: "10px" }} className="solid-border">
        <Row>
          <Col></Col>
          <Col>{userName}</Col>
          <Col>
            <img src={userAvatar} alt="user avatar" width="100" height="100" />
          </Col>
        </Row>
      </header>
      <main>
        <div>{`All Repositories of ${userName}`}</div>
        <Row style={{ margin: "10px" }}>
          {data && data.map((each, index) =>
            <Col lg={5} style={{ marginRight: "20px", marginBottom: "10px", width: "100%" }} className="solid-border ">
              <Row >
                <Col lg={10}>
                  <div className="solid-border">{each.name}</div>
                  <div className="solid-border">
                    <a href={each.html_url} className="url">{each.html_url}</a>
                  </div>
                  <div className="solid-border">{each.language}</div>
                </Col>

                <Col lg={2}>
                  <FontAwesomeIcon icon={faTrash} />
                </Col>

              </Row>
            </Col>
          )}
        </Row>
      </main>
    </div>
  );
}

export default App;
