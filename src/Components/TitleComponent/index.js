import React from "react";
import Helmet from "react-helmet";

const TitleComponent = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default TitleComponent;
