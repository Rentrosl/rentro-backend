require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Car = require('../src/models/Car');
const Booking = require('../src/models/Booking');
const { Message, Conversation } = require('../src/models/Message');
const Review = require('../src/models/Review');
const Transaction = require('../src/models/Transaction');

const connectDB = require('../src/config/db');

const seedData = async () => {
	try {
		await connectDB();
		
		// Clear existing data
		await User.deleteMany({});
		await Car.deleteMany({});
		await Booking.deleteMany({});
		await Message.deleteMany({});
		await Conversation.deleteMany({});
		await Review.deleteMany({});
		await Transaction.deleteMany({});

		console.log('Cleared existing data');

		// Create sample users
		const owner1 = await User.create({
			name: 'John Smith',
			email: 'john@example.com',
			password: 'password123',
			phone: '+1234567890',
			role: 'owner',
			profilePic: 'https://via.placeholder.com/150',
			bankDetails: {
				accountNumber: '1234567890',
				bankName: 'Chase Bank',
				branchCode: 'CHASE001'
			}
		});

		const owner2 = await User.create({
			name: 'Sarah Johnson',
			email: 'sarah@example.com',
			password: 'password123',
			phone: '+1234567891',
			role: 'owner',
			profilePic: 'https://via.placeholder.com/150',
			bankDetails: {
				accountNumber: '0987654321',
				bankName: 'Wells Fargo',
				branchCode: 'WF001'
			}
		});

		const renter1 = await User.create({
			name: 'Mike Wilson',
			email: 'mike@example.com',
			password: 'password123',
			phone: '+1234567892',
			role: 'renter',
			profilePic: 'https://via.placeholder.com/150'
		});

		const renter2 = await User.create({
			name: 'Lisa Brown',
			email: 'lisa@example.com',
			password: 'password123',
			phone: '+1234567893',
			role: 'renter',
			profilePic: 'https://via.placeholder.com/150'
		});

		console.log('Created users');

		// Create sample cars
		const car1 = await Car.create({
			ownerId: owner1._id,
			title: '2020 Toyota Camry',
			description: 'Reliable sedan perfect for city driving and road trips',
			images: [
				'https://via.placeholder.com/400x300',
				'https://via.placeholder.com/400x300'
			],
			pricePerDay: 45,
			location: 'New York, NY',
			type: 'sedan',
			transmission: 'automatic',
			fuel: 'hybrid',
			seats: 5,
			status: 'active'
		});

		const car2 = await Car.create({
			ownerId: owner1._id,
			title: '2019 Honda CR-V',
			description: 'Spacious SUV with great fuel economy',
			images: [
				'https://via.placeholder.com/400x300',
				'https://via.placeholder.com/400x300'
			],
			pricePerDay: 60,
			location: 'New York, NY',
			type: 'suv',
			transmission: 'automatic',
			fuel: 'petrol',
			seats: 5,
			status: 'active'
		});

		const car3 = await Car.create({
			ownerId: owner2._id,
			title: '2021 Tesla Model 3',
			description: 'Electric luxury sedan with autopilot',
			images: [
				'https://via.placeholder.com/400x300',
				'https://via.placeholder.com/400x300'
			],
			pricePerDay: 85,
			location: 'Los Angeles, CA',
			type: 'luxury',
			transmission: 'automatic',
			fuel: 'electric',
			seats: 5,
			status: 'active'
		});

		console.log('Created cars');

		// Create sample bookings
		const booking1 = await Booking.create({
			carId: car1._id,
			renterId: renter1._id,
			ownerId: owner1._id,
			startDate: new Date('2024-01-15'),
			endDate: new Date('2024-01-17'),
			status: 'completed',
			totalPrice: 135
		});

		const booking2 = await Booking.create({
			carId: car2._id,
			renterId: renter2._id,
			ownerId: owner1._id,
			startDate: new Date('2024-01-20'),
			endDate: new Date('2024-01-22'),
			status: 'confirmed',
			totalPrice: 180
		});

		const booking3 = await Booking.create({
			carId: car3._id,
			renterId: renter1._id,
			ownerId: owner2._id,
			startDate: new Date('2024-01-25'),
			endDate: new Date('2024-01-27'),
			status: 'pending',
			totalPrice: 255
		});

		console.log('Created bookings');

		// Create sample transactions
		await Transaction.create({
			bookingId: booking1._id,
			ownerId: owner1._id,
			renterId: renter1._id,
			amount: 135,
			status: 'paid',
			date: new Date('2024-01-15')
		});

		await Transaction.create({
			bookingId: booking2._id,
			ownerId: owner1._id,
			renterId: renter2._id,
			amount: 180,
			status: 'pending',
			date: new Date('2024-01-20')
		});

		console.log('Created transactions');

		// Create sample reviews
		await Review.create({
			bookingId: booking1._id,
			reviewerId: renter1._id,
			rating: 5,
			comment: 'Great car, very clean and reliable. Owner was very helpful!'
		});

		await Review.create({
			bookingId: booking1._id,
			reviewerId: owner1._id,
			rating: 5,
			comment: 'Excellent renter, took great care of the car.'
		});

		console.log('Created reviews');

		// Create sample conversation and messages
		const conversation = await Conversation.create({
			participants: [owner1._id, renter1._id]
		});

		await Message.create({
			conversationId: conversation._id,
			senderId: renter1._id,
			receiverId: owner1._id,
			message: 'Hi! I\'m interested in renting your Toyota Camry. Is it available this weekend?'
		});

		await Message.create({
			conversationId: conversation._id,
			senderId: owner1._id,
			receiverId: renter1._id,
			message: 'Yes, it\'s available! What time would you like to pick it up?'
		});

		console.log('Created messages');

		console.log('✅ Seed data created successfully!');
		console.log('\nSample users:');
		console.log(`Owner 1: ${owner1.email} / password123`);
		console.log(`Owner 2: ${owner2.email} / password123`);
		console.log(`Renter 1: ${renter1.email} / password123`);
		console.log(`Renter 2: ${renter2.email} / password123`);

		process.exit(0);
	} catch (error) {
		console.error('Error seeding data:', error);
		process.exit(1);
	}
};

seedData();
