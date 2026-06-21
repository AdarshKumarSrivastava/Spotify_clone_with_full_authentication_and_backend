require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/user.models');
const Song = require('./src/models/song.model');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB!");

        // 1. Create a dummy artist if not exists
        let artist = await User.findOne({ email: 'seedartist@example.com' });
        if (!artist) {
            artist = await User.create({
                username: 'The Weeknd',
                email: 'seedartist@example.com',
                password: 'password123',
                role: 'artist'
            });
            console.log("Dummy artist created");
        } else {
            console.log("Dummy artist already exists");
        }

        let artist2 = await User.findOne({ email: 'seedartist2@example.com' });
        if (!artist2) {
            artist2 = await User.create({
                username: 'Daft Punk',
                email: 'seedartist2@example.com',
                password: 'password123',
                role: 'artist'
            });
        }

        let artist3 = await User.findOne({ email: 'seedartist3@example.com' });
        if (!artist3) {
            artist3 = await User.create({
                username: 'Tame Impala',
                email: 'seedartist3@example.com',
                password: 'password123',
                role: 'artist'
            });
        }

        // 2. Clear existing songs if you want (optional, but let's just add new ones)
        // await Song.deleteMany({});
        
        // 3. Define 15+ songs
        const newSongs = [
            {
                title: "Starboy",
                artist: artist._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                coverArt: "https://images.unsplash.com/photo-1493225457124-a1a2a5956093?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 230
            },
            {
                title: "Blinding Lights",
                artist: artist._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                coverArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 200
            },
            {
                title: "Discovery",
                artist: artist2._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                coverArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 340
            },
            {
                title: "Currents",
                artist: artist3._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                coverArt: "https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 250
            },
            {
                title: "Midnight City",
                artist: artist._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                coverArt: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 243
            },
            {
                title: "Utopia",
                artist: artist3._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                coverArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 198
            },
            {
                title: "Graduation",
                artist: artist2._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                coverArt: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 215
            },
            {
                title: "Blonde",
                artist: artist._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
                coverArt: "https://images.unsplash.com/photo-1516280440502-86927a3f45f9?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 180
            },
            {
                title: "Random Access Memories",
                artist: artist2._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
                coverArt: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 310
            },
            {
                title: "The Slow Rush",
                artist: artist3._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
                coverArt: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 275
            },
            {
                title: "After Hours",
                artist: artist._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
                coverArt: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 320
            },
            {
                title: "Alive 2007",
                artist: artist2._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
                coverArt: "https://images.unsplash.com/photo-1458560871784-56d23406c091?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 410
            },
            {
                title: "Lonerism",
                artist: artist3._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
                coverArt: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 240
            },
            {
                title: "Dawn FM",
                artist: artist._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
                coverArt: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 290
            },
            {
                title: "Homework",
                artist: artist2._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
                coverArt: "https://images.unsplash.com/photo-1520625345917-742880afcb84?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 220
            },
            {
                title: "Innerspeaker",
                artist: artist3._id,
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
                coverArt: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=400&h=400",
                duration: 260
            }
        ];

        for (let s of newSongs) {
            await Song.create(s);
        }

        console.log("Successfully seeded 16 songs to the database!");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding data:", err);
        process.exit(1);
    }
}

seedData();
