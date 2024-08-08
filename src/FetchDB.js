// FetchDB.js
import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { useUser } from './UserContext'; // Import useUser hook

const useFetchDB = () => {
  const user = useUser(); // Get current user from context
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + user.uid);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          console.log(snapshot.val()); // User data
          setCurrentUser(snapshot.val());
        } else {
          console.log("No data available");
        }
      };

      fetchUserData();
    }
  }, [user]);

  return currentUser;
};

export default useFetchDB;
