module.exports = {
    validator: {
        $jsonSchema: {
            required: ['ref' , 'nom'],
            properties: {
                ref: {
                    bsonType: 'string'
                },
                nom: {
                    bsonType: 'string'
                },
                adresse: {
                    bsonType: 'string'
                },
                $jsonSchema: {
                    required: ['ref' , 'nom'],
                    properties: {
                        ref: {
                            bsonType: 'string'
                        },
                        nom: {
                            bsonType: 'string'
                        },
                        createdAt: {
                            bsonType: 'date'
                        },
                        updatedAt: {
                            bsonType: 'date'
                        }
                    }
                },
                createdAt: {
                    bsonType: 'date'
                },
                updatedAt: {
                    bsonType: 'date'
                }
            }
        }
    }
}