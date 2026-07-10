/**
 * Simulates a continuous stream of WAN data offline by fetching from the public folder.
 * @param {Function} onDataCallback - Callback executed with changing metrics.
 * @param {Function} onStatusChange - Callback tracking the simulated state.
 * @returns {Function} A cleanup function to stop the timer when the component unmounts.
 */
export function streamWanSpeeds(onDataCallback, onStatusChange = () => {}) {
  let isExplicitlyClosed = false;
  let intervalId = null;

  onStatusChange('loading mock data...');

  // Fetch the data from the public directory (served relative to the root URL)
  fetch('/data/network.json')
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((baseMockData) => {
      if (isExplicitlyClosed) return;

      onStatusChange('connected (offline mock)');
      
      // Send the initial unmutated data straight to the UI
      onDataCallback(baseMockData);

      // Deep clone to safely mutate values over time
      const simulatedState = JSON.parse(JSON.stringify(baseMockData));

      // Generate changing metrics every 1000ms (1 second)
      intervalId = setInterval(() => {
        if (isExplicitlyClosed) return;

        // Ensure eth0 structure exists in your public file before modifying
        if (simulatedState.eth0?.stats) {
          // Generate fluctuating bits-per-second (between ~15Mbps and ~95Mbps)
          const randomRx = Math.floor(Math.random() * (95000000 - 15000000) + 15000000);
          const randomTx = Math.floor(Math.random() * (12000000 - 3000000) + 3000000);

          simulatedState.eth0.stats.rx_bps = randomRx.toString();
          simulatedState.eth0.stats.tx_bps = randomTx.toString();
        }

        onDataCallback(simulatedState);
      }, 1000);
    })
    .catch((error) => {
      console.error('Failed to load public mock file:', error);
      onStatusChange('failed to load mock data');
    });

  // Clean up function returned to Vue's onUnmounted lifecycle hook
  return function disconnect() {
    isExplicitlyClosed = true;
    if (intervalId) clearInterval(intervalId);
    onStatusChange('disconnected');
  };
}
