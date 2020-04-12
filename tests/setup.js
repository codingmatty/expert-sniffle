const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();
fetchMock.mockResponse(JSON.stringify([]));
