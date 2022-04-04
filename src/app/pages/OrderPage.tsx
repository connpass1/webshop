import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Spinner } from "../components/Elements/SvgSpinner";
import { CheckFetching } from "../components/Fetching";
import { useFetchingId } from "../components/hooks";
import { mapCustomer } from "../store/helper";
import { IItem } from "../store/Models";

type Props = ReturnType<typeof mapCustomer>;

const Component: FunctionComponent<Props> = (props) => {
  const { status, data } = useFetchingId("/list/" + props.id);
  const item = data as IItem;
  console.log(data);

  if (!data) return <Spinner />;
  return <CheckFetching status={status}>{JSON.stringify(data)}</CheckFetching>;
};

const ConnectedComponent = connect(mapCustomer)(Component);
export default ConnectedComponent;
