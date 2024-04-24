const { URL } = require('url');
const uri = 'mongodb+srv://dquindara8:qJ7vdgtowSVzyEyB@ClusterMDB/test?retryWrites=true&w=majority';

try {
  const parsedUrl = new URL(uri);
  const hostnameParts = parsedUrl.hostname.split('.');
  console.log('Hostname:', hostnameParts[0]);
  console.log('Domain:', hostnameParts[1]);
  console.log('TLD:', hostnameParts[2]);
} catch (error) {
  console.error('Error parsing URI:', error);
}
