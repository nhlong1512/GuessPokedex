import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { User } from "../model/model";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const MyChart: React.FC = () => {
  const get5UsersHighest = async (): Promise<User[]> => {
    const users: User[] = [];
    const scores: number[] = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const user = doc.data() as User;
      users.push(user);
      scores.push(user.score);
    });
    scores.sort((a, b) => b - a);
    const topScores = scores.slice(0, 5);
    let topUsers: User[] = [];
    topScores.forEach((score) => {
      users.forEach((user) => {
        if (user.score === score && !topUsers.includes(user)) {
          if (topUsers.length === 5) return topUsers;
          topUsers.push(user);
          console.log(topUsers.length);
        }
      });
    });
    console.log(topUsers);
    return topUsers;
  };
  
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchTop5Users = async () => {
      const users = await get5UsersHighest();
      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        if (ctx) {
          let myChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: [users[0].fullName, users[1].fullName, users[2].fullName, users[3].fullName, users[4].fullName],
              datasets: [
                {
                  label: "Top 5 highest score",
                  data: [users[0].score, users[1].score, users[2].score, users[3].score, users[4].score],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      }
    };
    fetchTop5Users();
  }, []);

  return <canvas ref={chartRef} id="myChart" className="h-[500px]" />;
};

export default MyChart;
