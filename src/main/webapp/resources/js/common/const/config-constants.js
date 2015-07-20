fojax.constants.config = {
    primitiveAttributeTypes : [ 'Integer', 'Long', 'Btye', 'Short', 'Float',
            'Double', 'Character', 'String', 'Boolean' ],
    complexAttributeTypes : [ 'Object', 'List' ]
};

(function() {
    var config = fojax.constants.config;
    fojax.constants.config.allKnownAttributeTypes = config.primitiveAttributeTypes
            .concat(config.complexAttributeTypes);
})();
