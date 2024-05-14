
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../hooks/useGlobalContext";
const StaffCard = ({ staff,headDoctor,origin }) => {
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const {getDoctorByUser, getEvents,getUser,BASE_URL} =
    useGlobalContext();
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
          
          const userData = await getDoctorByUser(staff._id);
          const userDatawithImage = await getUser(userData._id);
          setUser(userDatawithImage);
          console.log(`Image URL: ${BASE_URL}/${userDatawithImage.image}`);
          setImagePreview(`${BASE_URL}/${userDatawithImage.image}`);
        
      } catch (error) {
        console.error("Failed to fetch doctor or department details", error);
      }
    };

    if (staff._id) {
      fetchDoctorDetails();
    }
  }, [staff._id]);
 
  return (
    <div className="bg-[#CAD6FF] p-4 rounded-lg shadow-lg max-w-xs mx-auto">
      {/* Image and Name */}
      <div className="flex flex-col items-center">
        <div className="flex-none rounded-full overflow-hidden border-4 border-white shadow-lg mb-4"
             style={{ width: '120px', height: '120px' }}>
          <img
            src={imagePreview}  // Add default image path
            alt={staff.name || 'Doctor Name'}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-center text-[#2260FF]">
          {staff.name || 'Unknown Name'}
        </h2>
        {headDoctor? <p><b>Department Head</b></p> : <p><b>Doctor</b></p>}
        <p className="text-center">{staff.profileDetails?.focusAreas?.join(', ')}</p>
      </div>

      {/* Bio */}
      <div className="bg-white p-2 rounded-lg mt-4 text-center">
        <p className="text-gray-600 text-sm">{staff.profileDetails?.specialization?.join(', ')}</p>
      </div>

      
      {/* Info Button */}
      <div className="flex justify-center mt-4">
      <Link
    to={`/doctorinfo/${staff._id}`}
    state={{ doctorName: staff.name, origin }} className="bg-[#2260FF] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 text-sm">
          Info
        </Link>
      </div>
    </div>
  );
};

export default StaffCard;
