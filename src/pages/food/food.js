import React from "react";
import { Fields } from "../../fields/fields";
import { PageContainer } from "../../PageContainer/pageContainer";

function Food() {
	const { fields, filters, columns } = Fields("foods");

	return (
		<div>
			<PageContainer entity={"foods"} fields={fields} filters={filters} columns={columns}></PageContainer>
		</div>
	);
}

export default Food;
