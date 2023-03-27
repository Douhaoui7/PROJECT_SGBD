module.exports = {
    validator: {
        $jsonSchema: {
            required: ['ref' , 'boutiqueRef' , 'nom'],
            properties: {
                ref: {
                    bsonType: 'string'
                },
                boutiqueRef: {
                    bsonType: 'string'
                },
                nom: {
                    bsonType: 'string'
                },
                description: {
                    bsonType: 'string'
                },
                qteEnStock: {
                    bsonType: 'number'
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