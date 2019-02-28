#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
    if (err) {
        console.log(err);
        process.exit(1)
    }
    conn.createChannel((err, ch) => {
        if (err) {
            console.log(err);
            process.exit(1)
        }
        const q = 'hello';

        ch.assertQueue(q, {
            durable: false
        });
        for (let i = 0; i < 1000; i++) {
            const text = `hello${i}`
            ch.sendToQueue(q, Buffer.from(text));
        }
    });

    setTimeout(() => {
        conn.close();
        process.exit(0)
    }, 500);
});