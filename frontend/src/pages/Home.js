import {  useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutFrom from "../components/WorkoutFrom";
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://mern-stack-api-zeta.vercel.app/api/workouts");
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        dispatch({type : 'SET_WORKOUTS', payload : data})
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <WorkoutDetails key={workout._id} workout = {workout}  /> )}
      </div>
      <WorkoutFrom />
    </div>
  );
};

export default Home;
