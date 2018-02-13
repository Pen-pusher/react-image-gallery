const Fetch = (pathname) => {
  const fetchUrl = `https://api.unsplash.com/${pathname}`;
  // const id = '2ebf57611c3566052a250a60c74cd822ac81e4198686d9dc5607a532508937f4';
  const id = '7b731361acf025d0a69683c791e73441ca2b21871aec8a4a6e378ebb76cdba06';
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Client-ID ${id}`);
  const init = {
    method: 'GET',
    headers: myHeaders
  };
  return fetch(fetchUrl, init)
    .then(res => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export default Fetch;
