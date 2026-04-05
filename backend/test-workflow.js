// Clear cache
delete require.cache[require.resolve('./src/services/workflow.service')];
Object.keys(require.cache).filter(k => k.includes('/src/services/')).forEach(k => {
  delete require.cache[k];
});

const ws = require('./src/services/workflow.service');
ws.executeWorkflow('Next-gen productivity AI', 'founder').then(result => {
  console.log('\n=== Workflow Service Output ===');
  console.log('Has pipeline property:', 'pipeline' in result);
  console.log('Pipeline:', result.pipeline);
  console.log('Stage:', result.stage);
  console.log('Validation present:', Boolean(result?.executionPackage?.validation));
  console.log('\n=== Full Result Keys ===');
  console.log(Object.keys(result));
}).catch(err => {
  console.error('Error:', err.message);
});
