import { useQuery } from "@apollo/client";
import React from "react";
import { getEntityDetails } from "../gql/queries";
import SimpleTable from "./simpleTable";

export default function DataTable({ entity = "users", fields = "", filterItem = "", columns = { columns } }) {
	console.log("Filter item ", filterItem);
	const { data, loading, error } = useQuery(getEntityDetails({ entity: entity, fields: fields, where: filterItem }));

	console.log("data is ", data);
	console.log("error is ", error);

	return (
		<div>
			<SimpleTable key={entity} entity={entity} data={data} columns={columns} />
		</div>
	);
}
