const  mongoose = require("mongoose")

const connectDB = async () => {
      try {
        await mongoose.connect(
            'mongodb://tony:tonydrzzdj@ac-psbcp8z-shard-00-00.xqet5tc.mongodb.net:27017,ac-psbcp8z-shard-00-01.xqet5tc.mongodb.net:27017,ac-psbcp8z-shard-00-02.xqet5tc.mongodb.net:27017/?ssl=true&replicaSet=atlas-5zuooj-shard-0&authSource=admin&appName=todo'
        );
         console.log('Connected to the database');
      } catch (error) {
        console.error('Database connection failed');
        process.exit(1);
      }
};

module.exports = connectDB ; 
