'use strict';

module.exports = function(dto, Device) {
  if(Device == null) {
    return null;
  }

  var _Device = {
    id: Device.id,
    name: Device.name,
    state: Device.state,
    deviceType: (Device.DeviceType == null) ? null : Device.DeviceType.name,
    services: (Device.DeviceType == null) ? [] : Device.DeviceType.Services.map((service) => { return dto.ServiceFull(dto, service); }),
    vars: (Device.Vars == null) ? null : Device.Vars.map((oneVar) => { return dto.Var(dto, oneVar); })
  };
  return _Device;
};