import http from 'k6/http';

export default function () {
  let response = http.get('http://127.0.0.1:3003');
};
