import { CoursePart } from "../types";

const Total = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </>
  );
};

export default Total;
