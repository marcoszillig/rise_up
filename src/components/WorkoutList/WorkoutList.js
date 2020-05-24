import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    return db.collection("workouts").onSnapshot((snapshot) => {
      const workoutsData = [];
      snapshot.forEach((doc) =>
        workoutsData.push({ ...doc.data(), id: doc.id })
      );
      setWorkouts(workoutsData);
    });
  }, []);
  console.log(workouts.length === 0);
  return (
    <div>
      {workouts.lenght === 0 ? (
        <div className="loading">...Loading</div>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>{workout.exercise}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
