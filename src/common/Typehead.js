import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { getEntityDetails } from "../gql/queries";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useController } from "react-hook-form";

const Typehead = React.forwardRef(({ entity = "", fields = "id name" }, props, ref) => {
	const { data, loading, error } = useQuery(getEntityDetails({ entity: entity, fields: fields }));

	console.log("data------------------>", data);

	return (
		<AsyncTypeahead
			// clearButton
			// defaultSelected={options.slice(0, 1)}
			// filterBy={filterBy}
			ref={ref}
			id="async-example"
			isLoading={loading}
			labelKey="login"
			minLength={3}
			// onSearch={handleSearch}p
			options={data}
			placeholder="Search for a Github user..."
		/>
	);
});

export default Typehead;
