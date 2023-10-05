/* eslint-disable no-unused-vars */
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {showStats} from '../../features/allJobs/allJobsSlice'
import {ChartsContainer, Loading, StatsContainer} from '../../components'

const Stats = () => {
    const {stats,monthlyApplications, isLoading} = useSelector((store)=>store.allJobs)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(showStats())
    },[])

    if(isLoading){
        return <Loading center/>
    }

    return (
        <div>
            <StatsContainer/>
            {monthlyApplications.length > 0 && <ChartsContainer />}
        </div>
    );
};

export default Stats;