import React from "react";
import styles from "./listModal.module.css";

const ListModal = ({ isOpen, onClose, data, onSelect }) => {
    if (!isOpen) return null;
  
    const handleSelect = (item) => {
      onSelect(item); 
      onClose(); 
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Select a Project</h2>
                <div className={styles.modalList}>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <div
                                key={item.id} // Use unique identifier
                                className={styles.modalItem}
                                onClick={() => handleSelect(item)}
                            >
                                {item.name}
                            </div>
                        ))
                    ) : (
                        <p className={styles.modalNoData}>No projects available</p>
                    )}
                </div>
                <button onClick={onClose} className={styles.modalClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ListModal;