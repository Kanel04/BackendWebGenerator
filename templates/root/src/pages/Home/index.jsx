import React, { useEffect } from "react";
import { LinkButton } from "../../components/common/Buttons";

export const HomePage = () => {
  return (
    <>
      <div>Hello World</div>
      <LinkButton page="/project">Créer un projet</LinkButton>
    </>
  );
};
