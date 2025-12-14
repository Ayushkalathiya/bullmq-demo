// worker.js
const { Worker } = require('bullmq');

// A mock function to simulate heavy work (like parsing a PDF)
const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));

console.log("Worker is running and waiting for jobs...");

// 1. Create a Worker to listen to 'search-queue'
const worker = new Worker('search-queue', async (job) => {
  // This function runs every time a job is found in the queue
  
  console.log(`\n[Job ${job.id}] Processing started: ${job.name}`);
  console.log(`[Job ${job.id}] Data received:`, job.data);

  // Simulate heavy processing (e.g., indexing text for search)
  console.log(`[Job ${job.id}] Indexing document... (this takes 3s)`);
  await sleep(3000); 

  console.log(`[Job ${job.id}] Indexing Complete! Saved to Search DB.`);
  
  // You can return a value that will be stored in Redis as the "result"
  return { status: "indexed", wordCount: 500 };

}, {
  connection: {
    host: '127.0.0.1',
    port: 6379
  }
});

// Optional: Listen for events to see what's happening
worker.on('completed', (job, returnvalue) => {
  console.log(`[Event] Job ${job.id} has completed successfully!`);
});

worker.on('failed', (job, err) => {
  console.log(`[Event] Job ${job.id} has failed with error ${err.message}`);
});