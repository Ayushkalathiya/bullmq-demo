# 🐂 BullMQ Search Indexing Demo

A clean, practical demonstration of **asynchronous background processing** in Node.js using **BullMQ** and **Redis**.

This project shows **why queues are important**, how they work, and how to **visualize jobs** using Bull Board.

---

## 📖 Why BullMQ? (The Problem & the Solution)

In real-world applications (search engines, file uploads, video processing, AI jobs), some tasks take **too long** to process during a user request.

### ❌ Without BullMQ (Blocking Flow)

1. User uploads a PDF.
2. Server starts reading & indexing the file (takes ~10 seconds).
3. User waits, staring at a spinner 😵‍💫.
4. If the server crashes → **task is lost**.

### ✅ With BullMQ (Asynchronous Flow)

1. User uploads a PDF.
2. Server **adds a job to a queue** and responds immediately (≈ 100ms).
3. A background **worker** processes the job.
4. If processing fails → BullMQ **automatically retries**.

✔ Faster user experience
✔ Reliable background processing
✔ Scalable architecture

---

## 🛠️ Tech Stack

* **Node.js** – JavaScript runtime
* **BullMQ** – Queue management
* **Redis** – Stores jobs & states
* **Bull Board** – UI dashboard to monitor queues

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

You must have **Redis** running locally.

#### ▶ Using Docker (Recommended)

```bash
docker run -d -p 6379:6379 redis
```

#### ▶ Without Docker

* **Mac / Linux**:

  ```bash
  brew install redis
  ```
* **Windows**:
  Use **WSL** or **Memurai**

---

### 2️⃣ Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd bullmq-search-demo
npm install
```

---

## 📂 Project Structure

| File           | Role                    | Description                                                          |
| -------------- | ----------------------- | -------------------------------------------------------------------- |
| `producer.js`  | 🧑‍💼 Producer (Waiter) | Simulates an API/user. Adds jobs to the queue and responds instantly |
| `worker.js`    | 👨‍🍳 Worker (Chef)     | Runs in background, processes jobs with a simulated delay            |
| `dashboard.js` | 📊 Monitor              | Runs Bull Board UI to visualize queue & job states                   |

---

## 🏃‍♂️ How to Run the Demo

You need **3 terminal windows** to see the full flow clearly.

---

### 🟢 Terminal 1: Start the Dashboard (Bull Board)

```bash
node dashboard.js
```

Open your browser:

```
http://localhost:3000/admin/queues
```

This lets you **see jobs inside Redis** in real time.

---

### 🟡 Terminal 2: Start the Worker

```bash
node worker.js
```

Expected output:

```
Worker is running and waiting for jobs...
```

The worker continuously listens for new jobs.

---

### 🔵 Terminal 3: Run the Producer

```bash
node producer.js
```

Run this command **multiple times** to add multiple jobs to the queue.

---

## 🧠 What to Observe

### ⚡ Immediate Response

* `producer.js` finishes instantly
* User is **never blocked**

### ⏳ Background Processing

* `worker.js` takes ~3 seconds per job
* Simulates heavy processing

### 📊 Visualization

* Jobs move through states:

  * `Waiting → Active → Completed`
* All visible in Bull Board

### 💾 Data Persistence

* Stop the worker
* Run `producer.js` multiple times
* Restart the worker

➡ Jobs resume automatically from Redis

---

## 🌍 Real-World Use Cases

This exact architecture is used by large-scale systems:

* **Video Processing**
  Upload video → Background transcoding

* **Emails**
  Click "Send Newsletter" → Send 10,000 emails in background

* **Generative AI**
  Prompt submission → Token generation in worker

* **E-commerce**
  Place order → Generate invoice, update inventory

---

## 📚 Learning Resources

* 📘 BullMQ Documentation
  [https://docs.bullmq.io/](https://docs.bullmq.io/)

* 🧠 Redis Insight (GUI)
  [https://redis.com/redis-enterprise/redis-insight/](https://redis.com/redis-enterprise/redis-insight/)

---

## ✅ Key Takeaways

* Never block user requests with heavy tasks
* Use **queues** for reliability & scalability
* BullMQ + Redis is production-proven
* Dashboards make debugging easy

---

🚀 **This demo is a foundation for building scalable systems.**
