// Performance monitoring utility
const performanceMetrics = {
  marks: new Map(),
  measures: new Map(),
};

export const startMeasure = (markName) => {
  if (process.env.NODE_ENV === 'development') {
    performanceMetrics.marks.set(markName, performance.now());
    console.debug(`[Performance] Started measuring: ${markName}`);
  }
};

export const endMeasure = (markName) => {
  if (process.env.NODE_ENV === 'development') {
    const startTime = performanceMetrics.marks.get(markName);
    if (startTime) {
      const duration = performance.now() - startTime;
      performanceMetrics.measures.set(markName, duration);
      console.debug(`[Performance] ${markName}: ${duration.toFixed(2)}ms`);
      performanceMetrics.marks.delete(markName);
    }
  }
};

export const trackComponentRender = (componentName) => {
  if (process.env.NODE_ENV === 'development') {
    startMeasure(`render_${componentName}`);
    return () => endMeasure(`render_${componentName}`);
  }
  return () => {};
};

export const logPerformanceMetrics = () => {
  if (process.env.NODE_ENV === 'development') {
    console.group('Performance Metrics');
    performanceMetrics.measures.forEach((duration, name) => {
      console.log(`${name}: ${duration.toFixed(2)}ms`);
    });
    console.groupEnd();
  }
};

// Track page load performance
export const trackPageLoad = () => {
  if (typeof window !== 'undefined' && window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    const firstPaint = paint.find(entry => entry.name === 'first-paint');
    const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint');

    console.info('Page Load Performance:', {
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcpConnection: navigation.connectEnd - navigation.connectStart,
      serverResponse: navigation.responseEnd - navigation.requestStart,
      domLoad: navigation.domComplete - navigation.domLoading,
      firstPaint: firstPaint?.startTime,
      firstContentfulPaint: firstContentfulPaint?.startTime,
      totalLoadTime: navigation.loadEventEnd - navigation.startTime,
    });
  }
};

// Track resource loading
export const trackResourceLoading = () => {
  if (typeof window !== 'undefined' && window.performance) {
    const resources = performance.getEntriesByType('resource');
    const resourceMetrics = resources.map(resource => ({
      name: resource.name.split('/').pop(),
      type: resource.initiatorType,
      size: resource.transferSize,
      duration: resource.duration,
    }));

    console.info('Resource Loading Performance:', resourceMetrics);
  }
}; 