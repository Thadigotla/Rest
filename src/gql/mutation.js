import { gql } from "@apollo/client";

export const UPDATE_SINGLE_ENTITY = (entity, fields = " id ") =>
	gql`mutation update_${entity}_by_pk($set:${entity}_set_input! $id:Int!){object: update_${entity}_by_pk(pk_columns:{id:$id},_set:$set){${fields}}}`;

export const INSERT_SINGLE_ENTITY = (entity, fields = " id ") =>
	gql`mutation insert_${entity}_one($object:${entity}_insert_input! ){object: insert_${entity}_one(object:$object){${fields}}}`;

	export const DELETE_SINGLE_ENTITY = (entity, fields = " id ") =>
	gql`mutation delete_${entity}_by_pk($id:Int){object: delete_${entity}_by_pk(id:$id){${fields}}}`;
