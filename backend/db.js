import chalk from "chalk";
import mongoose from "mongoose";
let client;

export async function connect(connection_string) {
    try {
        if (!connection_string) {
            throw new Error("MongoDB connection string is missing");
        }

        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("MongoDB connected");
        console.log(chalk.blueBright("Connectiong to the server..!"))
       
    }
    catch (err) {
        console.log(err)
        console.log(chalk.red("failed to connect server..!"))
    }


}

export async function disconnect() {
    try {
        console.log(chalk.blueBright("Dis-Connectiong to the server..!"))
       await mongoose.disconnect();
    }
    catch (err) {
        console.log(chalk.red("failed to disconnect server..!"))
    }
}



