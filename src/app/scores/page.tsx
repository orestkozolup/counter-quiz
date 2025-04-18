"use client";

import { useStoreContext } from "@/contexts/StoreContext";

export const Scores = () => {
  const { scores } = useStoreContext();

  return (
    <div>
      Your scores record is the following:
      <ul>
        {Object.entries(scores).map(([score, date]) => {
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();

          const timestamp = date.getTime();

          return (
            <li key={timestamp}>
              {score}: {day}/{month}/{year}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Scores;
