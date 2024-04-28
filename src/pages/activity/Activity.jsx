import ActivityComment from '../../components/activityComment/ActivityComment'
import ActivityDetails from '../../components/activityDetails/ActivityDetails'
import './Activity.css'

const Activity = () => {
    return (
        <div className='actividad-body'>

            <ActivityDetails></ActivityDetails>

            <div className="separador"></div>

            <ActivityComment></ActivityComment>
        </div>
    )
}

export default Activity