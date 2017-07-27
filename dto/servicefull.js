'use strict';

module.exports = function(dto, ServiceFull) {
  if(ServiceFull == null) {
    return null;
  }

  var _ServiceFull = {
    name: ServiceFull.name,
    description: ServiceFull.description,
    args: ServiceFull.ServiceArguments.map((arg) => { return dto.ServiceArgument(dto, arg); }),
    communicationLayer: (ServiceFull.CommunicationLayer == null) ? null : dto.CommunicationLayer(dto, ServiceFull.CommunicationLayer)
  };
  return _ServiceFull;
};