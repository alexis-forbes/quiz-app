//if value is undefined, the function will return true
//if value is null, the function will also return true, meaning its empty
//if the type of value passed in value is an object and the keys of the object has length of === 0
//the object has no value
//if the type of value passed in value is a string and trim length method returns with 0, value is empty
const isEmpty = (value) =>
  value === undefined ||
  value == null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export default isEmpty;
