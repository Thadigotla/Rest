import React from "react";
import { Fields } from "../../fields/fields";
import { PageContainer } from "../../PageContainer/pageContainer";

function Restaurent() {
	const { fields, filters, columns } = Fields("restaurents");

	return (
		<div>
			<PageContainer entity={"restaruent"} fields={fields} filters={filters} columns={columns}></PageContainer>
		</div>
	);
}

export default Restaurent;
