const Fetch = () => {
  const fetchUrl = 'https://api.unsplash.com/collections/featured';
  const id = '2ebf57611c3566052a250a60c74cd822ac81e4198686d9dc5607a532508937f4';
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Client-ID ${id}`);
  const init = {
    method: 'GET',
    headers: myHeaders
  };
  return fetch(fetchUrl, init);
};

export default Fetch;
