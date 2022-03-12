
import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";

import todo from './todo';
import todoList from './todoList';
import tomato from './tomato';

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
	todo,
	todoList,
	tomato,
  ])
});