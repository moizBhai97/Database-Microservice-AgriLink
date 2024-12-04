const mongoose = require('mongoose');
const { Permission, Role } = require('./src/models/User'); // Adjust the path as necessary

const permissions = [
    { name: 'viewCrops', description: 'Allows viewing crop details' },
    { name: 'editCrops', description: 'Allows editing crop details' },
    { name: 'manageUsers', description: 'Allows managing user accounts' },
];

const roles = [
    { name: 'Farmer', permissions: ['viewCrops'] },
    { name: 'Buyer', permissions: ['viewCrops'] },
    { name: 'Supplier', permissions: ['viewCrops', 'editCrops'] },
    { name: 'Admin', permissions: ['viewCrops', 'editCrops', 'manageUsers'] },
    { name: 'GovernmentOfficial', permissions: ['viewCrops', 'manageUsers'] },
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://i211209:Xg5lmHfaQt0GN7tW@agrilink.8s85i.mongodb.net/Agrilink', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Insert permissions
        const insertedPermissions = await Permission.insertMany(permissions);
        console.log('Inserted Permissions:', insertedPermissions);

        // Create a map of permission names to their IDs
        const permissionMap = insertedPermissions.reduce((map, permission) => {
            map[permission.name] = permission._id;
            return map;
        }, {});

        // Insert roles with references to permissions
        const rolesWithReferences = roles.map(role => ({
            name: role.name,
            permissions: role.permissions.map(permissionName => permissionMap[permissionName]),
        }));

        const insertedRoles = await Role.insertMany(rolesWithReferences);
        console.log('Inserted Roles:', insertedRoles);

        // Close the connection
        await mongoose.connection.close();
        console.log('Database seeding completed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();