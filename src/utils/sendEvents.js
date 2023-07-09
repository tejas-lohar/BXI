//  gtag events
const sendEvent = (name) => {
  try {
    window.gtag("event", name);
  } catch (err) {
    console.log(err);
  }
};

export default sendEvent;

//  gtag pageview
