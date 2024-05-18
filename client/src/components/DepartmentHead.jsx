import React from "react";
import StaffCard from "./StaffCard";
import doctorImageone from '../images/doctor1.avif';
import doctorImagetwo from '../images/doctor2.jpeg';

const DepartmentHead = ({head,headDoctor,origin}) => {

    
  

  return (
  
      <div className="flex overflow-y-auto space-x-2 py-2 pl-1" style={{ height: '380px' }}> 
  {/* {head.map((departmentHead, index) => ( */}
    <div className="p-4"> 
      <StaffCard staff={head} headDoctor={headDoctor} origin={origin}/>
    </div>
  {/* ))} */}
</div>

          
     
    
  );
};

export default DepartmentHead;
