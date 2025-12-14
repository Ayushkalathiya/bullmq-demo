// producer.js
const { Queue } = require('bullmq');

// 1. Create a Queue connection
// 'search-queue' is the name of our specific line of work
const myQueue = new Queue('search-queue', {
  connection: {
    host: '127.0.0.1',
    port: 6379
  }
});

async function addJob() {
  console.log("1. User uploaded a file. Adding job to queue...");

  // 2. Add a job to the queue
  // 'index-document' is the job name.
  // The object { docId: 50, ... } is the data the worker needs.
  await myQueue.add('index-document', {
    docId: 50,
    title: "Project_Specs.pdf",
    filePath: "/uploads/project_specs.pdf"
  });

  console.log("2. Job added! Response sent to user immediately.");
  
  // In a real app, this connection stays open, but we close it here to end the script.
  await myQueue.close();
}

addJob();