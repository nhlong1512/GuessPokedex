import { Col } from "antd";
import { query } from "firebase/database";
import { getDocs } from "firebase/firestore";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import MyChart from "../components/MyChart";
import { collection, db } from "../firebaseConfig";
import { User } from "../model/model";

const Rank = () => {
  const dispatch = useAppDispatch();
  let user: User | null = useAppSelector((state) => state.user.currentUser);
//   const get5UsersHighest = async (): Promise<User[]> => {
//     const users: User[] = [];
//     const scores: number[] = [];
//     const querySnapshot = await getDocs(collection(db, "users"));
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       const user = doc.data() as User;
//       users.push(user);
//       scores.push(user.score);
//       console.log(doc.id, " => ", doc.data());
//       console.log(doc.id, " => ", doc.data().score);
//     });
//     scores.sort((a, b) => b - a);
//     const topScores = scores.slice(0, 5);
//     let topUsers: User[] = [];
//     topScores.forEach((score) => {
//         users.forEach((user) => {
//             if(user.score === score && !topUsers.includes(user)) {
//                 if(topUsers.length === 5) return topUsers;
//                 topUsers.push(user);  
//                 console.log(topUsers.length);
//             } 
//         })
//     })
//     console.log(topUsers);
//     return topUsers;
    
//   };
//   const top5Users = get5UsersHighest();

  return (
    <Col
      span={22}
      offset={1}
      className="bg-[#fff] rounded-xl py-[20px] px-[20px]"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.19) 0px -10px -20px, rgba(0, 0, 0, 0.23) 0px -6px -6px",
      }}
    >
      <MyChart />
    </Col>
  );
};

export default Rank;
