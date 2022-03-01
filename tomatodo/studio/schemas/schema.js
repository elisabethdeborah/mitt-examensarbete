
import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";

import post from "./post";
import todo from './todo';
import todoList from './todoList';
import tomato from './tomato';
import library from './library';
import archive from './archive';

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    post,
	todo,
	todoList,
	tomato,
	library,
	archive,
  ])
});