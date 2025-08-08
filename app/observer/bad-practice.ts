// Naive approach: direct calls to each logging destination

const message = 'Application started successfully';
const warning = 'This is a warning message';
const error = 'Database connection failed';
const debug = 'Processing user request';

// Log to console
console.log(`[INFO] ${message}`);
console.warn(`[WARN] ${warning}`, { userId: 123, action: 'login' });
console.error(`[ERROR] ${error}`, { error: 'ECONNREFUSED', host: 'localhost:5432' });
console.debug(`[DEBUG] ${debug}`, { requestId: 'req-456', endpoint: '/api/users' });

// Log to file (simulate with a function)
function writeToFile(filename: string, log: any) {
  // Imagine this writes to a file
  console.log(`Writing to file [${filename}]:`, log);
}
writeToFile('application.log', `[INFO] ${message}`);
writeToFile('application.log', `[WARN] ${warning}`);
writeToFile('application.log', `[ERROR] ${error}`);
writeToFile('application.log', `[DEBUG] ${debug}`);

// Log to Elasticsearch (simulate with a function)
function sendToElastic(url: string, index: string, log: any) {
  // Imagine this sends log to Elastic
  console.log(`Sending to Elastic [${url}/${index}]:`, log);
}
sendToElastic('http://localhost:9200', 'app-logs', `[INFO] ${message}`);
sendToElastic('http://localhost:9200', 'app-logs', `[WARN] ${warning}`);
sendToElastic('http://localhost:9200', 'app-logs', `[ERROR] ${error}`);
sendToElastic('http://localhost:9200', 'app-logs', `[DEBUG] ${debug}`);
