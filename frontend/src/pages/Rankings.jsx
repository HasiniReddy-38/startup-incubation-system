import { useEffect, useState } from "react";
import api from "../services/api";

function Rankings() {

  const [rankings, setRankings] = useState([]);

  useEffect(() => {

    api.get("/rankings/startups")
      .then((res) => setRankings(res.data))
      .catch(console.error);

  }, []);

  return (
    <div className="container mt-5">

      <h2>Startup Rankings</h2>

      <table className="table table-bordered mt-4">

        <thead>
          <tr>
            <th>Startup</th>
            <th>Average Score</th>
          </tr>
        </thead>

        <tbody>

          {
            rankings.map((r, index) => (

              <tr key={index}>
                <td>{r.company_name}</td>
                <td>{r.average_score}</td>
              </tr>

            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default Rankings;