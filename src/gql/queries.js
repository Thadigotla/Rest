import { gql } from "@apollo/client";

export const getEntityDetails = ({ entity, fields, where = "" }) => {
	console.log("Entity is ====>", entity, fields, where);

	return gql`query MyQuery {
		objects:${entity}(where:${where}) {
			${fields}
		}
	}
`;
};
