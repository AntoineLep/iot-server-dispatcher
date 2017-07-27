'use strict';

module.exports = function(dto, ServiceArgument) {
  if(ServiceArgument == null) {
    return null;
  }

  var _ServiceArgument = {
    name: ServiceArgument.name,
    description: ServiceArgument.description
  };
  return _ServiceArgument;
};