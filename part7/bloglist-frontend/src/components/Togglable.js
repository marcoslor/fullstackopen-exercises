import { useState } from "react";
import { Button } from "react-bootstrap";

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
          <Button
            onClick={toggleVisibility}
            className="togglable--close"
            variant="secondary"
          >
            {closeButtonText || "Close"}
          </Button>
        </>
      ) : (
        <>
          {teaser}
          <Button
            onClick={toggleVisibility}
            variant="primary"
            className="togglable--open"
          >
            {openButtonText || "Open"}
          </Button>
        </>
      )}
    </div>
  );
};

export default Togglable;
