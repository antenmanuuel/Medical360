import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";


const Sidebar = () => {
  const { user } = useAuthContext();

  return (
    <div className="flex-shrink-0 w-64 bg-[#409BEF]  p-5 text-white block text-center text-xl font-bold md:text-2xl lg:text-3xl mt-20">
      <ul className="space-y-5 md:space-y-12 lg:space-y-23">
        <li>
        {(user.name != "Admin") && (
          <Link to="/my-patients" className="hover:underline">
            My Patients
          </Link>
           )}
        </li>
        {user && (
          <li>
            <Link to="/all-processes" className="hover:underline">
              Processes
            </Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/departmentpage" className="hover:underline">
              Departments
            </Link>
          </li>
        )}
        {(user.name == "Admin") && (
          <li>
            <Link to="/all-feedbacks" className="hover:underline">
              Feedbacks
            </Link>
          </li>
        )}
        {(user.name == "Admin") && (
          <li>
            <Link to="/all-bugs" className="hover:underline">
              Bugs
            </Link>
          </li>
        )}
        {user.isAdmin && (
          <li>
            <Link to="/resource-management" className="hover:underline">
              Resource Management
            </Link>
          </li>
        )}
        <li>
          <Link to="/chat" className="hover:underline">
            Chat
          </Link>
        </li>
        <li>
          {(user.name != "Admin" ) && (
              <Link to="/bugs" className="hover:underline">
                Report Bug
              </Link>
            )}
        </li>
        <li>
          {(user.name != "Admin" ) && (
              <Link to="/feedback" className="hover:underline">
                Give Feedback
              </Link>
            )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
