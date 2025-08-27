# Smart Cache Layer

[![npm version](https://img.shields.io/npm/v/smart-cache-layer.svg)](https://www.npmjs.com/package/smart-cache-layer)
[![npm downloads](https://img.shields.io/npm/dm/smart-cache-layer.svg)](https://www.npmjs.com/package/smart-cache-layer)
[![GitHub issues](https://img.shields.io/github/issues/your-username/smart-cache-layer)](https://github.com/your-username/smart-cache-layer/issues)
[![GitHub stars](https://img.shields.io/github/stars/your-username/smart-cache-layer)](https://github.com/your-username/smart-cache-layer/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A **dynamic, in-memory cache** for Node.js with:
- Per-key **TTL (Time-To-Live)**
- **Automatic cleanup** of expired keys
- **Persistence** (File system or S3)
- Simple and production-ready API

---

## ✨ Features
- ⏱️ Per-key TTL support  
- 🗑️ Automatic cleanup of expired items  
- 💾 Persistence with local JSON file  
- ☁️ Optional AWS S3 persistence for distributed apps  
- ⚡ Zero dependencies (only requires AWS SDK if S3 is used)  

---

## 📦 Installation

```bash
npm install smart-cache-layer
