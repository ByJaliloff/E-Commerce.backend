import { io } from "socket.io-client";
import readline from "readline";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your username: ", (username) => {
    const socket = io("http://localhost:3000");


    socket.on("connect", () => {
        console.log(`Connected to server as, ${username}`);
    })

    socket.on("message", (data) => {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        console.log(`${data.username}: ${data.message}`);
        rl.prompt(true);
    });

    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line", (line) => {
        const trimmedLine = line.trim();
        if (trimmedLine.length > 0 ) {
            socket.emit("message", {
                username: username,
                message: trimmedLine
            });
        }
        rl.prompt();
    });
});