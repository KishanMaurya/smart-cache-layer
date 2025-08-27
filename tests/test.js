const SmartCache = require('../src/index');

const cache = new SmartCache({ persistFile: './cache.json' });

cache.set("user:1", { name: "Alice" }, 3000);
cache.set("user:2", { name: "Bob" }, 6000);

console.log("User1:", cache.get("user:1"));
setTimeout(() => {
  console.log("User1 after 5s:", cache.get("user:1")); // should be null
  console.log("User2 after 5s:", cache.get("user:2")); // should still exist
}, 5000);
