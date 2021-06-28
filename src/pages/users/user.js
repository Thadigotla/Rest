import React from "react";
import { Fields } from "../../fields/fields";
import { PageContainer } from "../../PageContainer/pageContainer";

function User() {
	const { fields, filters, columns } = Fields("users");

	return (
		<div>
			<PageContainer entity="users" fields={fields} filters={filters} columns={columns}></PageContainer>
		</div>
	);
}

export default User;
