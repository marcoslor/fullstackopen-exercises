import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Description = ({ description }: { description: string }) => {
  return <span style={{ fontStyle: "italic" }}>{description}</span>;
};

const Info = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return <></>;
    case "group":
      return <div>Group project count: {part.groupProjectCount}</div>;
    case "background":
      return (
        <div>
          <Description description={part.description} />
          <br />
          Background material: {part.backroundMaterial}
        </div>
      );
    case "special":
      return (
        <div>
          <Description description={part.description} />
          <br />
          Requirements: {part.requirements.join(", ")}
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Part = ({ part }: { part: CoursePart }) => {
  return (
    <>
      <div style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
        {part.name} | {part.exerciseCount}
      </div>
      <Info part={part} />
    </>
  );
};

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <>
      {parts.map((part) => (
        <p key={part.name}>
          <Part part={part} />
        </p>
      ))}
    </>
  );
};

export default Content;
