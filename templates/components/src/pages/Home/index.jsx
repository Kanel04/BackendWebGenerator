import React, { useEffect } from "react";

import { MainLayout } from "../../layouts/main";
import Title from "../../components/Title";
import Header from "./Header";
import Engagements from "./Engagements";
import { states } from "../../states";

export const HomePage = () => {
  useEffect(() => {
    states.selectedLink = "home";
  }, []);

  return (
    <MainLayout>
      <Header />
      <Engagements />
    </MainLayout>
  );
};
