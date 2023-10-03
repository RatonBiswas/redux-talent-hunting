// const {useEffect} from 'react'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';



const JobsContainer = () => {

    const {jobs,isLoading} = useSelector((store)=>store.allJobs)
    const dispatch = useDispatch()

    if(isLoading){
        // return (
        //     <Wrapper>
        //       <h2>Loading...</h2>
        //     </Wrapper>
        //   );
        return(
            <Loading center/> 
        )
    }
    if(jobs.length===0){
        return(
            <Wrapper>
                <h2>No Jobs To Display...</h2>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <h2>Jobs Info</h2>
            <div className="jobs">
                {jobs.map((job)=>{
                    console.log(job)
                    return <Job key={job._id} {...job}/>}
                )}
            </div>
        </Wrapper>
    );
};

export default JobsContainer;