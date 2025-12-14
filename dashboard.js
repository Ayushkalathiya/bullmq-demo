// dashboard.js
const express = require('express');
const { Queue } = require('bullmq');
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

// 1. Connect to the SAME queue you used in producer/worker
const myQueue = new Queue('search-queue', {
  connection: {
    host: '127.0.0.1',
    port: 6379
  }
});

// 2. Set up the Dashboard
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(myQueue)],
  serverAdapter: serverAdapter,
});

// 3. Start the Server
const app = express();

app.use('/admin/queues', serverAdapter.getRouter());

app.listen(3000, () => {
  console.log('Dashboard is running!');
  console.log('Open this link: http://localhost:3000/admin/queues');
});