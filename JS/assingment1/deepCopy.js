const nestedObject = {
    name: "John",
    age: 30,
    address: {
        city: "New York",
        zip: "10001",
        coordinates: {
            lat: 40.7128,
            lng: -74.0060
        }
    },
    hobbies: ["reading", "gaming", { type: "sports", name: "basketball" }],
    getDetails: function() {
        return `${this.name} lives in ${this.address.city}`;
    }
};

