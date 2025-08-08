import { Observer } from "../interface";

export class ElasticTransport implements Observer {
  private indexName: string;
  private elasticUrl: string;

  constructor(elasticUrl: string = 'http://localhost:9200', indexName: string = 'app-logs') {
    this.elasticUrl = elasticUrl;
    this.indexName = indexName;
  }

  notify(logData: any) {
    const timestamp = new Date().toISOString();
    const document = {
      '@timestamp': timestamp,
      level: logData.level,
      message: logData.message,
      meta: logData.meta || {},
      service: 'observer-pattern-demo'
    };
    
    // In a real implementation, this would send to Elasticsearch
    // For demo purposes, we'll simulate the HTTP request
    console.log(`Sending to Elasticsearch ${this.elasticUrl}/${this.indexName}:`, JSON.stringify(document, null, 2));
    return true;
  }
}
