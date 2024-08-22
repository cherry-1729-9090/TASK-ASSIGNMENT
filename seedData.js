const { User, Task } = require('./models'); // Adjust the path if needed
const bcrypt = require('bcryptjs');

const createUsersAndTasks = async () => {
    try {
        // Example Users
        const users = [
            {
                user_id: 1,
                role: 'Admin',
                user_name: 'Newton',
                password: await bcrypt.hash('password123', 10),
            },
            {
                user_id: 2,
                role: 'User',
                user_name: 'Einstein',
                password: await bcrypt.hash('password123', 10),
            },
            {
                user_id: 3,
                role: 'Admin',
                user_name: 'Galileo',
                password: await bcrypt.hash('password123', 10),
            },
            {
                user_id: 4,
                role: 'User',
                user_name: 'Curie',
                password: await bcrypt.hash('password123', 10),
            },
            {
                user_id: 5,
                role: 'User',
                user_name: 'Tesla',
                password: await bcrypt.hash('password123', 10),
            }
        ];

        // Insert Users
        await User.bulkCreate(users);

        console.log('Users have been inserted successfully!');

        // Example Tasks
        const tasks = [
            {
                title: 'Develop the theory of relativity',
                description: 'A task for Einstein to develop the theory of relativity',
                status: 'ToDo',
                priority: 'High',
                createdBy: 2,
            },
            {
                title: 'Discover the law of gravity',
                description: 'A task for Newton to discover the law of gravity',
                status: 'inProgress',
                priority: 'Medium',
                createdBy: 1,
            },
            {
                title: 'Develop the heliocentric model',
                description: 'A task for Galileo to develop the heliocentric model',
                status: 'Completed',
                priority: 'High',
                createdBy: 3,
            },
            {
                title: 'Conduct radioactivity experiments',
                description: 'A task for Curie to conduct experiments on radioactivity',
                status: 'ToDo',
                priority: 'Medium',
                createdBy: 4,
            },
            {
                title: 'Invent alternating current',
                description: 'A task for Tesla to work on alternating current',
                status: 'ToDo',
                priority: 'High',
                createdBy: 5,
            }
        ];

        // Insert Tasks
        await Task.bulkCreate(tasks);

        console.log('Tasks have been inserted successfully!');

    } catch (error) {
        console.error('Error inserting users and tasks:', error);
    }
};

createUsersAndTasks();
