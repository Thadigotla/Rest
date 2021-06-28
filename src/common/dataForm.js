import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { UPDATE_SINGLE_ENTITY, INSERT_SINGLE_ENTITY } from "../gql/mutation";
import Typehead from "./Typehead";
import { Input, Select, MenuItem } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { getEntityDetails } from "../gql/queries";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useController } from "react-hook-form";
import { red } from "@material-ui/core/colors";

export default function DataForm({ entity = "", values = "", columns = "", labelKey = "checking" }) {
	console.log("Data form are ====> ", values);
	console.log("Columns are ===> ", columns);

	const [selected, setSelected] = useState();

	const checkValues = {
		...values,
	};

	const {
		data: otherData,
		loading,
		error,
	} = useQuery(getEntityDetails({ entity: "restaruent", fields: "id name", where: "{ active: { _eq: true } }" }));

	const { handleSubmit, register, required, reset, control } = useForm({ defaultValues: checkValues });

	const [updateOne] = useMutation(UPDATE_SINGLE_ENTITY(entity));
	const [insertOne] = useMutation(INSERT_SINGLE_ENTITY(entity));

	const fieldMap = {};
	columns?.map((e) => (fieldMap[e?.accessor] = { ...e, name: e.accessor }));

	const submit = (data) => {
		console.log("Update data is", otherData, "============>", data);
		delete data["__typename"];

		const newObject = { ...data };

		for (const [key, value] of Object.entries(newObject)) {
			console.log("key and value ", key, value);
			if (typeof value === "object") {
				newObject[key + "_id"] = value["id"];
				delete newObject[key];
				delete newObject["select"];
			}
		}

		console.log("New newObject is", newObject);

		if (newObject?.id) {
			updateOne({
				variables: {
					id: newObject["id"],
					set: { ...newObject },
				},
			}).then(({ newObject, error }) => {
				console.log("newObject is ", newObject);
				console.log("error is ", error);
			});
		} else {
			console.log("insert is calling");
			insertOne({
				variables: { object: { ...newObject } },
			}).then(({ newObject, error }) => {
				console.log("newObject is ", newObject);
				console.log("error is ", error);
			});
		}
	};

	const [search, setSearch] = useState("");

	return (
		<form onSubmit={handleSubmit(submit)}>
			{columns?.length > 0 &&
				columns?.map((e) => {
					switch (e.type) {
						case "input":
							return <input {...register(e?.accessor)} placeholder={e?.name}></input>;

						case "uuid":
							console.log("evalue is ====>", e);

							return (
								<Controller
									control={control}
									name="select"
									{...register(e?.accessor)}
									render={({ field: { onChange, onBlur, value, name, ref } }) => {
										// useEffect(() => {
										// 	setSelected([e?.]);
										// }, []);
										console.log("value is ===> ", value);

										return (
											<AsyncTypeahead
												onBlur={onBlur}
												onChange={(e, i) => {
													console.log("event is", e, i);
													onChange(e);
													setSelected(e);
													return e;
												}}
												ref={ref}
												// value={value?.name}
												// defaultInputValue={[{ name: "hello" }]}
												// name={name}
												checked={value}
												clearButton
												inputRef={ref}
												paginate={false}
												name="CHCKING"
												loading={loading}
												id={entity}
												key={Math.random()}
												// onPaginate={() => otherData?.length * 2}
												minLength={0}
												labelKey={(option) => option?.name}
												options={otherData?.objects?.map((e) => e)}
												onSearch={(e) => setSearch(e)}
												placeholder="Search for a Github user..."
												selected={selected}
											/>
										);
									}}
								/>
							);

						default:
							return null;
					}
				})}
			{/* <input label="hjjj" {...register("name", { required: "REQUIRED" })} placeholder="Name"></input>

			<input {...register("email_id")} placeholder="Email"></input> */}

			<button>Cancel</button>
			<button onClick={(e) => reset(checkValues)}>Reset</button>
			<button type="submit">Update</button>
		</form>
	);
}
