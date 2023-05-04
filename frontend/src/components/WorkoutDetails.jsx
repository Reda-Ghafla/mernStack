import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

//dns-date
// import formatDistanceToNow from 'date-fns/formatDistance'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {

  const {dispatch} = useWorkoutsContext()

  const handelClick = async (id)=>{
    // console.log(id);
    const response = await fetch(`/api/workouts/${id}`, {method : 'DELETE'});
    const json = await response.json();

    console.log(json);

    
    dispatch({type : 'DELETE_WORKOUT', payload : json})
  }
  return (
    <div className='workout-details'>
        <h4> {workout.title} </h4>
        <p>
            <strong>Load (Kg) : </strong>
            {workout.load}
        </p>
        <p>
            <strong>Reps : </strong>
            {workout.reps}
        </p>
        <p>
            
            {formatDistanceToNow(new Date(workout.createdAt), {addSuffix : true})}
        </p>
        <span className="material-symbols-outlined" onClick={()=> handelClick(workout._id)}>Delete</span>
    </div>
  )
}

export default WorkoutDetails