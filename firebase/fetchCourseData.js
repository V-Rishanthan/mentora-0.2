// import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "./confic";

// export const FetchCollection = (FBcallection) => {
//   const [document, setDocument] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let collectionRef = collection(db, FBcallection);

//     let queryRef = query(collectionRef, orderBy("createdAt", "desc"));

//     const unsub = onSnapshot(queryRef, (snapshot) => {
//       let result = [];
//       snapshot.docs.forEach((doc) => {
//         result.push({ ...doc.data(), id: doc.id });
//       });
//       setDocument([...result]);
//       setLoading(false);
//     });

//     return () => unsub();
//   }, [FBcallection]);

//   return { document, loading };
// };
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./confic";

export const fetchCourseData = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = collection(db, "users");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const data = snapshot.docs.map((doc, index) => {
          const user = doc.data();

          return {
            id: user.userId || doc.id || `user-${index}`,
            category: user.category || "Uncategorized",
            description: user.description || "No description available",
            subjectName: user.subjectName || "Untitled Subject",
            subjects: user.subjects || [],
            thumbnail: user.thumbnail
              ? { uri: user.thumbnail } // ✅ BASE64 WORKS HERE
              : require("../assets/images/course/course-1.png"),
          };
        });

        setCourses(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { courses, loading };
};
