// import React from "react";
// import { FaPlus ,FaEnvelope} from "react-icons/fa";
// import styles from "./headerAdmin.module.css"; // Corrected import

// const HeaderAdmin = ({ type = "student", totalCount = 0, onAddClick }) => {
//   const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

//   return (
//     <div className={styles.headerAdminContainer}>
//       <div className={styles.headerAdminContent}>
//         <div className={styles.headerAdminType}>  
//           <h2>{capitalizedType}s</h2>
//         </div>
        
//         <div className={styles.headerAdminInfo}>
//           {/* <span className={styles.headerAdminCount}> {totalCount}</span> */}
          
//           <button 
//             className={styles.headerAdminAddBtn} 
//             onClick={onAddClick}
//             aria-label={`Add new ${type}`}
//           >
//             <FaPlus />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeaderAdmin;
import React from "react";
import { FaPlus, FaUserGraduate, FaUniversity, FaChalkboardTeacher } from "react-icons/fa";
import styles from "./headerAdmin.module.css"; // Import CSS module

const HeaderAdmin = ({ type = "student", totalCount = 0, onAddClick }) => {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  // Function to select the correct icon based on type
  const getIcon = () => {
    switch (type.toLowerCase()) {
      case "student":
        return <FaUserGraduate className={styles.headerIcon} />;
      case "college":
        return <FaUniversity className={styles.headerIcon} />;
      case "mentor":
        return <FaChalkboardTeacher className={styles.headerIcon} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.headerAdminContainer}>
      <div className={styles.headerAdminContent}>
        <div className={styles.headerAdminType}>
          {getIcon()} {/* Display the selected icon */}
          <h2>{capitalizedType}s</h2>
        </div>
        
        <div className={styles.headerAdminInfo}>
          <button 
            className={styles.headerAdminAddBtn} 
            onClick={onAddClick}
            aria-label={`Add new ${type}`}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;

