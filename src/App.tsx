import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Result, Track } from "./types/types";

import Homepage from "./components/Homepage";

function App() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [track, setTrack] = useState<Track>();

  const handleInput = (e: any) => {
    let { value } = e.target;
    setSearchInput(value);
  };

  const handleSubmit = async (e: any, searchQuery: string = searchInput) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchQuery}`
      );
      if (resp.ok) {
        const { data } = await resp.json();
        setSearchResults(data);
      } else {
        console.log("errorrr");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTrack = async (id: number) => {
    try {
      const resp = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/track/${id}`
      );
      if (resp.ok) {
        const data = await resp.json();
        setTrack(data);
      } else {
        console.log("errorrr");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Router>
      <Route
        path="/"
        exact
        render={(routerProps) => (
          <Homepage
            {...routerProps}
            handleInput={handleInput}
            searchInput={searchInput}
            searchResults={searchResults}
            getTrack={getTrack}
            handleSubmit={handleSubmit}
          />
        )}
      />
    </Router>
  );
}

export default App;
