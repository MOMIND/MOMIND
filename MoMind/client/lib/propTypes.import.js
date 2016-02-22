//Creates Chainable for (example) isRequired Prop
function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location) {
    componentName = componentName || ANONYMOUS;

    if (props[propName] == null) {
      //var locationName = ReactPropTypeLocationNames[location];
      if (isRequired) 
        return new Error(`Required ${propName} was not specified in ${componentName}.`);
      return null;
    } else {
      return validate(props, propName, componentName, location);
    }
  }

  let chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

//Validates for Strings and Numbers only
function literalChecker(props, propName, componentName) {
  componentName = componentName || ANONYMOUS;
   const type = typeof props[propName];
   if (type !== 'number' && type!== 'string')
      return new Error(`The Prop ${propName} must be a Number or a String but is a ${type}!`);

   return null;
}

//Validates for iList
function iListChecker(props, propName, componentName) {
  componentName = componentName || ANONYMOUS;

   if (!IList.isList(props[propName]))
      return new Error(`The Prop ${propName} must be a immutable List (Array) but is a ${type}!`);

   return null;
}

//Validates for iList
function iMapChecker(props, propName, componentName) {
  componentName = componentName || ANONYMOUS;

   if (!IMap.isMap(props[propName]))
      return new Error(`The Prop ${propName} must be a immutable Map (Object) but is a ${type}!`);

   return null;
}

export default {
  literal: createChainableTypeChecker(literalChecker),
  IMap: createChainableTypeChecker(iMapChecker),
  IList: createChainableTypeChecker(iListChecker),
};