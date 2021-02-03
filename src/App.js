import React, { useState, useEffect } from "react";
import Axios from "axios";
import Loading from "./Loading";
import Tours from "./Tours";
import axios from "axios";

const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  useEffect(() => {
    setLoading(true);
    Axios.get(url)
      .then((res) => {
        console.log(res.data);
        const response = res.data;
        console.log(response, "response");
        setLoading(false);
        setTours(response);
      })
      .catch((er) => {
        console.log(er);
        setLoading(false);
      });
  }, [refresh]);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button onClick={() => setRefresh(!refresh)} className="btn">
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
