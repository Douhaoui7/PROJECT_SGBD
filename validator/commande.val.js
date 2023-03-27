module.exports = {
    validator: {
        $jsonSchema: {
            required: ['ref','boutiqueRef','clientRef'],
            properties: {
                ref: {
                    bsonType: 'string'
                },
                boutiqueRef: {
                    bsonType: 'string'
                },
                clientRef: {
                    bsonType: 'string'
                },
                articles: {
                    bsonType: 'array'
                },
                createdAt: {
                    bsonType: 'date'
                },
                updatedAt: {
                    bsonType: 'date'
                },
            }
        }
    }
}