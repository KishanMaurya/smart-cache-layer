const fs = require('fs');
const AWS = require('aws-sdk');

class SmartCache {
  constructor({ persistFile = null, s3Config = null, cleanupInterval = 60000 } = {}) {
    this.cache = new Map();
    this.persistFile = persistFile;
    this.s3Config = s3Config;
    this.cleanupInterval = cleanupInterval;

    if (this.s3Config) {
      this.s3 = new AWS.S3({ region: this.s3Config.region });
    }

    if (this.persistFile && fs.existsSync(this.persistFile)) {
      const data = JSON.parse(fs.readFileSync(this.persistFile, 'utf-8'));
      for (const [key, entry] of Object.entries(data)) {
        this.cache.set(key, entry);
      }
    }

    setInterval(() => this.cleanup(), this.cleanupInterval);
  }

  set(key, value, ttl = 60000) {
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, { value, expiresAt });
    this.persist();
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.value;
  }

  delete(key) {
    this.cache.delete(key);
    this.persist();
  }

  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
    this.persist();
  }

  persist() {
    if (this.persistFile) {
      fs.writeFileSync(this.persistFile, JSON.stringify(Object.fromEntries(this.cache)), 'utf-8');
    }
    if (this.s3Config && this.s3) {
      this.s3.putObject({
        Bucket: this.s3Config.bucket,
        Key: this.s3Config.key,
        Body: JSON.stringify(Object.fromEntries(this.cache))
      }, (err) => {
        if (err) console.error("S3 Persist Error:", err);
      });
    }
  }
}

module.exports = SmartCache;
