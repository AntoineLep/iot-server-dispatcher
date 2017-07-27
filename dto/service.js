'use strict';

module.exports = function(dto, Service) {
  if(Service == null) {
    return null;
  }

  var _Service = {
    name: Service.name,
    description: Service.description,
    args: Service.ServiceArguments.map((arg) => { return dto.ServiceArgument(dto, arg); })
  };
  return _Service;
};