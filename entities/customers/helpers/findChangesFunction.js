function findObjectDifferences(oldObject, newObject) {
    const fieldsToCheck = [
        "name.first",
        "name.middle",
        "name.last",
        "phone",
        "email",
        "password",
        "picture.url",
        "picture.alt",
        "address.city",
        "address.street",
        "address.houseNumber",
        "address.zip",
    ];

    const changes = [];

    function getNestedValue(obj, path) {
        return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
    }

    fieldsToCheck.forEach((field) => {
        const oldValue = getNestedValue(oldObject, field);
        const newValue = getNestedValue(newObject, field);

        if (oldValue === undefined && newValue !== undefined) {
            changes.push(`${field} was added with value ${JSON.stringify(newValue)}`);
        } else if (oldValue !== undefined && newValue === undefined) {
            changes.push(`${field} was removed`);
        } else if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
            changes.push(`${field} changed from ${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}`);
        }
    });

    return { changes };
}

module.exports = { findObjectDifferences };
