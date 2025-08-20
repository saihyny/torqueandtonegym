#!/usr/bin/env node

/**
 * Server Diagnostics Script for TORQUE & TONE FITNESS
 * This script helps diagnose server connectivity issues that prevent Google indexing
 */

const https = require('https');
const http = require('http');
const dns = require('dns');
const { promisify } = require('util');

const dnsLookup = promisify(dns.lookup);
const dnsResolve = promisify(dns.resolve);

const WEBSITE_URL = 'https://torqueandtonefitness.com';
const DOMAIN = 'torqueandtonefitness.com';

class ServerDiagnostics {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      domain: DOMAIN,
      url: WEBSITE_URL,
      tests: {}
    };
  }

  async runAllTests() {
    console.log('🔍 Starting Server Diagnostics for TORQUE & TONE FITNESS');
    console.log('=' .repeat(60));

    try {
      await this.testDNSResolution();
      await this.testHTTPSConnection();
      await this.testHTTPRedirect();
      await this.testSpecificEndpoints();
      await this.testGooglebotAccess();
      
      this.generateReport();
    } catch (error) {
      console.error('❌ Diagnostic failed:', error.message);
    }
  }

  async testDNSResolution() {
    console.log('🌐 Testing DNS Resolution...');
    
    try {
      const ipv4 = await dnsLookup(DOMAIN, { family: 4 });
      const ipv6 = await dnsLookup(DOMAIN, { family: 6 }).catch(() => null);
      const mx = await dnsResolve(DOMAIN, 'MX').catch(() => []);
      
      this.results.tests.dns = {
        status: 'success',
        ipv4: ipv4.address,
        ipv6: ipv6?.address || 'Not available',
        mx_records: mx.length,
        message: '✅ DNS resolution successful'
      };
      
      console.log(`   IPv4: ${ipv4.address}`);
      console.log(`   IPv6: ${ipv6?.address || 'Not available'}`);
      console.log(`   MX Records: ${mx.length} found`);
      
    } catch (error) {
      this.results.tests.dns = {
        status: 'failed',
        error: error.message,
        message: '❌ DNS resolution failed'
      };
      console.log(`   ❌ DNS Error: ${error.message}`);
    }
  }

  async testHTTPSConnection() {
    console.log('🔒 Testing HTTPS Connection...');
    
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      const req = https.get(WEBSITE_URL, (res) => {
        const responseTime = Date.now() - startTime;
        
        this.results.tests.https = {
          status: 'success',
          status_code: res.statusCode,
          response_time: responseTime,
          headers: {
            'content-type': res.headers['content-type'],
            'server': res.headers['server'],
            'cache-control': res.headers['cache-control']
          },
          message: `✅ HTTPS connection successful (${res.statusCode})`
        };
        
        console.log(`   Status Code: ${res.statusCode}`);
        console.log(`   Response Time: ${responseTime}ms`);
        console.log(`   Content-Type: ${res.headers['content-type']}`);
        
        resolve();
      });

      req.on('error', (error) => {
        this.results.tests.https = {
          status: 'failed',
          error: error.message,
          message: '❌ HTTPS connection failed'
        };
        console.log(`   ❌ HTTPS Error: ${error.message}`);
        resolve();
      });

      req.setTimeout(10000, () => {
        req.destroy();
        this.results.tests.https = {
          status: 'timeout',
          message: '❌ HTTPS connection timeout (10s)'
        };
        console.log('   ❌ HTTPS connection timeout');
        resolve();
      });
    });
  }

  async testHTTPRedirect() {
    console.log('🔄 Testing HTTP to HTTPS Redirect...');
    
    return new Promise((resolve) => {
      const httpUrl = WEBSITE_URL.replace('https://', 'http://');
      
      const req = http.get(httpUrl, (res) => {
        this.results.tests.http_redirect = {
          status: res.statusCode >= 300 && res.statusCode < 400 ? 'success' : 'warning',
          status_code: res.statusCode,
          location: res.headers.location,
          message: res.statusCode >= 300 && res.statusCode < 400 
            ? '✅ HTTP redirect configured' 
            : '⚠️  HTTP redirect may not be configured'
        };
        
        console.log(`   Status Code: ${res.statusCode}`);
        console.log(`   Location: ${res.headers.location || 'Not set'}`);
        
        resolve();
      });

      req.on('error', (error) => {
        this.results.tests.http_redirect = {
          status: 'failed',
          error: error.message,
          message: '❌ HTTP test failed'
        };
        console.log(`   ❌ HTTP Error: ${error.message}`);
        resolve();
      });

      req.setTimeout(5000, () => {
        req.destroy();
        resolve();
      });
    });
  }

  async testSpecificEndpoints() {
    console.log('📄 Testing Specific Endpoints...');
    
    const endpoints = [
      '/robots.txt',
      '/sitemap.xml',
      '/health.json'
    ];

    for (const endpoint of endpoints) {
      await this.testEndpoint(endpoint);
    }
  }

  async testEndpoint(endpoint) {
    return new Promise((resolve) => {
      const url = WEBSITE_URL + endpoint;
      
      const req = https.get(url, (res) => {
        this.results.tests[`endpoint_${endpoint.replace('/', '').replace('.', '_')}`] = {
          status: res.statusCode === 200 ? 'success' : 'warning',
          status_code: res.statusCode,
          content_type: res.headers['content-type'],
          message: res.statusCode === 200 
            ? `✅ ${endpoint} accessible` 
            : `⚠️  ${endpoint} returned ${res.statusCode}`
        };
        
        console.log(`   ${endpoint}: ${res.statusCode} (${res.headers['content-type']})`);
        resolve();
      });

      req.on('error', (error) => {
        this.results.tests[`endpoint_${endpoint.replace('/', '').replace('.', '_')}`] = {
          status: 'failed',
          error: error.message,
          message: `❌ ${endpoint} failed`
        };
        console.log(`   ${endpoint}: Error - ${error.message}`);
        resolve();
      });

      req.setTimeout(5000, () => {
        req.destroy();
        resolve();
      });
    });
  }

  async testGooglebotAccess() {
    console.log('🤖 Testing Googlebot Access Simulation...');
    
    return new Promise((resolve) => {
      const options = {
        hostname: DOMAIN,
        port: 443,
        path: '/',
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }
      };

      const req = https.request(options, (res) => {
        this.results.tests.googlebot_access = {
          status: res.statusCode === 200 ? 'success' : 'warning',
          status_code: res.statusCode,
          message: res.statusCode === 200 
            ? '✅ Googlebot can access the site' 
            : `⚠️  Googlebot access returned ${res.statusCode}`
        };
        
        console.log(`   Googlebot simulation: ${res.statusCode}`);
        resolve();
      });

      req.on('error', (error) => {
        this.results.tests.googlebot_access = {
          status: 'failed',
          error: error.message,
          message: '❌ Googlebot access simulation failed'
        };
        console.log(`   ❌ Googlebot simulation error: ${error.message}`);
        resolve();
      });

      req.setTimeout(10000, () => {
        req.destroy();
        resolve();
      });

      req.end();
    });
  }

  generateReport() {
    console.log('\n📊 DIAGNOSTIC REPORT');
    console.log('=' .repeat(60));
    
    const failedTests = Object.values(this.results.tests).filter(test => test.status === 'failed');
    const warningTests = Object.values(this.results.tests).filter(test => test.status === 'warning');
    const successTests = Object.values(this.results.tests).filter(test => test.status === 'success');

    console.log(`✅ Successful Tests: ${successTests.length}`);
    console.log(`⚠️  Warning Tests: ${warningTests.length}`);
    console.log(`❌ Failed Tests: ${failedTests.length}`);

    if (failedTests.length > 0) {
      console.log('\n🚨 CRITICAL ISSUES:');
      failedTests.forEach(test => {
        console.log(`   • ${test.message}`);
        if (test.error) console.log(`     Error: ${test.error}`);
      });
    }

    if (warningTests.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      warningTests.forEach(test => {
        console.log(`   • ${test.message}`);
      });
    }

    console.log('\n💡 RECOMMENDATIONS:');
    
    if (failedTests.some(test => test.error && test.error.includes('ENOTFOUND'))) {
      console.log('   • DNS resolution failed - check domain configuration');
    }
    
    if (failedTests.some(test => test.error && test.error.includes('ECONNREFUSED'))) {
      console.log('   • Server connection refused - check hosting service');
    }
    
    if (failedTests.some(test => test.error && test.error.includes('timeout'))) {
      console.log('   • Connection timeout - server may be overloaded or down');
    }

    console.log('   • Contact your hosting provider if server issues persist');
    console.log('   • Verify SSL certificate is valid and not expired');
    console.log('   • Check firewall settings to ensure Googlebot access');
    
    // Save results to file
    require('fs').writeFileSync('diagnostic-results.json', JSON.stringify(this.results, null, 2));
    console.log('\n📄 Full results saved to: diagnostic-results.json');
  }
}

// Run diagnostics if called directly
if (require.main === module) {
  const diagnostics = new ServerDiagnostics();
  diagnostics.runAllTests().catch(console.error);
}

module.exports = ServerDiagnostics;
