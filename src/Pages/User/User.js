import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowSearch } from "../../Store/HeaderSlice/HeaderSlice";

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);

  useEffect(() => {
    dispatch(setShowSearch(false));
    if (!user) {
      navigate("/");
    }
  }, []);

  return <div>User</div>;
}
