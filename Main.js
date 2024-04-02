import { Navigation } from "./Navigation";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { fetchCurrent } from "./redux/auth/authOperations";

export const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrent());
  }, [dispatch]);

  return <Navigation />;
};
