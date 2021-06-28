export const Fields = (entity) => {
	switch (entity) {
		case "users":
			return {
				fields: "active email_id id  is_verified name phone_no",
				columns: [
					{ Header: "NAME", type: "input", accessor: "name" },
					{ Header: "PHONE", type: "input", accessor: "phone_no" },
					{ Header: "EMAIL", type: "input", accessor: "email_id" },
					{
						Header: "VERIFIED",
						accessor: "is_verified",
						Cell: (cell) => {
							console.log("cell is", cell);
							return cell?.value == true ? <h5>yes</h5> : <h5>No</h5>;
						},
					},
				],
				filters: [
					{ Header: "Active", filter: "{ active: { _eq: true } }" },
					{ Header: "InActive", filter: "{ active: { _eq: false } }" },
					{ Header: "All", filter: "" },
				],
			};

		case "restaurents":
			return {
				fields: "id name is_veg open_at close_at active year_of_establishment",
				columns: [
					{ Header: "NAME", type: "input", accessor: "name" },
					{ Header: "Open", type: "input", accessor: "open_at" },
					{ Header: "Close", type: "input", accessor: "close_at" },
					{ Header: "Establishment", type: "input", accessor: "year_of_establishment" },
					{
						Header: "VEG",
						accessor: "is_veg",
						Cell: (cell) => {
							console.log("cell is", cell);
							return cell?.value == true ? <h5>yes</h5> : <h5>No</h5>;
						},
					},
					{
						Header: "Active",
						accessor: "active",
						Cell: (cell) => {
							console.log("cell is", cell);
							return cell?.value == true ? <h5>yes</h5> : <h5>No</h5>;
						},
					},
				],
				filters: [
					{ Header: "Active", filter: "{ active: { _eq: true } }" },
					{ Header: "InActive", filter: "{ active: { _eq: false } }" },
					{ Header: "All", filter: "" },
				],
			};

		case "foods":
			return {
				fields: "id is_veg name price  restaruent_id restaruent {id name}",
				columns: [
					{ Header: "NAME", type: "input", accessor: "name", placeholder: "NAME" },
					{ Header: "PRICE", type: "input", accessor: "price" },
					{
						Header: "RESTAURENT ",
						entity: "restaruents",
						type: "uuid",
						accessor: "restaruent",
						Cell: (cell) => (typeof cell?.value === String ? cell?.value : cell?.value?.name),
					},
					{
						Header: "VEG",
						accessor: "is_veg",
						Cell: (cell) => {
							console.log("cell is", cell);
							return cell?.value == true ? <h5>yes</h5> : <h5>No</h5>;
						},
					},
				],
				filters: [
					{ Header: "Active", filter: "{ active: { _eq: true } }" },
					{ Header: "InActive", filter: "{ active: { _eq: false } }" },
					{ Header: "All", filter: "" },
				],
			};

		default:
			return null;
	}
};
