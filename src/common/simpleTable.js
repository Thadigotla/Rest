import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcSettings } from "react-icons/fc";
import { useTable } from "react-table";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DataForm from "./dataForm";
import { DELETE_SINGLE_ENTITY } from "../gql/mutation";
import { useMutation } from "@apollo/client";
import { DropDown } from "./dropDown";

export default function SimpleTable(props) {
	console.log("props  => ", props);
	console.log("Props Details are", props?.data?.objects);
	const data = React.useMemo(() => (props?.data?.objects?.length > 0 ? [...props?.data?.objects] : []), []);
	const columns = React.useMemo(() => (props?.columns?.length > 0 ? [...props?.columns] : []), []);

	console.log("data is ---------------> ", data);
	const [chsb, setchsb] = useState(true);

	const [rowData, setRowData] = useState();

	const gg = (e) => {
		setchsb(!chsb);
		console.log("Values are", e?.original);

		setRowData(e?.original);
	};

	const update = (e) => {
		console.log("update fields are", e?.target);
	};

	const [deleteOne] = useMutation(DELETE_SINGLE_ENTITY("users"));

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, (hooks) =>
		hooks.visibleColumns.push((visibleColumns) => [
			...visibleColumns,

			{
				id: "selection",
				width: "15",
				Header: "",
				Cell: ({ row }) => {
					console.log("CELL ", row);
					return (
						<span>
							<FcSettings
								onClick={() => {
									gg(row);
									setModal(!modal);
								}}
							/>
						</span>
					);
				},
			},
			{
				id: "Edit",
				width: 15,
				Header: "",
				Cell: ({ row }) => {
					let optionos = [];

					return <DropDown />;
				},
			},
		])
	);

	//  (hooks) =>
	// hooks.visibleColumns.push((visible_column) => ({ id: "test", Header: "", cell: () => <h1>E</h1> }))
	return (
		<>
			<button onClick={() => setModal(!modal)}>add</button>

			<table {...getTableProps()} className="table table-striped  m-0 p-0">
				<thead>
					{headerGroups.map((headerGroup) => {
						return (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => {
									return <th {...column.getHeaderProps()}>{column.render("Header")}</th>;
								})}
							</tr>
						);
					})}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									switch (cell?.column?.type) {
										case "input":
											console.log("============>", cell?.column?.type, "==+>", cell?.value);

											return (
												<td
													key={Math.random()}
													{...cell.getCellProps()}
													style={{
														padding: "10px",
														border: "solid 1px gray",
														background: "papayawhip",
													}}
												>
													{cell.render("Cell")}
												</td>
											);

										// case "uuid":
										// 	console.log("============>", cell?.column?.type, "==+>", cell?.value);
										// 	console.log("value is", cell);

										// 	return (
										// 		<td
										// 			key={Math.random()}
										// 			{...cell.getCellProps()}
										// 			style={{
										// 				padding: "10px",
										// 				border: "solid 1px gray",
										// 				background: "papayawhip",
										// 			}}
										// 			value={cell?.value?.name}
										// 		>
										// 			{cell.render("Cell")}
										// 		</td>
										// 	);
										default:
											console.log("============>", cell?.column?.type, "==+>", cell?.value);
											console.log("============>", cell);
											return (
												<td
													{...cell?.getCellProps()}
													key={Math.random()}
													className={"m-0 p-2 pt-1 pb-1 " + (cell?.column?.alignment || "")}
													// value={cell?.value}
												>
													{" "}
													{cell?.render("Cell")}
												</td>
											);
									}
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div>
				<Modal isOpen={modal} toggle={toggle}>
					<ModalHeader toggle={toggle}>Modal title</ModalHeader>
					<ModalBody>
						<DataForm entity={props?.entity} values={rowData} columns={props.columns} />
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={update}>
							Do Something
						</Button>{" "}
						<Button color="secondary" onClick={toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		</>
	);
}
