import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { faqActions } from "../../actions/faqActions";
import FaqItem from "./components/FaqItem";
import { LinearProgress } from "@mui/material";

const FAQ = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.faq);

  useEffect(() => {
    dispatch(faqActions.gets());
  }, [dispatch]);
  return loading ? (
    <LinearProgress color="success" />
  ) : (
    <div>
      {data?.map((v, i) => (
        <FaqItem key={i} {...v} />
      ))}
    </div>
  );
};

export default FAQ;
