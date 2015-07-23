fojax.constants.config = {
    primitiveAttributeTypes : [ 'Integer', 'Long', 'Short', 'Float', 'Double',
            'Character', 'String', 'Boolean', 'Enumeration' ],
    complexAttributeTypes : [ 'Object', 'List' ]
};

(function() {
    var config = fojax.constants.config;
    fojax.constants.config.allKnownAttributeTypes = config.primitiveAttributeTypes
            .concat(config.complexAttributeTypes);
})();
