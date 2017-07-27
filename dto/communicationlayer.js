'use strict';

module.exports = function(dto, CommunicationLayer) {
  if(CommunicationLayer == null) {
    return null;
  }
  
  var _CommunicationLayer = {
    ommunicationLayerType: CommunicationLayer.ommunicationLayerType,
    IP_ip: CommunicationLayer.IP_ip,
    IP_port: CommunicationLayer.IP_port,
    IP_protocol: CommunicationLayer.IP_protocol,
    IP_uri: CommunicationLayer.IP_uri,
    IP_method:  CommunicationLayer.IP_method,
    RF2_4G_identity: CommunicationLayer.RF2_4G_identity,
    RF2_4G_assocKey: CommunicationLayer.RF2_4G_assocKey,
    RF433M_identity: CommunicationLayer.RF433M_identity,
    RF433M_assocKey: CommunicationLayer.RF433M_assocKey,
    BT_identity: CommunicationLayer.BT_identity,
    BT_assocKey: CommunicationLayer.BT_assocKey
  };
  return _CommunicationLayer;
};