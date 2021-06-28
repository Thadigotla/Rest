import { AppBar, Tab, Tabs } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
import DataTable from "../common/dataTable";
export const PageContainer = ({ entity = "", fields, filters, columns }) => {
	const [value, setValue] = React.useState(0);

	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		console.log("index", index);

		console.log("FILTERS ", filters);

		return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
	}

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<>
			<AppBar position="static" background="green">
				<Tabs value={value} indicatorColor="primary" onChange={handleChange}>
					{filters.map((filter, index) => {
						return <Tab label={filter["Header"]}></Tab>;
					})}
				</Tabs>
			</AppBar>

			{filters.map((filter, index) => {
				return (
					<TabPanel value={value} index={index}>
						<DataTable entity={entity} fields={fields} columns={columns} filterItem={filters[index]["filter"]} />
					</TabPanel>
				);
			})}
		</>
	);
};
