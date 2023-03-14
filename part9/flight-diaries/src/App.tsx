import axios from "axios";
import { useEffect, useState } from "react";
import {
  NonSensitiveDiaryEntry,
  Weather,
  Visibility,
  DiaryEntry,
  NewDiaryEntry,
} from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    axios
      .get<NonSensitiveDiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((response) => {
        setDiaries(response.data);
      });
  }, []);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const date = event.currentTarget.date.value;
    const weather = event.currentTarget.weather.value;
    const visibility = event.currentTarget.visibility.value;
    const comment = event.currentTarget.comment.value;

    const newDiaryEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    axios
      .post<DiaryEntry>("http://localhost:3000/api/diaries", newDiaryEntry)
      .then((response) => {
        setDiaries(diaries.concat(response.data));
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const onFormChange = () => {
    setError(undefined);
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      <form onSubmit={onFormSubmit} onChange={onFormChange}>
        <h2>Add a diary</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" name="date" id="date" />
        </div>
        <div>
          <label htmlFor="weather">Weather</label>
          <select name="weather" id="weather">
            {Object.entries(Weather).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="visibility">Visibility</label>
          <select name="visibility" id="visibility">
            {Object.entries(Visibility).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <textarea name="comment" id="comment" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>weather: {diary.weather}</p>
            <p>visibility: {diary.visibility}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
