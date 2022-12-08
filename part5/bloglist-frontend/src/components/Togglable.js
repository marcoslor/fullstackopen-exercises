import { useState } from "react";

const Togglable = ({ openButtonText, closeButtonText, teaser, children }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="togglable">
      {visible ? (
        <>
          {children}
          <button onClick={toggleVisibility}>
            {closeButtonText || "Close"}
          </button>
        </>
      ) : (
        <>
          {teaser}
          <button onClick={toggleVisibility}>{openButtonText || "Open"}</button>
        </>
      )}
    </div>
  );
};

export default Togglable;
