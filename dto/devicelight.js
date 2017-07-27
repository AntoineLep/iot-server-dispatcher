'use strict';

module.exports = function(dto, DeviceLight) {
  if(DeviceLight == null) {
    return null;
  }

  var _DeviceLight = {
    id: DeviceLight.id,
    name: DeviceLight.name,
    state: DeviceLight.state,
  };
  return _DeviceLight;
};