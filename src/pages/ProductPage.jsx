import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../redux/product/productOperations";
import { selectItems } from "../redux/product/productSelectors";
import { selectRefreshing } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export default function ProductPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  // const isRefreshing = useSelector(selectRefreshing);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  console.log(items);

  return (
    <div>
      {items.map((item) => {
        return (
          <div>
            <p key={item.id}>{item.price}</p>
            <img src={item.image} />
          </div>
        );
      })}
    </div>
  );
}
