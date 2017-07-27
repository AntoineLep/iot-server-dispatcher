'use strict';

module.exports = function(dto, oneVar) {
  if(oneVar == null) {
    return null;
  }

  var _Var = {
    name: oneVar.name,
    value: oneVar.value,
    range: (oneVar.GenericVar == null) ? null : oneVar.GenericVar.range,
    unit: (oneVar.GenericVar == null) ? null : oneVar.GenericVar.unit,
    family: (oneVar.GenericVar == null) ? null : oneVar.GenericVar.name,
    familyDescription: (oneVar.GenericVar == null) ? null : oneVar.GenericVar.description,
    familyType: (oneVar.GenericVar == null) ? null : ((oneVar.GenericVar.VarType == null) ? null : oneVar.GenericVar.VarType.name)
  };
  return _Var;
};